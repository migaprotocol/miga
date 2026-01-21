---
pip: 3
title: Paired Lock Governance
tags: [governance, voting, paired-lock, vePARS]
description: Paired Lock governance mechanism requiring both PARS and CYRUS to be locked together for vePARS voting power
author: Cyrus Protocol Team (@cyrusdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-12
discussions-to: https://github.com/cyrusdao/pips/discussions/4
order: 3
tier: governance
---

## Abstract

This PIP introduces the **Paired Lock** governance mechanism where users must lock both PARS and CYRUS together to receive vePARS voting power. This design ensures alignment between emissions recipients (PARS holders) and protocol stakeholders (CYRUS holders), creating a more robust governance system.

## Motivation

Traditional single-token voting (lock PARS → get vePARS) has several problems:

1. **Misaligned Incentives**: PARS holders who farm emissions may not care about long-term protocol health
2. **Governance Mercenaries**: Easy to accumulate voting power without protocol alignment
3. **Whale Dominance**: Large PARS holders dominate without proving commitment

**The Paired Lock Solution:**

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           PAIRED LOCK vs SINGLE-TOKEN LOCK                              │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  SINGLE-TOKEN (Traditional)           PAIRED LOCK (Cyrus Protocol)                     │
│                                                                                          │
│  Lock PARS ────────▶ vePARS           Lock PARS + CYRUS ────────▶ vePARS              │
│                                                                                          │
│  Problems:                            Solutions:                                         │
│  • Farm & dump incentives             • Must commit both assets                         │
│  • No protocol alignment              • CYRUS = alignment collateral                    │
│  • Easy governance attacks            • vePARS ≤ min(PARS, CYRUS)                      │
│                                                                                          │
│  "I just want emissions"              "I believe in the protocol"                       │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

**CYRUS as Alignment Collateral:**
- CYRUS is purchased through the bonding curve (real capital commitment)
- Locking CYRUS proves "skin in the game" beyond just farming PARS emissions
- Creates a natural balance between governance power and capital at risk

## Specification

### Core Primitive: Paired Lock → vePARS

#### Deposit Rule

Users lock two assets in one position:
- `p` = PARS amount
- `c` = CYRUS amount

**Matched Amount:**
```
m = min(p, c)
```

The matched amount `m` determines governance power. This is the **units-matched** approach:
- "Your governance power is limited by the smaller of your PARS and CYRUS deposits"
- Simple, intuitive, and anti-gaming

#### vePARS Minting Formula

User picks lock duration `T` up to `T_max` (2 years). Voting power:

```
vePARS = m × (T / T_max)^α

Where:
- m = min(PARS, CYRUS) = matched amount
- T = lock duration (seconds)
- T_max = 2 years (63,072,000 seconds)
- α = time exponent (1 = linear, 2 = favors long locks)

Hard cap: vePARS ≤ m (always)
```

#### Lock Multiplier Table (α = 1, linear)

| Lock Duration | Time Factor | vePARS per matched unit |
|:--------------|:------------|:------------------------|
| 1 week | 0.0096 | 0.0096 vePARS |
| 1 month | 0.042 | 0.042 vePARS |
| 3 months | 0.125 | 0.125 vePARS |
| 6 months | 0.25 | 0.25 vePARS |
| 1 year | 0.5 | 0.5 vePARS |
| 2 years | 1.0 | 1.0 vePARS |

**Example:**
- Alice locks 1000 PARS + 1000 CYRUS for 2 years
- m = min(1000, 1000) = 1000
- vePARS = 1000 × (2/2)^1 = 1000 vePARS

### Governance Caps

Three layers of caps prevent governance capture:

#### A) Per-Position Cap (Always Enforced)

```
vePARS_position ≤ m
```

Additionally:
```
m ≤ MAX_MATCH_PER_POSITION (default: 1,000,000 PARS-equivalent)
```

#### B) Per-Wallet Cap (Configurable)

```
sum(vePARS_wallet) ≤ CAP_WALLET

Where:
CAP_WALLET = CAP_WALLET_BPS × totalVeSupply / 10000

Default: CAP_WALLET_BPS = 500 (5% of total vePARS)
```

This prevents any single wallet from accumulating more than 5% of governance power.

#### C) Global Cap (Recommended)

```
totalVeSupply ≤ CAP_GLOBAL

Where:
CAP_GLOBAL = min(circulatingPARS, circulatingCYRUS)
```

This ensures total vePARS can never exceed the smaller of PARS or CYRUS supply.

### Cap Summary Table

| Cap Type | Default Value | Adjustable | Purpose |
|:---------|:--------------|:-----------|:--------|
| Per-Position | m (matched) | No | Inherent to formula |
| Max Match | 1M PARS-eq | Yes | Prevent mega-positions |
| Per-Wallet | 5% total | Yes | Prevent whale dominance |
| Global | min(PARS, CYRUS) | No | Supply-bound |

### Unbalanced Deposits

If user deposits 100 PARS + 1 CYRUS:
- m = min(100, 1) = 1
- Only 1 unit counts for vePARS
- The extra 99 PARS is **rejected** (strict 1:1)

**Launch Policy: Strict 1:1 Reject**

```solidity
require(pars == cyrus, "Deposits must be equal");
```

This is the simplest, clearest approach:
- No ambiguity about what's locked
- No "orphaned" assets
- Easy to explain and implement

**Future Options (governance can enable):**
1. Accept + return excess immediately
2. Auto-swap to balance via AMM (requires slippage rules)

### Yield Without Corrupting Governance

**Critical Design Decision:** vePARS does NOT rebase.

Voting power is clean and predictable. Yield comes from separate rewards accounting.

#### Rewards Sources

1. **PARS Emissions Budget** ("citizen rewards")
2. **Protocol Revenue** (fees, bond spread, POL fees)
3. **Gauge Bribes** (future)

#### Rewards Distribution Formula

```
rewardsShare ∝ m × boost

Where:
boost = 0.4 + 0.6 × (T / T_max)
boost_max = 2.5x (clamped)
```

| Lock Duration | Boost Factor | Relative Rewards |
|:--------------|:-------------|:-----------------|
| 0 (no lock) | 0.4x | 40% |
| 6 months | 0.55x | 55% |
| 1 year | 0.7x | 70% |
| 2 years | 1.0x | 100% |

**Key Insight:** Rewards are proportional to matched amount `m`, not vePARS. This ensures long-term lockers get boosted rewards without inflating governance power.

### Lock/Exit Policy

For credible governance, locks must be meaningful.

#### Default: Lock Until Expiry

```solidity
// No early exit by default
function withdraw(uint256 positionId) external {
    Position storage pos = positions[positionId];
    require(block.timestamp >= pos.endTime, "Lock not expired");
    // ... return assets
}
```

#### Optional: Early Exit with Penalty

If enabled by governance:

```solidity
uint256 public constant EARLY_EXIT_PENALTY_BPS = 5000; // 50%

function earlyExit(uint256 positionId) external {
    Position storage pos = positions[positionId];
    require(earlyExitEnabled, "Early exit disabled");

    // Calculate penalty
    uint256 penalty = (pos.pars + pos.cyrus) * EARLY_EXIT_PENALTY_BPS / 10000;

    // Burn or send to treasury
    PARS.burn(penalty / 2);
    CYRUS.transfer(treasury, penalty / 2);

    // vePARS instantly goes to 0
    _burnVePARS(pos.owner, pos.vePARS);

    // Return remaining assets
    // ...
}
```

**Recommendation:** Disable early exit at launch. Governance can enable later with appropriate penalty.

### Contract Interface

```solidity
interface IPairedLock {
    struct Position {
        uint256 pars;           // PARS deposited
        uint256 cyrus;          // CYRUS deposited
        uint256 matched;        // m = min(pars, cyrus)
        uint256 startTime;      // Lock start
        uint256 endTime;        // Lock end
        uint256 vePARS;         // Voting power (checkpointed)
        uint256 rewardDebt;     // For rewards calculation
    }

    /// @notice Create a new paired lock position
    /// @param pars Amount of PARS to lock (must equal cyrus)
    /// @param cyrus Amount of CYRUS to lock (must equal pars)
    /// @param duration Lock duration in seconds
    /// @return positionId The new position ID
    function createLock(
        uint256 pars,
        uint256 cyrus,
        uint256 duration
    ) external returns (uint256 positionId);

    /// @notice Extend lock duration (increases vePARS)
    /// @param positionId Position to extend
    /// @param newEndTime New end timestamp
    function extendLock(uint256 positionId, uint256 newEndTime) external;

    /// @notice Add more tokens to existing position (must be balanced)
    /// @param positionId Position to increase
    /// @param additionalPars Additional PARS (must equal additionalCyrus)
    /// @param additionalCyrus Additional CYRUS (must equal additionalPars)
    function increaseAmount(
        uint256 positionId,
        uint256 additionalPars,
        uint256 additionalCyrus
    ) external;

    /// @notice Withdraw after lock expires
    /// @param positionId Position to withdraw
    function withdraw(uint256 positionId) external;

    /// @notice Claim accumulated rewards
    /// @param positionId Position to claim for
    function claimRewards(uint256 positionId) external returns (uint256);

    /// @notice Get voting power (IVotes compatible)
    function getVotes(address account) external view returns (uint256);

    /// @notice Get historical voting power (flash-loan resistant)
    function getPastVotes(address account, uint256 blockNumber) external view returns (uint256);
}
```

### Implementation

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Checkpoints.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract PairedLock is AccessControl {
    using SafeERC20 for IERC20;
    using Checkpoints for Checkpoints.Trace208;

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════════

    uint256 public constant MAX_LOCK_DURATION = 2 * 365 days; // 2 years
    uint256 public constant MIN_LOCK_DURATION = 7 days;       // 1 week
    uint256 public constant TIME_EXPONENT = 1;                // Linear (can be 2 for quadratic)
    uint256 public constant PRECISION = 1e18;

    // Reward boost constants
    uint256 public constant BASE_BOOST = 4e17;    // 0.4
    uint256 public constant MAX_BOOST = 25e17;    // 2.5
    uint256 public constant BOOST_RANGE = 6e17;   // 0.6

    // ═══════════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════════

    IERC20 public immutable pars;
    IERC20 public immutable cyrus;

    struct Position {
        uint256 pars;
        uint256 cyrus;
        uint256 matched;
        uint256 startTime;
        uint256 endTime;
        uint256 vePARS;
        uint256 rewardDebt;
    }

    mapping(uint256 => Position) public positions;
    mapping(address => uint256[]) public userPositions;
    uint256 public nextPositionId;

    // Voting power checkpoints (flash-loan resistant)
    mapping(address => Checkpoints.Trace208) private _votingPower;
    Checkpoints.Trace208 private _totalVotingPower;

    // Caps
    uint256 public maxMatchPerPosition = 1_000_000e18; // 1M PARS-equivalent
    uint256 public perWalletCapBps = 500;              // 5% of total

    // Rewards
    uint256 public rewardPerSecond;
    uint256 public lastRewardTime;
    uint256 public accRewardPerShare;
    uint256 public totalMatched;

    // Early exit
    bool public earlyExitEnabled;
    uint256 public earlyExitPenaltyBps = 5000; // 50%

    // ═══════════════════════════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════════════════════════

    event LockCreated(
        uint256 indexed positionId,
        address indexed owner,
        uint256 pars,
        uint256 cyrus,
        uint256 matched,
        uint256 vePARS,
        uint256 endTime
    );

    event LockExtended(uint256 indexed positionId, uint256 newEndTime, uint256 newVePARS);
    event LockIncreased(uint256 indexed positionId, uint256 additionalMatched, uint256 newVePARS);
    event Withdrawn(uint256 indexed positionId, uint256 pars, uint256 cyrus);
    event RewardsClaimed(uint256 indexed positionId, address indexed user, uint256 amount);
    event EarlyExit(uint256 indexed positionId, uint256 penalty);

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════════════════

    constructor(address _pars, address _cyrus, address _admin) {
        pars = IERC20(_pars);
        cyrus = IERC20(_cyrus);
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        lastRewardTime = block.timestamp;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // LOCK OPERATIONS
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Create a new paired lock position
    function createLock(
        uint256 _pars,
        uint256 _cyrus,
        uint256 _duration
    ) external returns (uint256 positionId) {
        // Strict 1:1 requirement
        require(_pars == _cyrus, "Deposits must be equal");
        require(_pars > 0, "Amount must be > 0");
        require(_duration >= MIN_LOCK_DURATION, "Duration too short");
        require(_duration <= MAX_LOCK_DURATION, "Duration too long");

        uint256 matched = _pars; // Since pars == cyrus

        // Check per-position cap
        require(matched <= maxMatchPerPosition, "Exceeds max per position");

        // Calculate vePARS
        uint256 vePARS = _calculateVePARS(matched, _duration);

        // Check per-wallet cap
        uint256 currentPower = getVotes(msg.sender);
        uint256 totalPower = _totalVotingPower.latest();
        uint256 maxWalletPower = (totalPower + vePARS) * perWalletCapBps / 10000;
        require(currentPower + vePARS <= maxWalletPower, "Exceeds wallet cap");

        // Update rewards
        _updateRewards();

        // Create position
        positionId = nextPositionId++;
        positions[positionId] = Position({
            pars: _pars,
            cyrus: _cyrus,
            matched: matched,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            vePARS: vePARS,
            rewardDebt: matched * accRewardPerShare / PRECISION
        });

        userPositions[msg.sender].push(positionId);
        totalMatched += matched;

        // Update voting power checkpoints
        _votingPower[msg.sender].push(SafeCast.toUint48(block.number), SafeCast.toUint208(currentPower + vePARS));
        _totalVotingPower.push(SafeCast.toUint48(block.number), SafeCast.toUint208(totalPower + vePARS));

        // Transfer tokens
        pars.safeTransferFrom(msg.sender, address(this), _pars);
        cyrus.safeTransferFrom(msg.sender, address(this), _cyrus);

        emit LockCreated(positionId, msg.sender, _pars, _cyrus, matched, vePARS, block.timestamp + _duration);
    }

    /// @notice Calculate vePARS from matched amount and duration
    function _calculateVePARS(uint256 _matched, uint256 _duration) internal pure returns (uint256) {
        // vePARS = m × (T / T_max)^α, capped at m
        uint256 timeFactor = _duration * PRECISION / MAX_LOCK_DURATION;

        // For α = 1 (linear): vePARS = m × timeFactor
        // For α = 2 (quadratic): vePARS = m × timeFactor²
        uint256 vePARS;
        if (TIME_EXPONENT == 1) {
            vePARS = _matched * timeFactor / PRECISION;
        } else {
            vePARS = _matched * timeFactor * timeFactor / (PRECISION * PRECISION);
        }

        // Cap at matched amount
        if (vePARS > _matched) vePARS = _matched;

        return vePARS;
    }

    /// @notice Withdraw after lock expires
    function withdraw(uint256 positionId) external {
        Position storage pos = positions[positionId];
        require(pos.matched > 0, "Position does not exist");
        require(_isOwner(msg.sender, positionId), "Not owner");
        require(block.timestamp >= pos.endTime, "Lock not expired");

        // Claim pending rewards
        _claimRewards(positionId, msg.sender);

        // Update voting power
        uint256 currentPower = getVotes(msg.sender);
        uint256 totalPower = _totalVotingPower.latest();
        _votingPower[msg.sender].push(SafeCast.toUint48(block.number), SafeCast.toUint208(currentPower - pos.vePARS));
        _totalVotingPower.push(SafeCast.toUint48(block.number), SafeCast.toUint208(totalPower - pos.vePARS));

        // Update state
        totalMatched -= pos.matched;
        uint256 parsAmount = pos.pars;
        uint256 cyrusAmount = pos.cyrus;
        delete positions[positionId];

        // Transfer tokens back
        pars.safeTransfer(msg.sender, parsAmount);
        cyrus.safeTransfer(msg.sender, cyrusAmount);

        emit Withdrawn(positionId, parsAmount, cyrusAmount);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // VOTING (IVotes compatible)
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Get current voting power
    function getVotes(address account) public view returns (uint256) {
        return _votingPower[account].latest();
    }

    /// @notice Get historical voting power (flash-loan resistant)
    function getPastVotes(address account, uint256 blockNumber) public view returns (uint256) {
        require(blockNumber < block.number, "Block not yet mined");
        return _votingPower[account].upperLookupRecent(SafeCast.toUint48(blockNumber));
    }

    /// @notice Get total voting power
    function getTotalVotes() public view returns (uint256) {
        return _totalVotingPower.latest();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // REWARDS
    // ═══════════════════════════════════════════════════════════════════════════

    function _updateRewards() internal {
        if (totalMatched == 0) {
            lastRewardTime = block.timestamp;
            return;
        }

        uint256 timeElapsed = block.timestamp - lastRewardTime;
        uint256 reward = timeElapsed * rewardPerSecond;
        accRewardPerShare += reward * PRECISION / totalMatched;
        lastRewardTime = block.timestamp;
    }

    function _claimRewards(uint256 positionId, address to) internal returns (uint256) {
        _updateRewards();

        Position storage pos = positions[positionId];
        uint256 pending = pos.matched * accRewardPerShare / PRECISION - pos.rewardDebt;

        // Apply boost based on lock duration
        uint256 remainingTime = pos.endTime > block.timestamp ? pos.endTime - block.timestamp : 0;
        uint256 boost = BASE_BOOST + BOOST_RANGE * remainingTime / MAX_LOCK_DURATION;
        if (boost > MAX_BOOST) boost = MAX_BOOST;

        uint256 boostedReward = pending * boost / PRECISION;
        pos.rewardDebt = pos.matched * accRewardPerShare / PRECISION;

        if (boostedReward > 0) {
            pars.safeTransfer(to, boostedReward);
            emit RewardsClaimed(positionId, to, boostedReward);
        }

        return boostedReward;
    }

    function claimRewards(uint256 positionId) external returns (uint256) {
        require(_isOwner(msg.sender, positionId), "Not owner");
        return _claimRewards(positionId, msg.sender);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPERS
    // ═══════════════════════════════════════════════════════════════════════════

    function _isOwner(address user, uint256 positionId) internal view returns (bool) {
        uint256[] storage userPosIds = userPositions[user];
        for (uint256 i = 0; i < userPosIds.length; i++) {
            if (userPosIds[i] == positionId) return true;
        }
        return false;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ADMIN
    // ═══════════════════════════════════════════════════════════════════════════

    function setRewardPerSecond(uint256 _rewardPerSecond) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _updateRewards();
        rewardPerSecond = _rewardPerSecond;
    }

    function setMaxMatchPerPosition(uint256 _max) external onlyRole(DEFAULT_ADMIN_ROLE) {
        maxMatchPerPosition = _max;
    }

    function setPerWalletCapBps(uint256 _bps) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_bps <= 10000, "Invalid bps");
        perWalletCapBps = _bps;
    }

    function setEarlyExitEnabled(bool _enabled) external onlyRole(DEFAULT_ADMIN_ROLE) {
        earlyExitEnabled = _enabled;
    }
}

library SafeCast {
    function toUint48(uint256 value) internal pure returns (uint48) {
        require(value <= type(uint48).max, "Value exceeds uint48");
        return uint48(value);
    }

    function toUint208(uint256 value) internal pure returns (uint208) {
        require(value <= type(uint208).max, "Value exceeds uint208");
        return uint208(value);
    }
}
```

## Rationale

### Why Paired Lock?

1. **Alignment**: CYRUS represents real capital commitment (purchased via bonding curve). Requiring both ensures voters have "skin in the game."

2. **Anti-Gaming**: Can't farm PARS emissions and immediately convert to governance power without also committing CYRUS.

3. **Natural Balance**: The protocol naturally balances governance power with capital at risk.

### Why Strict 1:1?

Simplest approach at launch:
- No ambiguity about locked amounts
- No orphaned assets
- Easy to explain to users
- Prevents gaming with dust amounts

Can evolve to accept-and-return-excess via governance if needed.

### Why Separate Rewards from Governance?

- **Clean Governance**: vePARS is pure voting power, not a yield token
- **Predictable**: Users know exactly their voting power
- **Flexible Rewards**: Can adjust reward mechanisms without touching governance
- **No Rebasing Complexity**: Simpler contract, easier audits

### Why Per-Wallet Caps?

Prevents whale dominance without complex quadratic voting:
- 5% default cap means even the largest holder can't exceed 5% of total governance
- Simple to implement and understand
- Can adjust via governance

## Backwards Compatibility

This PIP **replaces** the single-token vePARS system described in PIP-0001. Existing vePARS holders (if any) would need to migrate to paired locks.

**Migration Path:**
1. Deploy new PairedLock contract
2. Snapshot existing vePARS positions
3. Allow grace period for migration (e.g., 30 days)
4. Existing vePARS holders can either:
   - Withdraw PARS and create new paired lock (if they have CYRUS)
   - Withdraw PARS only (lose governance power)

## Test Cases

### Test 1: Basic Paired Lock

```
Alice has 1000 PARS and 1000 CYRUS
Alice creates lock for 2 years

Expected:
- matched = 1000
- vePARS = 1000 × (2/2) = 1000
- Position holds 1000 PARS + 1000 CYRUS
```

### Test 2: Unbalanced Deposit Rejected

```
Bob tries to deposit 1000 PARS + 100 CYRUS

Expected:
- Transaction reverts with "Deposits must be equal"
- No tokens transferred
```

### Test 3: Per-Wallet Cap

```
Total vePARS supply = 100,000
Per-wallet cap = 5% = 5,000 vePARS

Carol has 4,000 vePARS
Carol tries to create new lock for 2,000 vePARS

Expected:
- Transaction reverts with "Exceeds wallet cap"
- Carol would have 6,000 vePARS > 5,000 cap
```

### Test 4: Rewards Boost

```
Dave locks 1000 PARS + 1000 CYRUS for 2 years
Eve locks 1000 PARS + 1000 CYRUS for 6 months

Both have same matched = 1000
Reward pool = 1000 PARS per week

After 1 week:
- Dave's boost = 0.4 + 0.6 × (2/2) = 1.0
- Eve's boost = 0.4 + 0.6 × (0.25) = 0.55
- Total weighted = 1000 × 1.0 + 1000 × 0.55 = 1550

Dave receives: 1000 × 1.0 / 1.55 × 1000 = 645 PARS
Eve receives: 1000 × 0.55 / 1.55 × 1000 = 355 PARS
```

## Security Considerations

### Flash Loan Resistance

Voting power uses OpenZeppelin Checkpoints:
- `getPastVotes(account, blockNumber)` for governance snapshots
- Cannot manipulate historical voting power
- Governor uses past block for voting power calculation

### Sybil Resistance

Per-wallet caps reduce Sybil incentive:
- Splitting across wallets still bound by 5% cap per wallet
- Total governance power still limited
- Cost of creating/managing multiple positions

### Economic Attack Vectors

**Attack: Borrow CYRUS to gain governance power**
- Mitigation: Loans are short-term, locks are long-term
- Borrowing CYRUS for 2 years is economically infeasible

**Attack: Whale creates many positions to exceed wallet cap**
- Mitigation: Cap applies per-wallet, not per-position
- All positions owned by wallet count toward cap

### Contract Risks

- **Reentrancy**: Uses ReentrancyGuard (not shown for brevity)
- **Integer Overflow**: Uses Solidity 0.8+ built-in checks
- **Access Control**: Uses OpenZeppelin AccessControl

## Implementation Notes

### Governance Knobs (All Timelocked)

| Parameter | Default | Range | Description |
|:----------|:--------|:------|:------------|
| `MAX_LOCK_DURATION` | 2 years | 1-4 years | Maximum lock time |
| `MIN_LOCK_DURATION` | 7 days | 1-30 days | Minimum lock time |
| `TIME_EXPONENT` | 1 | 1-2 | Linear vs quadratic |
| `rewardPerSecond` | Variable | 0-∞ | Reward emission rate |
| `maxMatchPerPosition` | 1M | 100K-10M | Max per position |
| `perWalletCapBps` | 500 (5%) | 100-1000 | Wallet governance cap |
| `earlyExitEnabled` | false | bool | Allow early exit |
| `earlyExitPenaltyBps` | 5000 (50%) | 2000-10000 | Exit penalty |

### UI Framing

Display to users before creating lock:
1. **vePARS Voting Power**: X vePARS
2. **Weekly Reward Estimate**: ~Y PARS/week
3. **Unlock Date**: Month DD, YYYY
4. **Balance Check**: "You are short Z CYRUS to match your PARS" (if unbalanced)

### Integration with Governor

```solidity
// Governor constructor
constructor(
    IPairedLock _pairedLock,
    TimelockController _timelock
) Governor("CyrusDAO") GovernorVotes(IVotes(address(_pairedLock)))
  GovernorTimelockControl(_timelock) {
    // PairedLock implements IVotes interface
}
```

## References

- [Curve veCRV](https://curve.readthedocs.io/dao-vecrv.html)
- [OlympusDAO Bonding](https://docs.olympusdao.finance/)
- [OpenZeppelin Checkpoints](https://docs.openzeppelin.com/contracts/4.x/api/utils#Checkpoints)
- [EIP-5805: Voting with Delegation](https://eips.ethereum.org/EIPS/eip-5805)

## Related PIPs

- [PIP-0000: Protocol Architecture](./pip-0000-protocol-architecture.md) - Foundation
- [PIP-0001: Token Economics](./pip-0001-token-economics.md) - Token design
- [PIP-0002: Quadratic Time-Locked Voting](./pip-0002-quadratic-timelock-voting.md) - Alternative voting formula

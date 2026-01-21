---
pip: 2
title: Quadratic Time-Locked Voting
tags: [voting, governance, quadratic, timelock]
description: Quadratic Time-Locked Voting (QTLV) combines quadratic voting with time-lock commitment for fairer governance
author: Cyrus Protocol Team (@cyrusdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-12
discussions-to: https://github.com/cyrusdao/pips/discussions/3
order: 2
tier: governance
---

## Abstract

This PIP introduces Quadratic Time-Locked Voting (QTLV) to the Cyrus Protocol governance system. QTLV combines quadratic voting mechanics with time-lock commitment to create a fairer, more democratic governance system that rewards long-term commitment while preventing whale dominance.

## Motivation

Traditional token-weighted voting has two fundamental problems:

1. **Plutocracy**: Large holders dominate decisions (1 token = 1 vote)
2. **Short-termism**: No incentive for long-term commitment

Curve's veCRV addressed the second problem with time-locking, but still suffers from plutocratic tendencies. Quadratic Voting (QV) addresses plutocracy but doesn't reward commitment.

**QTLV combines the best of both:**

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           VOTING POWER COMPARISON                                       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  LINEAR (1:1)              QUADRATIC               QUADRATIC + TIMELOCK (QTLV)         │
│                                                                                          │
│  Votes                     Votes                    Votes                               │
│    ^                         ^                        ^                                  │
│    │ 1000 ●                  │ 32 ●                   │ 128 ●                           │
│    │      │                  │    ╲                   │     ╲                           │
│    │      │                  │     ╲                  │      ╲                          │
│    │      │                  │      ╲                 │       ╲                         │
│    │ 100  ●──────────────    │ 10   ●                │  40    ●                        │
│    │      │                  │      │                │        │                         │
│    │  10  ●                  │  3.2 ●                │  12.8  ●                        │
│    └──────┴───────> Tokens   └──────┴───> Tokens     └────────┴───> Tokens             │
│         10   100   1000          10   100   1000          10   100   1000              │
│                                                                                          │
│  Whale advantage: 100x      Whale advantage: 10x     Whale advantage: 10x               │
│  Commitment: None           Commitment: None         Commitment: 4x boost               │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## Specification

### Voting Power Formula

```
votingPower = sqrt(lockedPARS) × lockMultiplier

Where:
- sqrt(lockedPARS) = Quadratic component (reduces whale advantage)
- lockMultiplier = 1 + (lockDuration / maxLockDuration) × β

Parameters:
- maxLockDuration = 4 years (126,144,000 seconds)
- β = 3 (lock bonus coefficient, so 4-year lock = 4x boost)
```

### Lock Multiplier Table

| Lock Duration | Lock Multiplier | Example (1000 PARS) | Example (100 PARS) |
|:--------------|:----------------|:--------------------|:-------------------|
| 0 (no lock) | 1.0x | 31.6 votes | 10 votes |
| 1 week | 1.005x | 31.8 votes | 10.05 votes |
| 1 month | 1.02x | 32.2 votes | 10.2 votes |
| 3 months | 1.06x | 33.6 votes | 10.6 votes |
| 6 months | 1.125x | 35.6 votes | 11.25 votes |
| 1 year | 1.25x | 39.5 votes | 12.5 votes |
| 2 years | 1.5x | 47.4 votes | 15 votes |
| 4 years | 2.0x | 63.2 votes | 20 votes |

### With Decay (vePARS Style)

Voting power decays linearly as lock approaches expiration:

```
votingPower = sqrt(lockedPARS) × (1 + (timeRemaining / maxLockDuration) × β)

Example (1000 PARS locked for 4 years):
- Day 0: sqrt(1000) × (1 + 4/4 × 3) = 31.6 × 4 = 126.4 votes
- Year 1: sqrt(1000) × (1 + 3/4 × 3) = 31.6 × 3.25 = 102.7 votes
- Year 2: sqrt(1000) × (1 + 2/4 × 3) = 31.6 × 2.5 = 79 votes
- Year 3: sqrt(1000) × (1 + 1/4 × 3) = 31.6 × 1.75 = 55.3 votes
- Year 4: sqrt(1000) × (1 + 0/4 × 3) = 31.6 × 1 = 31.6 votes
```

### Sybil Resistance

Quadratic voting is vulnerable to Sybil attacks (splitting tokens across wallets). We address this through:

1. **Minimum Lock**: 100 PARS minimum to create a lock
2. **Lock Gas Cost**: Creating/managing locks has gas costs
3. **Identity Bonus** (Future): Verified identities get boost (see PIP-0003)

### Contract Interface

```solidity
interface IQuadraticVoting {
    /// @notice Calculate voting power for an account
    /// @param account The address to query
    /// @return votingPower The current voting power (sqrt(amount) × multiplier)
    function getVotingPower(address account) external view returns (uint256 votingPower);

    /// @notice Calculate voting power at a specific timestamp
    /// @param account The address to query
    /// @param timestamp The historical timestamp
    function getVotingPowerAt(address account, uint256 timestamp) external view returns (uint256);

    /// @notice Get the lock multiplier for a given remaining time
    /// @param timeRemaining Seconds until lock expires
    function getLockMultiplier(uint256 timeRemaining) external pure returns (uint256);

    /// @notice Create a new lock
    /// @param amount PARS to lock
    /// @param unlockTime Timestamp when lock expires
    function createLock(uint256 amount, uint256 unlockTime) external;

    /// @notice Extend lock duration (increases multiplier)
    /// @param newUnlockTime New expiration timestamp
    function extendLock(uint256 newUnlockTime) external;

    /// @notice Add more tokens to existing lock
    /// @param amount Additional PARS to lock
    function increaseAmount(uint256 amount) external;
}
```

### Implementation (Simplified)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/utils/math/Math.sol";

contract QuadraticVotingPower {
    using Math for uint256;

    uint256 public constant MAX_LOCK_DURATION = 4 * 365 days;
    uint256 public constant BETA = 3; // Lock bonus coefficient
    uint256 public constant PRECISION = 1e18;
    uint256 public constant MIN_LOCK_AMOUNT = 100e18; // 100 PARS minimum

    struct Lock {
        uint256 amount;
        uint256 unlockTime;
    }

    mapping(address => Lock) public locks;

    /// @notice Calculate voting power using quadratic + time-lock formula
    function getVotingPower(address account) public view returns (uint256) {
        Lock memory lock = locks[account];
        if (lock.amount == 0 || block.timestamp >= lock.unlockTime) {
            return 0;
        }

        // Quadratic: sqrt(amount)
        uint256 sqrtAmount = sqrt(lock.amount);

        // Time lock multiplier: 1 + (timeRemaining / maxDuration) × β
        uint256 timeRemaining = lock.unlockTime - block.timestamp;
        uint256 multiplier = PRECISION + (timeRemaining * BETA * PRECISION) / MAX_LOCK_DURATION;

        return (sqrtAmount * multiplier) / PRECISION;
    }

    /// @dev Integer square root using Babylonian method
    function sqrt(uint256 x) internal pure returns (uint256) {
        return Math.sqrt(x);
    }
}
```

## Rationale

### Why Quadratic?

Quadratic voting reduces the influence of large holders while still rewarding larger stakes:

| Tokens | Linear Votes | Quadratic Votes | Reduction |
|:-------|:-------------|:----------------|:----------|
| 100 | 100 | 10 | 90% |
| 1,000 | 1,000 | 31.6 | 97% |
| 10,000 | 10,000 | 100 | 99% |
| 100,000 | 100,000 | 316 | 99.7% |

This makes it more costly for whales to dominate while giving small holders meaningful voice.

### Why Time-Lock?

Time-locking aligns incentives with protocol's long-term success:

1. **Skin in the Game**: Locked tokens can't be sold during proposal execution
2. **Long-term Thinking**: Encourages decisions that benefit future, not just present
3. **Reduced Speculation**: Governance power can't be rented/borrowed short-term

### Why β = 3?

With β = 3, a 4-year lock provides 4x voting power over no lock:

- β = 1: Max 2x boost (too weak)
- β = 3: Max 4x boost (meaningful but not overwhelming)
- β = 5: Max 6x boost (might discourage short-term participants)

### Comparison with Alternatives

| System | Whale Protection | Commitment Reward | Complexity |
|:-------|:-----------------|:------------------|:-----------|
| 1 token = 1 vote | ❌ None | ❌ None | ⭐ Simple |
| veCRV (linear) | ❌ None | ✅ Strong | ⭐⭐ Medium |
| Quadratic Only | ✅ Strong | ❌ None | ⭐⭐ Medium |
| **QTLV (this PIP)** | ✅ Strong | ✅ Strong | ⭐⭐⭐ Complex |

## Backwards Compatibility

This PIP replaces the existing vePARS voting power calculation. Existing vePARS holders will have their voting power recalculated using the new formula.

**Migration:**
1. Deploy new `QuadraticVePARS` contract
2. Migrate locks from old vePARS (preserving amounts and unlock times)
3. Update Governor to use new voting power calculation

## Test Cases

### Test 1: Quadratic Reduces Whale Advantage

```
Alice: 10,000 PARS locked for 4 years
Bob: 100 PARS locked for 4 years

Linear:
  Alice: 10,000 × 4 = 40,000 votes
  Bob: 100 × 4 = 400 votes
  Alice has 100x Bob's power

Quadratic Time-Lock:
  Alice: sqrt(10,000) × 4 = 100 × 4 = 400 votes
  Bob: sqrt(100) × 4 = 10 × 4 = 40 votes
  Alice has 10x Bob's power (reduced from 100x)
```

### Test 2: Lock Duration Matters

```
Charlie: 1,000 PARS locked for 1 year
Dana: 1,000 PARS locked for 4 years

Charlie: sqrt(1000) × 1.75 = 31.6 × 1.75 = 55.3 votes
Dana: sqrt(1000) × 4 = 31.6 × 4 = 126.4 votes

Dana has 2.3x Charlie's power due to longer commitment
```

### Test 3: Decay Over Time

```
Eve: 1,000 PARS locked for 4 years

Day 0: sqrt(1000) × 4 = 126.4 votes
Year 1: sqrt(1000) × 3.25 = 102.7 votes (-19%)
Year 2: sqrt(1000) × 2.5 = 79 votes (-37%)
Year 3: sqrt(1000) × 1.75 = 55.3 votes (-56%)
Year 4: sqrt(1000) × 1 = 31.6 votes (-75%)
```

### Test 4: Sybil Attack Cost

```
Attacker has 10,000 PARS
Option A: Single lock
  sqrt(10,000) × 4 = 400 votes

Option B: Split into 100 wallets (100 PARS each)
  100 × sqrt(100) × 4 = 100 × 10 × 4 = 4,000 votes

Theoretical 10x improvement, BUT:
- 100 transactions × gas cost
- 100 minimum lock requirements (100 PARS each)
- 100 addresses to manage

With gas costs ~$5 per lock at $1000/ETH:
- Attack cost: 100 × $5 = $500
- For marginal voting power increase
- Not economically viable for small amounts
```

## Security Considerations

1. **Flash Loan Resistance**: Checkpointed voting power at specific blocks prevents flash loan attacks

2. **Sybil Resistance**: Minimum lock amounts and gas costs make Sybil attacks uneconomical for most participants

3. **Integer Overflow**: Use OpenZeppelin's Math library for sqrt to prevent overflow

4. **Precision Loss**: Use high precision (1e18) for multiplier calculations

5. **Time Manipulation**: Use block.timestamp with reasonable tolerance (validators can manipulate ±15 seconds)

## Implementation Notes

### Checkpoint System

For historical voting power queries (required for Governor snapshots):

```solidity
struct Checkpoint {
    uint256 timestamp;
    uint256 votingPower;
}

mapping(address => Checkpoint[]) public checkpoints;

function _updateCheckpoint(address account) internal {
    uint256 power = getVotingPower(account);
    checkpoints[account].push(Checkpoint({
        timestamp: block.timestamp,
        votingPower: power
    }));
}
```

### Gas Optimization

Calculating sqrt on-chain is expensive (~500 gas). Consider:
- Pre-computing sqrt values for common amounts
- Using binary search approximation
- Caching voting power with periodic updates

## References

- [Quadratic Voting (Wikipedia)](https://en.wikipedia.org/wiki/Quadratic_voting)
- [Vitalik on Quadratic Voting](https://vitalik.ca/general/2019/12/07/quadratic.html)
- [Curve veCRV](https://curve.readthedocs.io/dao-vecrv.html)
- [Gitcoin Quadratic Funding](https://www.radicalxchange.org/concepts/quadratic-funding/)
- [OpenZeppelin Math.sqrt](https://docs.openzeppelin.com/contracts/4.x/api/utils#Math-sqrt-uint256-)

## Related PIPs

- [PIP-0000: Protocol Architecture](./pip-0000-protocol-architecture.md) - Foundation
- [PIP-0001: Token Economics](./pip-0001-token-economics.md) - Token design
- PIP-0003: Identity Integration (Future) - Enhanced Sybil resistance

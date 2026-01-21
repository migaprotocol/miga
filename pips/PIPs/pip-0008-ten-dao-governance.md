---
pip: 8
title: Ten Critical DAO Governance Framework with Program Tokens
tags: [governance, dao, persian, erc4626, bonds, capital-allocation]
description: Establishes the ten top-level critical DAOs with Persian names, one unified governance token, and ten DAO program tokens for capital allocation
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
updated: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/8
order: 8
tier: core
---

## Abstract

This PIP establishes PARSDAO's governance structure through:
1. **One Governance Token (PARS)**: Unified voting, delegation, constitutional upgrades, and parameter control
2. **Ten DAO Program Tokens**: ERC-4626 shares representing exposure to each DAO's treasury strategy and fee stream

This architecture separates **political governance** (who decides) from **capital allocation** (where funds flow), preventing governance fragmentation while enabling specialized funding programs.

## Motivation

### Problems with Multi-Governance Tokens

Systems that give each DAO its own governance token suffer from:
1. **Governance Fragmentation**: 10 competing political economies
2. **Vote Buying**: Cheaper to capture a single small DAO
3. **Complexity**: Users must track multiple voting systems
4. **Misaligned Incentives**: DAO token holders may vote against protocol-wide interests

### Solution: Unified Governance + Capital Allocation Tokens

- **One governance token** = one unified political system
- **DAO program tokens** = capital allocation instruments, not votes
- Users "fund pillars" without gaining political control of them
- Protocol governance (PARS) sets boundaries for all DAO strategies

## Architecture

### Token Hierarchy

```
                    PARS (Governance Token)
                           |
                           | votes, delegation, parameters
                           v
              +--------------------------+
              |  PolicyRegistry          |
              |  - DAO strategy limits   |
              |  - Asset allowlists      |
              |  - Bond parameters       |
              +--------------------------+
                           |
       +-------------------+-------------------+
       |           |           |           |
       v           v           v           v
    +-----+     +-----+     +-----+     +-----+
    | AMN |     | KHAZ|     | DAD |     | SAL |  ... (10 total)
    | DAO |     | DAO |     | DAO |     | DAO |
    +-----+     +-----+     +-----+     +-----+
       |           |           |           |
       v           v           v           v
   DaoVault   DaoVault   DaoVault   DaoVault   (ERC-4626)
   DaoShare   DaoShare   DaoShare   DaoShare   (DAO Token)
   BondDep.   BondDep.   BondDep.   BondDep.   (Discounted Entry)
```

## Specification

### Ten Critical DAOs

| # | Symbol | Persian Name | English | Domain | Strategy Profile |
|:--|:-------|:-------------|:--------|:-------|:-----------------|
| 1 | AMN | امنیّت (Amniyat) | Security | Audits, bug bounties, incident response | Stablecoin-only, audit/infra runway |
| 2 | KHAZ | خزانه (Khazaneh) | Treasury | Fund allocation, liquidity, reserves | Diversified, protocol reserves |
| 3 | DAD | داد (Dād) | Governance Protocol | Rules, constraints, constitutional | Minimal spend, governance tooling |
| 4 | SAL | سلامت (Salāmat) | Health | Humanitarian, aid, emergency relief | Stablecoin + short-duration yield |
| 5 | FARH | فرهنگ (Farhang) | Culture | Arts, heritage, cultural preservation | Stablecoin + creator grants |
| 6 | DAN | دانش (Dānesh) | Research | Scientific research, open-source R&D | Research grants, publication funding |
| 7 | SAZ | سازندگی (Sāzandegi) | Infrastructure | Physical/digital infrastructure | Procurement pool, invoices |
| 8 | PAY | پیام (Payām) | Consular | Diplomatic relations, cross-DAO coordination | Minimal, coordination budget |
| 9 | WAQF | وقف (Waqf) | Endowment/Venture | Long-term capital growth, venture | Diversified, long-horizon, accepts risk |
| 10 | MIZ | میزان (Mizān) | Impact/Integrity | Verification, audit, accountability | Minimal spend, audit tooling |

### Governance Token (PARS)

The PARS token controls all protocol governance:

```solidity
// PARS governance token responsibilities:
interface IPARSGovernance {
    // DAO activation/deactivation
    function activateDAO(bytes32 daoId) external;
    function deactivateDAO(bytes32 daoId) external;

    // Fee split policies
    function setFeeSplit(uint256[] calldata bps) external;

    // Strategy allowlists
    function setAllowedStrategies(bytes32 daoId, address[] calldata) external;
    function setAllowedAssets(bytes32 daoId, address[] calldata) external;

    // Bond parameters
    function setBondCaps(bytes32 daoId, uint256 maxPerEpoch) external;
    function setVestingPeriod(bytes32 daoId, uint256 duration) external;
    function setMaxDiscount(bytes32 daoId, uint256 bps) external;
}
```

**PARS holders decide:**
- Which DAOs are active
- Fee split policies across DAOs
- What strategies each DAO can use
- Bond parameters (caps, vesting, accepted assets)
- Constitutional amendments

**PARS holders do NOT:**
- Vote on individual DAO spend proposals (DAOs handle this internally)
- Control DAO token issuance (determined by bond mechanism)

### DAO Program Tokens (ERC-4626 Shares)

Each DAO has:

1. **DaoVault (ERC-4626)**: Holds assets (USDC, ETH, LP tokens, etc.)
2. **DaoShare (ERC-20)**: The DAO token = shares in the vault
3. **BondDepository**: Issues vested claims on DaoShare at discount

```solidity
// SPDX-License-Identifier: BSD-3-Clause
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title DaoVault
 * @notice ERC-4626 vault for a single DAO's treasury strategy
 */
contract DaoVault is ERC4626, AccessControl {
    bytes32 public constant STRATEGY_ROLE = keccak256("STRATEGY_ROLE");
    bytes32 public immutable daoId;

    address[] public allowedAssets;
    mapping(address => bool) public isAllowedAsset;

    constructor(
        IERC20 asset_,
        string memory name_,
        string memory symbol_,
        bytes32 daoId_
    ) ERC4626(asset_) ERC20(name_, symbol_) {
        daoId = daoId_;
    }

    /**
     * @notice Vault value accrues via:
     * - Protocol fee inflows
     * - Strategy yield
     * - Optional buybacks/reinvestment
     */
    function totalAssets() public view override returns (uint256) {
        // Sum of all managed assets
        return _totalManagedAssets();
    }
}
```

### Bond Mechanism

Users can acquire DAO tokens at a discount through bonds:

```solidity
/**
 * @title BondDepository
 * @notice Issues vested claims on DAO shares at discount
 */
contract BondDepository {
    struct BondTerms {
        uint256 controlVariable;    // Affects discount scaling
        uint256 vestingTerm;        // Vesting period (seconds)
        uint256 minimumPrice;       // Floor for bond price
        uint256 maxPayout;          // Max payout per bond (% of supply)
        uint256 maxDebt;            // Max outstanding debt
    }

    struct Bond {
        uint256 payout;             // DAO tokens owed
        uint256 vesting;            // Seconds until fully vested
        uint256 lastTime;           // Last interaction
        uint256 pricePaid;          // Principal paid
    }

    mapping(address => Bond) public bondInfo;
    BondTerms public terms;

    /**
     * @notice Deposit asset, receive vested DAO tokens at discount
     * @param amount Amount of accepted asset to deposit
     * @param maxPrice Maximum acceptable price (slippage protection)
     * @param depositor Address to receive the bond
     */
    function deposit(
        uint256 amount,
        uint256 maxPrice,
        address depositor
    ) external returns (uint256 payout) {
        require(debtRatio() < terms.maxDebt, "Max capacity reached");

        uint256 price = bondPrice();
        require(price <= maxPrice, "Slippage exceeded");

        payout = payoutFor(amount);
        require(payout >= 10 ** 9, "Bond too small");
        require(payout <= maxPayout(), "Bond too large");

        // Store bond for vesting
        bondInfo[depositor] = Bond({
            payout: bondInfo[depositor].payout + payout,
            vesting: terms.vestingTerm,
            lastTime: block.timestamp,
            pricePaid: price
        });

        // Transfer assets to DAO vault
        asset.safeTransferFrom(msg.sender, address(vault), amount);

        // Update total debt
        totalDebt += payout;

        emit BondCreated(depositor, amount, payout, price);
    }

    /**
     * @notice Redeem vested bond payout
     */
    function redeem(address recipient) external returns (uint256) {
        Bond memory info = bondInfo[recipient];
        uint256 percentVested = percentVestedFor(recipient);

        if (percentVested >= 10000) {
            // Fully vested
            delete bondInfo[recipient];
            return _send(recipient, info.payout);
        } else {
            // Partially vested
            uint256 payout = info.payout * percentVested / 10000;
            bondInfo[recipient].payout -= payout;
            bondInfo[recipient].lastTime = block.timestamp;
            return _send(recipient, payout);
        }
    }
}
```

### Safety Constraints (Non-Negotiable)

| Constraint | Enforcement | Rationale |
|:-----------|:------------|:----------|
| **Hard cap on bond issuance per epoch** | `maxDebt` parameter | Prevents infinite dilution |
| **Max discount (5-20%)** | `minimumPrice` floor | Limits discount arbitrage |
| **Vesting period** | `vestingTerm` (min 7 days) | Prevents instant dump |
| **Accepted assets allowlisted** | PARS governance vote | No garbage-in |
| **Strategy envelope enforced** | PolicyRegistry | Risk limits per DAO |

### Fee Router

Protocol fees flow through the FeeRouter to all DAO vaults:

```solidity
/**
 * @title FeeRouter
 * @notice Routes protocol fees to DAO vaults
 */
contract FeeRouter {
    // Basis points allocation per DAO (must sum to 10000)
    uint256[10] public feeSplit;

    address[10] public daoVaults;
    address public treasuryVault;  // KHAZ gets remainder

    /**
     * @notice Distribute collected fees to DAO vaults
     */
    function distribute(address token, uint256 amount) external {
        for (uint256 i = 0; i < 10; i++) {
            uint256 share = amount * feeSplit[i] / 10000;
            IERC20(token).safeTransfer(daoVaults[i], share);
        }
    }
}
```

### DAO Token Meaning

**A DAO program token represents:**
- "I'm funding and backing this pillar"
- "This pillar's treasury grows via fees + strategy yield"
- "I can exit by selling shares (if liquid)"

**A DAO program token does NOT represent:**
- "I control that DAO politically" (PARS controls politics)
- "Guaranteed yield" (policy-driven, not marketed as fixed return)

## Rationale

### Why One Governance Token?

1. **Unified Politics**: Single point of legitimacy
2. **Coordination**: Constitutional changes apply protocol-wide
3. **Capture Resistance**: Can't buy governance of one pillar cheaply
4. **Simplicity**: Users vote once, delegate once

### Why Ten DAO Tokens?

1. **Capital Allocation**: Users choose which pillars to fund
2. **No Vote Power**: Prevents governance fragmentation
3. **Strategy Exposure**: Value accrues via fee inflows and yield
4. **Bond Incentive**: Discounted entry aligns long-term holders

### Why Bond-Style Discounting?

1. **Growth Mechanism**: Protocol can raise capital efficiently
2. **Alignment**: Vesting ensures long-term commitment
3. **No Death Spiral**: Hard caps prevent reflexive collapse
4. **Allowlisted Assets**: No garbage-in-garbage-out

### Why Persian Names?

1. **Cultural Identity**: Connects governance to mission
2. **Uniqueness**: Distinguishes from other protocols
3. **Heritage**: Honors Persian governance tradition (Cyrus's satraps)

## Security Considerations

### Bond Parameter Bounds

| Parameter | Minimum | Maximum | Governance Can Adjust |
|:----------|:--------|:--------|:---------------------|
| Vesting Term | 7 days | 365 days | Yes (within bounds) |
| Max Discount | 0% | 20% | Yes (within bounds) |
| Max Payout | 0.1% of supply | 1% of supply | Yes (within bounds) |
| Debt Ratio | N/A | 100% | Yes (within bounds) |

### Strategy Restrictions per DAO

| DAO | Allowed Assets | Risk Level | Notes |
|:----|:---------------|:-----------|:------|
| AMN | Stablecoins only | Minimal | Audit/infra runway |
| KHAZ | Diversified | Moderate | Protocol reserves |
| DAD | Stablecoins only | Minimal | Governance tooling |
| SAL | Stablecoins + short yield | Low | Fast disbursements |
| FARH | Stablecoins + grants | Low | Creator programs |
| DAN | Stablecoins + research | Low | Publication funding |
| SAZ | Stablecoins + invoices | Low | Procurement |
| PAY | Stablecoins only | Minimal | Coordination budget |
| WAQF | Full diversification | Higher | Long-horizon, venture |
| MIZ | Stablecoins only | Minimal | Audit tooling |

### Emergency Controls

1. **PARS governance** can pause bond deposits for any DAO
2. **Emergency module** can freeze DAO vaults (scoped, with expiry)
3. **Supreme Council** can veto malicious proposals

## Implementation

### Contract Set (Per DAO)

| Contract | Purpose |
|:---------|:--------|
| `DaoVault_{SYMBOL}` | ERC-4626 Strategy Vault |
| `DaoShare_{SYMBOL}` | The DAO token (share) |
| `BondDepository_{SYMBOL}` | Vested claims at discount |
| `VestingEscrow_{SYMBOL}` | Linear share release |

### System-Wide Contracts

| Contract | Purpose |
|:---------|:--------|
| `FeeRouter` | Routes fees to DAO vaults |
| `PolicyRegistry` | Strategy allowlists, parameter bounds |
| `ExecutionRouter` | Role-based execution |
| `Timelock` | Delay for governance actions |
| `ReceiptAnchor` | Mandatory receipts for transfers |
| `EmergencyModule` | Scoped freeze with expiry |

### Deployment Order

1. Deploy governance token (PARS) and core governance contracts
2. Deploy PolicyRegistry with initial parameter bounds
3. Deploy 3 priority DAOs (KHAZ, AMN, MIZ)
4. Test bond mechanism in production
5. Deploy remaining 7 DAOs incrementally

### UI Presentation (Per DAO Page)

```
+------------------------------------------------------------------+
|  KHAZ (خزانه) - Treasury                                          |
+------------------------------------------------------------------+
|                                                                   |
|  MISSION                                                          |
|  Protocol reserves, liquidity management, investment strategy     |
|                                                                   |
|  TREASURY                                                         |
|  +-------------------------------------------------------------+ |
|  | TVL: $12,450,000                                             | |
|  | Fee Inflow (30d): $124,500                                   | |
|  | Strategy: Diversified (50% stable, 30% ETH, 20% LP)         | |
|  +-------------------------------------------------------------+ |
|                                                                   |
|  INVEST / BOND                                                    |
|  +-------------------------------------------------------------+ |
|  | Current Discount: 8.5%                                       | |
|  | Vesting Period: 14 days                                      | |
|  | Accepted: USDC, USDT, DAI                                    | |
|  | Remaining This Epoch: 125,000 KHAZ                           | |
|  |                                                               | |
|  | [BOND NOW]                                                   | |
|  +-------------------------------------------------------------+ |
|                                                                   |
|  SPEND & RECEIPTS                                                 |
|  +-------------------------------------------------------------+ |
|  | Active Proposals: 3                                          | |
|  | Timelock Queue: 2                                            | |
|  | Recent Receipts: [View Ledger]                               | |
|  +-------------------------------------------------------------+ |
|                                                                   |
+------------------------------------------------------------------+
```

## Backwards Compatibility

This PIP is a new framework. No existing tokens or contracts are affected.

## References

- [PIP-0001: Constitution](./pip-0001-constitution.md)
- [PIP-0006: Token Economics](./pip-0006-token-economics.md)
- [PIP-0007: Privacy-Preserving Governance](./pip-0007-privacy-preserving-governance.md)
- [PIP-0009: Supreme Council](./pip-0009-supreme-council.md)
- [EIP-4626: Tokenized Vault Standard](https://eips.ethereum.org/EIPS/eip-4626)
- [Olympus DAO Bond Mechanism](https://docs.olympusdao.finance/)

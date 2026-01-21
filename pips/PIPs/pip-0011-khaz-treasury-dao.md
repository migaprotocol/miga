---
pip: 11
title: KHAZ (Treasury DAO) - خزانه
tags: [dao, treasury, khaz, reserves, investment]
description: Establishes the Treasury DAO (KHAZ) for protocol reserves, liquidity, and investment strategy
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/11
order: 11
tier: core
---

## Abstract

This PIP establishes the **KHAZ (خزانه / Khazaneh) Treasury DAO**, responsible for protocol reserves, liquidity management, and investment strategy. KHAZ is the primary capital reservoir for PARSDAO.

## Specification

### DAO Identity

| Property | Value |
|:---------|:------|
| **Symbol** | KHAZ |
| **Persian Name** | خزانه (Khazaneh) |
| **English Name** | Treasury |
| **Domain** | Fund allocation, liquidity, reserves |
| **DAO ID** | `keccak256("KHAZ")` |

### Token Configuration

| Property | Value |
|:---------|:------|
| **Token Name** | PARSDAO Treasury Shares |
| **Token Symbol** | KHAZ |
| **Token Type** | ERC-4626 Vault Shares |
| **Base Asset** | Multi-asset (weighted basket) |
| **Decimals** | 18 |

### Strategy Profile

| Parameter | Value | Rationale |
|:----------|:------|:----------|
| **Allowed Assets** | USDC, USDT, DAI, ETH, WBTC, PARS | Diversified reserve |
| **Risk Level** | Moderate | Balance growth and stability |
| **Target Allocation** | 50% stable, 30% ETH/WBTC, 20% PARS | Strategic balance |
| **Yield Strategy** | Blue-chip DeFi (Aave, Compound, Curve) | Established protocols only |
| **Rebalancing** | Monthly | Active management |

### Bond Parameters (Initial)

| Parameter | Value |
|:----------|:------|
| **Vesting Period** | 14 days |
| **Max Discount** | 12% |
| **Max Payout per Bond** | 0.75% of supply |
| **Max Debt Ratio** | 75% |
| **Accepted Assets** | USDC, USDT, DAI, ETH, WBTC |
| **Epoch Duration** | 7 days |

### Fee Allocation

KHAZ receives **25%** of protocol fees (largest allocation).

### Responsibilities

1. **Reserve Management**
   - Maintain protocol runway (min 2 years operational costs)
   - Diversify across stable and volatile assets
   - Manage counterparty risk

2. **Liquidity Provision**
   - Fund PARS liquidity on DEXs
   - Manage LP positions
   - Protocol-owned liquidity strategy

3. **Investment Strategy**
   - Deploy capital to yield-generating positions
   - Evaluate new investment opportunities
   - Track and report returns

4. **Grant Funding**
   - Provide capital to other DAOs on request
   - Fund emergency reserves for AMN
   - Support cross-DAO initiatives

### Governance

KHAZ is a **capital allocation instrument**, not a governance token.

- **PARS holders** control KHAZ parameters via governance
- **KHAZ holders** have no voting rights
- **KHAZ value** accrues via fee inflows, yield, and strategic growth

### Contracts

| Contract | Address (TBD) | Purpose |
|:---------|:--------------|:--------|
| `KHAZVault` | - | Multi-asset ERC-4626 vault |
| `KHAZBondDepository` | - | Bond mechanism for KHAZ acquisition |
| `KHAZVestingEscrow` | - | Linear vesting of bonded KHAZ |
| `InvestmentRegistry` | - | Track deployed capital positions |
| `RebalanceController` | - | Automated rebalancing |

### Asset Allocation Targets

| Asset Class | Target | Min | Max |
|:------------|:-------|:----|:----|
| Stablecoins | 50% | 30% | 70% |
| ETH | 20% | 10% | 35% |
| WBTC | 10% | 5% | 20% |
| PARS | 15% | 5% | 25% |
| Other | 5% | 0% | 15% |

## Rationale

### Why Multi-Asset Strategy?

Treasury must balance:
1. **Stability**: Stablecoin base for operational needs
2. **Growth**: Exposure to crypto upside
3. **Alignment**: PARS holdings for protocol alignment

### Why Highest Fee Allocation (25%)?

Treasury is the backbone of protocol sustainability:
1. Funds all other DAOs when needed
2. Provides emergency reserves
3. Ensures long-term viability

### Why Active Management?

Unlike AMN (passive), KHAZ requires:
1. Regular rebalancing
2. Yield optimization
3. Strategic positioning

## Security Considerations

1. **Diversification Limits**: No single position > 25% of TVL
2. **Counterparty Limits**: No single protocol > 30% exposure
3. **Withdrawal Limits**: Max 5% of TVL per day
4. **Multi-sig for Large Movements**: > $1M requires 3-of-5 approval
5. **Yield Protocol Allowlist**: Only PARS-approved protocols

## References

- [PIP-0008: Ten DAO Governance Framework](./pip-0008-ten-dao-governance.md)
- [Yearn Finance Treasury Management](https://docs.yearn.fi/)

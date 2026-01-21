---
pip: 19
title: WAQF (Endowment/Venture DAO) - وقف
tags: [dao, endowment, waqf, venture, long-term]
description: Establishes the Endowment/Venture DAO (WAQF) for long-term capital growth and venture investments
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/19
order: 19
tier: core
---

## Abstract

This PIP establishes the **WAQF (وقف / Waqf) Endowment/Venture DAO**, the only DAO authorized to pursue higher-risk, long-horizon investments for perpetual capital growth.

## Specification

### DAO Identity

| Property | Value |
|:---------|:------|
| **Symbol** | WAQF |
| **Persian Name** | وقف (Waqf) |
| **English Name** | Endowment/Venture |
| **Domain** | Long-term capital growth, venture |
| **DAO ID** | `keccak256("WAQF")` |

### Token Configuration

| Property | Value |
|:---------|:------|
| **Token Name** | PARSDAO Endowment Shares |
| **Token Symbol** | WAQF |
| **Token Type** | ERC-4626 Vault Shares |
| **Base Asset** | Multi-asset (diversified) |

### Strategy Profile

| Parameter | Value |
|:----------|:------|
| **Allowed Assets** | Full diversification (all protocol-approved) |
| **Risk Level** | Higher (only DAO with this profile) |
| **Yield Strategy** | Active management, venture positions |
| **Fee Allocation** | 15% of protocol fees |

### Bond Parameters

| Parameter | Value |
|:----------|:------|
| **Vesting Period** | 30 days (longest) |
| **Max Discount** | 15% |
| **Max Payout per Bond** | 0.75% of supply |
| **Accepted Assets** | USDC, USDT, DAI, ETH, WBTC, PARS |

### Asset Allocation

| Asset Class | Target | Min | Max |
|:------------|:-------|:----|:----|
| Stablecoins | 20% | 10% | 40% |
| ETH/WBTC | 30% | 15% | 50% |
| PARS | 15% | 5% | 30% |
| DeFi Positions | 20% | 10% | 35% |
| Venture/Early Stage | 15% | 5% | 25% |

### Responsibilities

1. **Long-Term Growth**
   - Perpetual endowment model
   - Inflation-beating returns
   - Intergenerational wealth preservation

2. **Venture Investments**
   - Early-stage protocol investments
   - Strategic token acquisitions
   - Ecosystem development stakes

3. **Yield Optimization**
   - Active DeFi strategy
   - Liquid staking positions
   - LP management

4. **Risk Management**
   - Position sizing
   - Drawdown limits
   - Correlation monitoring

### Investment Committee

WAQF uniquely requires an Investment Committee:
- 5 members elected by PARS governance
- 3-of-5 approval for positions > $100k
- Quarterly performance review
- Public portfolio disclosure

### Contracts

| Contract | Purpose |
|:---------|:--------|
| `WAQFVault` | Multi-asset ERC-4626 vault |
| `WAQFBondDepository` | Bond mechanism |
| `VentureRegistry` | Investment tracking |
| `InvestmentCommittee` | Multi-sig for allocations |
| `RiskController` | Position limits enforcement |

### Risk Limits

| Limit | Value |
|:------|:------|
| Max single position | 10% of TVL |
| Max single protocol | 20% of TVL |
| Max illiquid assets | 30% of TVL |
| Drawdown trigger | -15% (30-day) |
| Emergency liquidation | -25% (30-day) |

## Rationale

### Why Higher Risk Profile?

WAQF is designed for:
1. **Perpetuity**: Endowment models require growth to outpace inflation
2. **Venture**: Strategic investments build ecosystem value
3. **Diversification**: Protocol needs exposure beyond stablecoins

### Why Longest Vesting (30 days)?

Venture-focused capital requires:
1. Patient capital
2. Long-term alignment
3. No quick flip incentives

### Why Investment Committee?

Higher risk requires:
1. Active oversight
2. Expert decision-making
3. Accountability structure

## Security Considerations

1. **Position Limits**: Enforced on-chain
2. **Drawdown Protection**: Automatic de-risking triggers
3. **Illiquidity Caps**: Cannot over-commit to illiquid positions
4. **Audit Requirements**: Quarterly portfolio audits
5. **Multi-sig**: All movements require committee approval

## References

- [PIP-0008: Ten DAO Governance Framework](./pip-0008-ten-dao-governance.md)
- [Harvard Endowment Model](https://www.hmc.harvard.edu/)
- [Yale Endowment Strategy](https://investments.yale.edu/)

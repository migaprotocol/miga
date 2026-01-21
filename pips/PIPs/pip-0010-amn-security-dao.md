---
pip: 10
title: AMN (Security DAO) - امنیّت
tags: [dao, security, amn, audit, bounty]
description: Establishes the Security DAO (AMN) for protocol security, audits, and incident response
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/10
order: 10
tier: core
---

## Abstract

This PIP establishes the **AMN (امنیّت / Amniyat) Security DAO**, the first of ten critical DAOs in PARSDAO's governance structure. AMN is responsible for protocol security, audit coordination, bug bounties, and incident response.

## Specification

### DAO Identity

| Property | Value |
|:---------|:------|
| **Symbol** | AMN |
| **Persian Name** | امنیّت (Amniyat) |
| **English Name** | Security |
| **Domain** | Protocol security, audits, incident response |
| **DAO ID** | `keccak256("AMN")` |

### Token Configuration

| Property | Value |
|:---------|:------|
| **Token Name** | PARSDAO Security Shares |
| **Token Symbol** | AMN |
| **Token Type** | ERC-4626 Vault Shares |
| **Base Asset** | USDC |
| **Decimals** | 18 |

### Strategy Profile

| Parameter | Value | Rationale |
|:----------|:------|:----------|
| **Allowed Assets** | USDC, USDT, DAI only | Minimal risk, predictable runway |
| **Risk Level** | Minimal | Security budget must be stable |
| **Yield Strategy** | None (or Aave/Compound < 5%) | Preserve capital, not grow it |
| **Rebalancing** | Quarterly | Infrequent, low complexity |

### Bond Parameters (Initial)

| Parameter | Value |
|:----------|:------|
| **Vesting Period** | 14 days |
| **Max Discount** | 10% |
| **Max Payout per Bond** | 0.5% of supply |
| **Max Debt Ratio** | 50% |
| **Accepted Assets** | USDC, USDT, DAI |
| **Epoch Duration** | 7 days |

### Fee Allocation

AMN receives **5%** of protocol fees routed through FeeRouter.

### Responsibilities

1. **Audit Coordination**
   - Commission smart contract audits
   - Review and publish audit reports
   - Track remediation of findings

2. **Bug Bounty Program**
   - Manage bounty payouts (severity-based)
   - Critical: up to $500,000
   - High: up to $100,000
   - Medium: up to $25,000
   - Low: up to $5,000

3. **Incident Response**
   - 24/7 security monitoring
   - Emergency pause authority (via EmergencyModule)
   - Post-incident analysis and remediation

4. **Security Standards**
   - Define security requirements for new contracts
   - Maintain security checklist for deployments
   - Review PRs for security implications

### Governance

AMN is a **capital allocation instrument**, not a governance token.

- **PARS holders** control AMN parameters via governance
- **AMN holders** have no voting rights
- **AMN value** accrues via fee inflows and yield

### Contracts

| Contract | Address (TBD) | Purpose |
|:---------|:--------------|:--------|
| `AMNVault` | - | ERC-4626 vault for AMN shares |
| `AMNBondDepository` | - | Bond mechanism for AMN acquisition |
| `AMNVestingEscrow` | - | Linear vesting of bonded AMN |
| `BugBountyRegistry` | - | Bounty claim and payout tracking |

## Rationale

### Why Stablecoins Only?

Security budgets must be:
1. **Predictable**: Auditors and bounty hunters expect stable payments
2. **Available**: No liquidation risk during market downturns
3. **Conservative**: Security is not a profit center

### Why Low Yield Strategy?

The primary goal is capital preservation, not growth. AMN's value comes from:
1. Fee inflows (5% of protocol fees)
2. Demand for security funding exposure
3. Bond mechanism discounts

### Why 14-Day Vesting?

Security funding should attract long-term aligned participants, not short-term traders.

## Security Considerations

1. **Emergency Pause**: AMN vault can be frozen by EmergencyModule
2. **Withdrawal Limits**: Max 10% of TVL per day
3. **Bounty Caps**: Individual bounties cannot exceed vault balance
4. **Multi-sig for Large Payouts**: Bounties > $100k require 3-of-5 approval

## References

- [PIP-0008: Ten DAO Governance Framework](./pip-0008-ten-dao-governance.md)
- [Immunefi Bug Bounty Best Practices](https://immunefi.com/learn/)

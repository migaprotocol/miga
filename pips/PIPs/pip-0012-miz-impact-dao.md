---
pip: 12
title: MIZ (Impact/Integrity DAO) - میزان
tags: [dao, impact, miz, audit, accountability, verification]
description: Establishes the Impact/Integrity DAO (MIZ) for verification, audit, and accountability
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/12
order: 12
tier: core
---

## Abstract

This PIP establishes the **MIZ (میزان / Mizān) Impact/Integrity DAO**, responsible for verification, audit, and accountability across all PARSDAO operations. MIZ ensures that all other DAOs operate with integrity and transparency.

## Specification

### DAO Identity

| Property | Value |
|:---------|:------|
| **Symbol** | MIZ |
| **Persian Name** | میزان (Mizān) |
| **English Name** | Impact/Integrity |
| **Domain** | Verification, audit, accountability |
| **DAO ID** | `keccak256("MIZ")` |

### Token Configuration

| Property | Value |
|:---------|:------|
| **Token Name** | PARSDAO Integrity Shares |
| **Token Symbol** | MIZ |
| **Token Type** | ERC-4626 Vault Shares |
| **Base Asset** | USDC |
| **Decimals** | 18 |

### Strategy Profile

| Parameter | Value | Rationale |
|:----------|:------|:----------|
| **Allowed Assets** | USDC, USDT, DAI only | Minimal risk, audit independence |
| **Risk Level** | Minimal | Must remain neutral/independent |
| **Yield Strategy** | None | Capital preservation only |
| **Rebalancing** | Quarterly | Minimal management |

### Bond Parameters (Initial)

| Parameter | Value |
|:----------|:------|
| **Vesting Period** | 21 days |
| **Max Discount** | 8% |
| **Max Payout per Bond** | 0.3% of supply |
| **Max Debt Ratio** | 40% |
| **Accepted Assets** | USDC, USDT, DAI |
| **Epoch Duration** | 7 days |

### Fee Allocation

MIZ receives **5%** of protocol fees.

### Responsibilities

1. **Receipt Verification**
   - Verify all ReceiptAnchor entries
   - Audit disbursement trails
   - Flag suspicious transactions

2. **DAO Audit**
   - Quarterly audit of each DAO's operations
   - Publish audit reports publicly
   - Track remediation of findings

3. **Accountability Reporting**
   - Impact metrics for all DAOs
   - Fund utilization tracking
   - Beneficiary outcome verification

4. **Integrity Tooling**
   - Develop and maintain audit tools
   - On-chain analytics dashboards
   - Automated compliance checks

5. **Whistleblower Program**
   - Anonymous reporting channel
   - Investigation and resolution
   - Protection for good-faith reporters

### Governance

MIZ is a **capital allocation instrument**, not a governance token.

- **PARS holders** control MIZ parameters via governance
- **MIZ holders** have no voting rights
- **MIZ value** accrues via fee inflows

### Contracts

| Contract | Address (TBD) | Purpose |
|:---------|:--------------|:--------|
| `MIZVault` | - | ERC-4626 vault for MIZ shares |
| `MIZBondDepository` | - | Bond mechanism for MIZ acquisition |
| `MIZVestingEscrow` | - | Linear vesting of bonded MIZ |
| `ReceiptVerifier` | - | On-chain receipt validation |
| `AuditRegistry` | - | Track audit findings and status |
| `WhistleblowerChannel` | - | Anonymous reporting (ZK-enabled) |

### Audit Schedule

| DAO | Frequency | Focus Areas |
|:----|:----------|:------------|
| KHAZ | Quarterly | Asset allocation, yield positions |
| AMN | Quarterly | Bounty payouts, audit trails |
| All DAOs | Semi-annually | Receipt verification, compliance |
| System-wide | Annually | Constitutional adherence |

## Rationale

### Why Minimal Risk Strategy?

MIZ must remain:
1. **Independent**: No financial entanglement with other DAOs
2. **Neutral**: No conflicts of interest
3. **Stable**: Cannot be compromised by market volatility

### Why Longer Vesting (21 days)?

Integrity oversight requires:
1. Long-term alignment
2. No short-term trading incentives
3. Committed participants

### Why Lower Bond Capacity?

MIZ is a small, focused DAO:
1. Limited operational budget
2. Lean team structure
3. Tooling over headcount

## Security Considerations

1. **Independence**: MIZ cannot receive grants from KHAZ
2. **Separation**: MIZ auditors cannot hold other DAO tokens
3. **Conflict Disclosure**: All MIZ contributors must disclose holdings
4. **Rotation**: External auditors rotate every 2 years
5. **Multi-sig**: All MIZ disbursements require 2-of-3 approval

## References

- [PIP-0008: Ten DAO Governance Framework](./pip-0008-ten-dao-governance.md)
- [DAO Transparency Standards](https://daotransparency.org/)

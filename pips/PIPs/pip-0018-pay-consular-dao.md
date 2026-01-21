---
pip: 18
title: PAY (Consular DAO) - پیام
tags: [dao, consular, pay, diplomacy, coordination]
description: Establishes the Consular DAO (PAY) for diplomatic relations and cross-DAO coordination
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/18
order: 18
tier: core
---

## Abstract

This PIP establishes the **PAY (پیام / Payām) Consular DAO**, responsible for diplomatic relations, external partnerships, and cross-DAO coordination.

## Specification

### DAO Identity

| Property | Value |
|:---------|:------|
| **Symbol** | PAY |
| **Persian Name** | پیام (Payām) |
| **English Name** | Consular |
| **Domain** | Diplomatic relations, cross-DAO coordination |
| **DAO ID** | `keccak256("PAY")` |

### Token Configuration

| Property | Value |
|:---------|:------|
| **Token Name** | PARSDAO Consular Shares |
| **Token Symbol** | PAY |
| **Token Type** | ERC-4626 Vault Shares |
| **Base Asset** | USDC |

### Strategy Profile

| Parameter | Value |
|:----------|:------|
| **Allowed Assets** | USDC, USDT, DAI only |
| **Risk Level** | Minimal |
| **Yield Strategy** | None |
| **Fee Allocation** | 3% of protocol fees |

### Bond Parameters

| Parameter | Value |
|:----------|:------|
| **Vesting Period** | 14 days |
| **Max Discount** | 8% |
| **Max Payout per Bond** | 0.3% of supply |
| **Accepted Assets** | USDC, USDT, DAI |

### Responsibilities

1. **External Relations**
   - Partnerships with other DAOs/protocols
   - Industry association membership
   - Government/regulatory liaison

2. **Cross-DAO Coordination**
   - Inter-DAO communication
   - Joint initiative facilitation
   - Resource sharing agreements

3. **Community Representation**
   - Conference participation
   - Media relations
   - Public speaking

4. **Treaty Management**
   - Partnership agreements
   - Protocol integrations
   - Cross-chain relationships

### Contracts

| Contract | Purpose |
|:---------|:--------|
| `PAYVault` | ERC-4626 vault |
| `PAYBondDepository` | Bond mechanism |
| `PartnershipRegistry` | Agreement tracking |
| `TreatyArchive` | Partnership documents |

## References

- [PIP-0008: Ten DAO Governance Framework](./pip-0008-ten-dao-governance.md)

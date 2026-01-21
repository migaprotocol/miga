---
pip: 17
title: SAZ (Infrastructure DAO) - سازندگی
tags: [dao, infrastructure, saz, procurement, construction]
description: Establishes the Infrastructure DAO (SAZ) for physical and digital infrastructure
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/17
order: 17
tier: core
---

## Abstract

This PIP establishes the **SAZ (سازندگی / Sāzandegi) Infrastructure DAO**, responsible for physical and digital infrastructure development.

## Specification

### DAO Identity

| Property | Value |
|:---------|:------|
| **Symbol** | SAZ |
| **Persian Name** | سازندگی (Sāzandegi) |
| **English Name** | Infrastructure |
| **Domain** | Physical/digital infrastructure |
| **DAO ID** | `keccak256("SAZ")` |

### Token Configuration

| Property | Value |
|:---------|:------|
| **Token Name** | PARSDAO Infrastructure Shares |
| **Token Symbol** | SAZ |
| **Token Type** | ERC-4626 Vault Shares |
| **Base Asset** | USDC |

### Strategy Profile

| Parameter | Value |
|:----------|:------|
| **Allowed Assets** | USDC, USDT, DAI + invoice credits |
| **Risk Level** | Low |
| **Yield Strategy** | Minimal |
| **Fee Allocation** | 10% of protocol fees |

### Bond Parameters

| Parameter | Value |
|:----------|:------|
| **Vesting Period** | 14 days |
| **Max Discount** | 10% |
| **Max Payout per Bond** | 0.5% of supply |
| **Accepted Assets** | USDC, USDT, DAI |

### Responsibilities

1. **Digital Infrastructure**
   - Node operations and hosting
   - Data centers and cloud services
   - Developer tooling infrastructure

2. **Physical Infrastructure**
   - Community centers
   - Educational facilities
   - Healthcare infrastructure

3. **Procurement**
   - Hardware acquisition
   - Software licensing
   - Service contracts

4. **Maintenance**
   - Ongoing operational costs
   - Upgrades and replacements
   - Technical support

### Contracts

| Contract | Purpose |
|:---------|:--------|
| `SAZVault` | ERC-4626 vault |
| `SAZBondDepository` | Bond mechanism |
| `ProcurementRegistry` | Asset tracking |
| `InvoiceManager` | Supplier payments |

## References

- [PIP-0008: Ten DAO Governance Framework](./pip-0008-ten-dao-governance.md)

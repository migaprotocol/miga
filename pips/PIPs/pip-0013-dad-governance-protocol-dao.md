---
pip: 13
title: DAD (Governance Protocol DAO) - داد
tags: [dao, governance, dad, rules, constitutional]
description: Establishes the Governance Protocol DAO (DAD) for rules, constraints, and constitutional matters
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/13
order: 13
tier: core
---

## Abstract

This PIP establishes the **DAD (داد / Dād) Governance Protocol DAO**, responsible for governance infrastructure, constitutional interpretation, and protocol rules.

## Specification

### DAO Identity

| Property | Value |
|:---------|:------|
| **Symbol** | DAD |
| **Persian Name** | داد (Dād) |
| **English Name** | Governance Protocol |
| **Domain** | Rules, constraints, constitutional |
| **DAO ID** | `keccak256("DAD")` |

### Token Configuration

| Property | Value |
|:---------|:------|
| **Token Name** | PARSDAO Governance Protocol Shares |
| **Token Symbol** | DAD |
| **Token Type** | ERC-4626 Vault Shares |
| **Base Asset** | USDC |
| **Decimals** | 18 |

### Strategy Profile

| Parameter | Value |
|:----------|:------|
| **Allowed Assets** | USDC, USDT, DAI only |
| **Risk Level** | Minimal |
| **Yield Strategy** | None |
| **Fee Allocation** | 5% of protocol fees |

### Bond Parameters

| Parameter | Value |
|:----------|:------|
| **Vesting Period** | 14 days |
| **Max Discount** | 8% |
| **Max Payout per Bond** | 0.4% of supply |
| **Accepted Assets** | USDC, USDT, DAI |

### Responsibilities

1. **Governance Infrastructure**
   - Maintain voting contracts
   - Develop delegation systems
   - Build governance tooling

2. **Constitutional Interpretation**
   - Interpret constitutional provisions
   - Resolve governance disputes
   - Document precedents

3. **Parameter Management**
   - Propose parameter changes
   - Monitor governance health metrics
   - Optimize voting thresholds

4. **PIP Process**
   - Manage PIP lifecycle
   - Review and categorize proposals
   - Maintain PIP registry

### Contracts

| Contract | Purpose |
|:---------|:--------|
| `DADVault` | ERC-4626 vault |
| `DADBondDepository` | Bond mechanism |
| `PIPRegistry` | Proposal tracking |
| `ConstitutionalOracle` | Interpretation records |

## References

- [PIP-0008: Ten DAO Governance Framework](./pip-0008-ten-dao-governance.md)
- [PIP-0001: Constitution](./pip-0001-constitution.md)

---
pip: 16
title: DAN (Research DAO) - دانش
tags: [dao, research, dan, science, rnd]
description: Establishes the Research DAO (DAN) for scientific research and open-source R&D
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/16
order: 16
tier: core
---

## Abstract

This PIP establishes the **DAN (دانش / Dānesh) Research DAO**, responsible for scientific research, open-source R&D, and knowledge creation.

## Specification

### DAO Identity

| Property | Value |
|:---------|:------|
| **Symbol** | DAN |
| **Persian Name** | دانش (Dānesh) |
| **English Name** | Research |
| **Domain** | Scientific research, open-source R&D |
| **DAO ID** | `keccak256("DAN")` |

### Token Configuration

| Property | Value |
|:---------|:------|
| **Token Name** | PARSDAO Research Shares |
| **Token Symbol** | DAN |
| **Token Type** | ERC-4626 Vault Shares |
| **Base Asset** | USDC |

### Strategy Profile

| Parameter | Value |
|:----------|:------|
| **Allowed Assets** | USDC, USDT, DAI |
| **Risk Level** | Low |
| **Yield Strategy** | Minimal |
| **Fee Allocation** | 10% of protocol fees |

### Bond Parameters

| Parameter | Value |
|:----------|:------|
| **Vesting Period** | 21 days |
| **Max Discount** | 10% |
| **Max Payout per Bond** | 0.5% of supply |
| **Accepted Assets** | USDC, USDT, DAI |

### Responsibilities

1. **Research Grants**
   - Fund academic research
   - Support PhD students
   - Post-doctoral fellowships

2. **Open-Source Development**
   - Core protocol research
   - Cryptographic innovations
   - Tooling and infrastructure

3. **Publication Support**
   - Open-access journal fees
   - Conference attendance
   - Research dissemination

4. **Knowledge Preservation**
   - Research archive maintenance
   - Dataset curation
   - Reproducibility initiatives

### Contracts

| Contract | Purpose |
|:---------|:--------|
| `DANVault` | ERC-4626 vault |
| `DANBondDepository` | Bond mechanism |
| `ResearchGrantRegistry` | Grant tracking |
| `PublicationArchive` | Research outputs |

## References

- [PIP-0008: Ten DAO Governance Framework](./pip-0008-ten-dao-governance.md)
- [DeSci Movement](https://www.desci.com/)

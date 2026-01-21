---
pip: 14
title: SAL (Health DAO) - سلامت
tags: [dao, health, sal, humanitarian, aid]
description: Establishes the Health DAO (SAL) for humanitarian aid, health initiatives, and emergency relief
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/14
order: 14
tier: core
---

## Abstract

This PIP establishes the **SAL (سلامت / Salāmat) Health DAO**, responsible for humanitarian aid, health initiatives, and emergency relief operations.

## Specification

### DAO Identity

| Property | Value |
|:---------|:------|
| **Symbol** | SAL |
| **Persian Name** | سلامت (Salāmat) |
| **English Name** | Health |
| **Domain** | Humanitarian, aid, emergency relief |
| **DAO ID** | `keccak256("SAL")` |

### Token Configuration

| Property | Value |
|:---------|:------|
| **Token Name** | PARSDAO Health Shares |
| **Token Symbol** | SAL |
| **Token Type** | ERC-4626 Vault Shares |
| **Base Asset** | USDC |
| **Decimals** | 18 |

### Strategy Profile

| Parameter | Value |
|:----------|:------|
| **Allowed Assets** | USDC, USDT, DAI + short-duration yield |
| **Risk Level** | Low |
| **Yield Strategy** | Aave/Compound (< 30 day positions) |
| **Fee Allocation** | 10% of protocol fees |

### Bond Parameters

| Parameter | Value |
|:----------|:------|
| **Vesting Period** | 14 days |
| **Max Discount** | 10% |
| **Max Payout per Bond** | 0.5% of supply |
| **Accepted Assets** | USDC, USDT, DAI |

### Responsibilities

1. **Humanitarian Aid**
   - Fund health clinics in underserved areas
   - Medical supply procurement
   - Emergency medicine access

2. **Emergency Relief**
   - Rapid response to natural disasters
   - Pandemic preparedness funds
   - Crisis intervention

3. **Health Education**
   - Public health campaigns
   - Medical training scholarships
   - Healthcare worker support

4. **Mental Health**
   - Mental health services funding
   - Crisis hotline support
   - Therapy access programs

### Disbursement Requirements

- All disbursements require verified healthcare recipient
- Receipts anchored within 72 hours of spend
- Impact metrics reported quarterly

### Contracts

| Contract | Purpose |
|:---------|:--------|
| `SALVault` | ERC-4626 vault |
| `SALBondDepository` | Bond mechanism |
| `HealthGrantRegistry` | Grant tracking |
| `EmergencyDisburser` | Fast-track emergency funds |

## References

- [PIP-0008: Ten DAO Governance Framework](./pip-0008-ten-dao-governance.md)
- [WHO Health Guidelines](https://www.who.int/)

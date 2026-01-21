---
pip: 6
title: Token Economics
tags: [token, economics, CYRUS, PARS, xPARS, vePARS]
description: Complete token economics for CYRUS, PARS, xPARS, and vePARS including supply schedules and distribution mechanisms
author: Cyrus Protocol Team (@cyrusdao)
status: Final
type: Standards Track
category: Core
created: 2026-01-12
discussions-to: https://github.com/cyrusdao/pips/discussions/7
order: 6
tier: core
---

## Abstract

This PIP defines the token economics for the Cyrus Protocol, including supply schedules, distribution mechanisms, and economic incentives for CYRUS, PARS, xPARS, and vePARS tokens.

## CYRUS Token

### Overview

CYRUS is the primary governance token representing ownership in the protocol.

### Supply

| Allocation | Amount | Percentage | Vesting |
|:-----------|:-------|:-----------|:--------|
| **Bonding Curve** | 900,000,000 | 90% | Unlocked at purchase |
| **LP Reserve** | 100,000,000 | 10% | Unlocked (liquidity) |
| **Total** | 1,000,000,000 | 100% | - |

### Bonding Curve

```
Price = $0.01 + $0.99 × (sold / 900,000,000)²
```

| Tokens Sold | Price | Cumulative Cost |
|:------------|:------|:----------------|
| 0 | $0.01 | $0 |
| 100M | $0.0223 | ~$1.22M |
| 300M | $0.1189 | ~$21.9M |
| 500M | $0.3156 | ~$99.2M |
| 700M | $0.6078 | ~$265M |
| 900M | $1.00 | ~$600M |

### Transfer Restrictions

- **Lock Period**: Transfers disabled until Nowruz 2026 (March 20, 2026)
- **Exceptions**: `lpWallet` address can transfer for liquidity provisioning
- **Unlock**: Automatic at `NOWRUZ_2026` timestamp

### Features

- ERC20Votes compatible (OpenZeppelin)
- Checkpointed voting power
- Delegation support
- No inflation (fixed supply)

## PARS Token

### Overview

PARS is the emissions/rewards token distributed through gauges and bonds.

### Supply

| Parameter | Value |
|:----------|:------|
| **Initial Supply** | 0 |
| **Max Supply** | Unlimited (governance-controlled) |
| **Emission Rate** | 1,000,000 PARS/week (adjustable) |
| **Minter** | GaugeController |

### Emission Budget

```
Weekly Budget = E_gauges + E_bonds + E_grants

Where:
- E_gauges: Gauge emissions (60-80%)
- E_bonds: Bond program (10-30%)
- E_grants: Community grants (10%)
```

### Distribution Flow

```
GaugeController
      │
      ├─▶ RewardsGauge (LP staking rewards)
      │
      ├─▶ BondDepository (bond payouts)
      │
      └─▶ Treasury (grants, operations)
```

## xPARS Token

### Overview

xPARS is the rebasing staked representation of PARS, inspired by OHM/sOHM.

### Mechanics

```solidity
// User's xPARS balance = gons / gonsPerFragment
// When rebase happens: gonsPerFragment decreases
// Effect: All balances increase proportionally
```

| Parameter | Value |
|:----------|:------|
| **Rebase Frequency** | Every epoch (7 days) |
| **APY Target** | Variable (set by governance) |
| **Backing** | 1 xPARS = 1 PARS always |

### Staking Flow

```
User deposits PARS
      │
      ▼
xPARS.stake(amount)
      │
      ▼
User receives xPARS (gons / currentIndex)
      │
      ▼
Rebases increase user's xPARS balance
      │
      ▼
xPARS.unstake() → receive PARS (more than deposited)
```

### Index Calculation

```
newIndex = oldIndex × (1 + rebaseRate)
userBalance = userGons / gonsPerFragment
```

## vePARS Token

### Overview

vePARS is vote-escrowed PARS providing governance voting power that decays over time.

### Lock Parameters

| Parameter | Value |
|:----------|:------|
| **Min Lock** | 1 week |
| **Max Lock** | 4 years |
| **Decay** | Linear over lock period |

### Voting Power Formula

```
votingPower = lockedPARS × (timeRemaining / maxTime)

Example:
- Lock 1000 PARS for 4 years → 1000 vePARS
- After 2 years → 500 vePARS
- After 4 years → 0 vePARS (can withdraw)
```

### Use Cases

1. **PIP Voting**: Governance proposals
2. **Gauge Voting**: Direct emissions to preferred gauges
3. **Fee Distribution**: Share of protocol fees (future)
4. **Boost**: Increased rewards in gauges (future)

### Lock Actions

| Action | Effect |
|:-------|:-------|
| `createLock(amount, unlockTime)` | Lock PARS, receive vePARS |
| `increaseAmount(amount)` | Add more PARS to existing lock |
| `increaseUnlockTime(newTime)` | Extend lock duration |
| `withdraw()` | After expiry, reclaim PARS |

## Economic Flywheel

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          ECONOMIC FLYWHEEL                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  1. Buy CYRUS (governance)                                                      │
│        │                                                                        │
│        ▼                                                                        │
│  2. Provide LP (CYRUS/ETH) ──────────────────────────┐                         │
│        │                                              │                         │
│        ▼                                              ▼                         │
│  3. Stake LP in Gauge ◄─────── OR ──────► 4. Bond LP for PARS                  │
│        │                                              │                         │
│        ▼                                              ▼                         │
│  5. Earn PARS rewards                     6. Receive discounted PARS           │
│        │                                              │                         │
│        └────────────────────┬─────────────────────────┘                         │
│                             ▼                                                   │
│  7. Stake PARS → xPARS (rebasing yield)                                        │
│        │                                                                        │
│        ▼                                                                        │
│  8. Lock PARS → vePARS (voting power)                                          │
│        │                                                                        │
│        ▼                                                                        │
│  9. Vote on gauge weights → More emissions to preferred gauges                  │
│        │                                                                        │
│        └─────────────────────────────────────────────────────────► Loop to 2   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Security Considerations

1. **Inflation Control**: PARS emission caps prevent hyperinflation
2. **Lock Periods**: vePARS prevents short-term speculation on votes
3. **Rebasing Safety**: xPARS maintains 1:1 PARS backing
4. **Flash Loan Resistance**: Checkpointed voting power

## References

- [OlympusDAO sOHM](https://docs.olympusdao.finance/main/basics/staking)
- [Curve veCRV](https://curve.readthedocs.io/dao-vecrv.html)
- [Balancer veBAL](https://docs.balancer.fi/concepts/governance/veBAL/)

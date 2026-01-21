---
pip: 0
title: Cyrus Protocol Architecture
tags: [protocol, core, architecture, token]
description: Establishes the foundational architecture including token structure, governance mechanisms, and economic design.
author: Cyrus Protocol Team (@cyrusdao)
status: Final
type: Standards Track
category: Core
created: 2026-01-12
discussions-to: https://github.com/cyrusdao/pips/discussions/1
order: 0
tier: core
---

## Abstract

Cyrus Protocol is a multi-token governance ecosystem designed for the global Iranian diaspora. This PIP establishes the foundational architecture including token structure, governance mechanisms, and economic design.

## Motivation

The Iranian diaspora represents over 8 million people globally, lacking unified financial infrastructure for community coordination. Cyrus Protocol addresses this by providing:

1. **Governance Token (CYRUS)**: Community ownership and decision-making
2. **Emissions Token (PARS)**: Sustainable incentives for participation
3. **Vote-Escrow (vePARS)**: Long-term alignment through time-locked voting
4. **Staked Token (xPARS)**: Yield-bearing rebasing representation

## Specification

### Token Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           CYRUS PROTOCOL TOKEN FLOW                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│                          USDT/ETH                                                   │
│                              │                                                      │
│                              ▼                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                     CYRUS (Governance Token)                                  │   │
│  │  • ERC20Votes compatible                                                     │   │
│  │  • Quadratic bonding curve ($0.01 → $1.00)                                  │   │
│  │  • Transfer locked until Nowruz 2026                                         │   │
│  │  • 100M LP reserve (unlocked) + 900M from curve                              │   │
│  └──────────────────────────────────┬──────────────────────────────────────────┘   │
│                                      │                                              │
│                                      │ Stake for voting                             │
│                                      ▼                                              │
│  ┌────────────────────────────────────────────────────────────────────────────┐    │
│  │                        CyrusDAO (Governor)                                  │    │
│  │  • OZ Governor compatible                                                   │    │
│  │  • Proposal lifecycle: Draft → Vote → Execute                               │    │
│  │  • Board members for emergency actions                                      │    │
│  └────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                      PARS (Emissions Token)                                  │   │
│  │  • Minted by GaugeController                                                 │   │
│  │  • Weekly emissions to gauges                                                │   │
│  │  • No cap (governance-controlled inflation)                                  │   │
│  └──────────────┬───────────────────────────────────┬──────────────────────────┘   │
│                 │                                    │                              │
│                 ▼                                    ▼                              │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐               │
│  │     xPARS (Staked)          │    │     vePARS (Vote-Escrow)    │               │
│  │  • Rebasing (OHM-style)     │    │  • Lock PARS for 1w-4y      │               │
│  │  • Index-based accounting   │    │  • Voting power decay       │               │
│  │  • Auto-compounding         │    │  • Gauge weight voting      │               │
│  │  • 1:1 backed by PARS       │    │  • PIP voting power         │               │
│  └─────────────────────────────┘    └─────────────────────────────┘               │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Contract Addresses (Localhost)

| Contract | Address | Description |
|:---------|:--------|:------------|
| CYRUS | `0x3Aa5ebB10DC797CAC828524e59A333d0A371443c` | Governance token |
| CyrusDAO | `0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44` | Governor contract |
| PARS | `0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f` | Emissions token |
| xPARS | `0x4A679253410272dd5232B3Ff7cF5dbB88f295319` | Staked PARS |
| GaugeController | `0x7a2088a1bFc9d81c55368AE168C2C02570cB814F` | Emission distribution |
| RewardsGauge | `0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690` | LP staking rewards |

### Governance Structure

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                          GOVERNANCE HIERARCHY                                     │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  vePARS Holders                                                                  │
│       │                                                                          │
│       │ Vote on PIPs                                                             │
│       ▼                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────┐  │
│  │                         CyrusDAO (Governor)                                 │  │
│  │                                                                             │  │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │  │
│  │  │  Gauge Weights   │  │  Treasury Mgmt   │  │  Protocol Params │         │  │
│  │  │  (emissions)     │  │  (grants, ops)   │  │  (fees, caps)    │         │  │
│  │  └──────────────────┘  └──────────────────┘  └──────────────────┘         │  │
│  │                                                                             │  │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │  │
│  │  │   Sub-DAOs       │  │  Working Groups  │  │  Emergency Board │         │  │
│  │  │  (regional)      │  │  (committees)    │  │  (3/5 multisig)  │         │  │
│  │  └──────────────────┘  └──────────────────┘  └──────────────────┘         │  │
│  └────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

## Rationale

### Why Multiple Tokens?

1. **CYRUS** (Governance): Provides ownership and launch fundraising via bonding curve
2. **PARS** (Emissions): Separates inflation from governance value; sustainable incentives
3. **vePARS** (Voting): Time-locks align long-term interests; prevents vote buying
4. **xPARS** (Staking): Auto-compounding simplifies UX; enables DeFi composability

### Why Quadratic Bonding Curve?

The quadratic curve `price = 0.01 + 0.99 * (sold/900M)²` ensures:
- Early supporters get better prices
- Price discovery happens organically
- No arbitrary "fair launch" mechanics
- LP reserve (100M) provides initial liquidity

### Why vePARS over veNFTs?

- Simpler implementation (Curve-style proven)
- Linear decay is predictable
- No fragmentation of voting power
- Can always extend lock without complexity

## Security Considerations

1. **Flash Loan Protection**: vePARS locks prevent flash loan governance attacks
2. **Time Delays**: 2-day timelock on all governance actions
3. **Emergency Powers**: Board can pause in emergencies (7/9 multisig required for critical actions)
4. **Upgrade Path**: Contracts are upgradeable via governance vote

## Implementation

See contract implementations in:
- `/contracts/CYRUS.sol` - Governance token
- `/contracts/CyrusDAO.sol` - Governor
- `/contracts/PARS.sol` - Emissions token
- `/contracts/xPARS.sol` - Staked PARS
- `/contracts/vePARS.sol` - Vote-escrow
- `/contracts/CyrusGaugeController.sol` - Emission distribution
- `/contracts/CyrusRewardsGauge.sol` - LP staking

## References

- [Curve Finance veCRV](https://curve.readthedocs.io/dao-vecrv.html)
- [OlympusDAO Bonding](https://docs.olympusdao.finance/)
- [OpenZeppelin Governor](https://docs.openzeppelin.com/contracts/4.x/governance)

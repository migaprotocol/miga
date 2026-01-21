# PARS Improvement Proposals (PIPs) 🔥

<div align="center">

**The governance and standardization framework for the [Cyrus Protocol](https://cyrus.cash)**

_Cyrus is a governance token ecosystem for the global Iranian diaspora, featuring CYRUS (governance), PARS (emissions), and vePARS (voting escrow)._

[![Documentation](https://img.shields.io/badge/docs-latest-brightgreen?style=for-the-badge)](https://docs.cyrus.cash)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](./LICENSE)

</div>

---

## 🏛️ Protocol Architecture

Cyrus Protocol operates a **multi-token governance ecosystem** designed for the Iranian diaspora:

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                          🟢 CYRUS PROTOCOL ARCHITECTURE 🟢                            │
├───────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│   TOKEN LAYER                                                                         │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │   CYRUS     │  │    PARS     │  │    xPARS    │  │   vePARS    │                │
│   │ Collateral  │  │  Emissions  │  │  Multiplied │  │   Voting    │                │
│   │ Alignment   │  │  Demurrage  │  │  Rebasing   │  │   Escrow    │                │
│   │   🔷        │  │    🟢       │  │    🟢       │  │    🟢       │                │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘                │
│                                                                                       │
│   GOVERNANCE LAYER                                                                    │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │  CyrusDAO   │  │   Gauge     │  │   Rewards   │  │    Bond     │                │
│   │  Governor   │  │ Controller  │  │   Gauge     │  │ Depository  │                │
│   │   OZ Gov    │  │  Emissions  │  │  LP Stake   │  │  OHM-style  │                │
│   │    🟢       │  │    🟢       │  │    🟢       │  │    🟢       │                │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘                │
│                                                                                       │
│   LIQUIDITY LAYER                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│   │  CYRUS/ETH Pool • PARS/ETH Pool • Protocol-Owned Liquidity (POL)               │ │
│   │  LP Bonds • Reserve Bonds • Quadratic Duration Bonuses                          │ │
│   └─────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                       │
│   Legend: 🔷 Launch Token • 🟢 Active • 📡 Cross-Chain Ready                         │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### 📋 Browse Proposals
- **[All PIPs Index](./PIPs)** - Complete list of all PARS Improvement Proposals
- **[Documentation](https://docs.cyrus.cash)** - Interactive docs
- **[Protocol Overview](./PIPs/pip-0000-protocol-architecture.md)** - Core design

### 🎯 Essential PIPs
| Category | Resource | Description | Discussion |
|:---------|:---------|:------------|:-----------|
| **Core Architecture** | [PIP-0000](./PIPs/pip-0000-protocol-architecture.md) | Protocol foundation | [Discuss](https://github.com/cyrusdao/pips/discussions/1) |
| **Constitution** | [PIP-0001](./PIPs/pip-0001-constitution.md) | Pars Network constitution | [Discuss](https://github.com/cyrusdao/pips/discussions/2) |
| **Token Economics** | [PIP-0001b](./PIPs/pip-0001-token-economics.md) | CYRUS, PARS, xPARS, vePARS | [Discuss](https://github.com/cyrusdao/pips/discussions/7) |
| **Quadratic Voting** | [PIP-0002](./PIPs/pip-0002-quadratic-timelock-voting.md) | Quadratic time-locked voting | [Discuss](https://github.com/cyrusdao/pips/discussions/3) |
| **Paired Lock** | [PIP-0003](./PIPs/pip-0003-paired-lock-governance.md) | PARS + CYRUS → vePARS | [Discuss](https://github.com/cyrusdao/pips/discussions/4) |
| **Grants Framework** | [PIP-0004](./PIPs/pip-0004-techno-capital-grants.md) | Techno-capital grants | [Discuss](https://github.com/cyrusdao/pips/discussions/5) |
| **Strategic Execution** | [PIP-0005](./PIPs/pip-0005-strategic-execution.md) | Market entry & growth | [Discuss](https://github.com/cyrusdao/pips/discussions/6) |

---

## 📁 PIP Categories

| Range | Category | Description |
|:------|:---------|:------------|
| 0xxx | **Core** | Protocol architecture, philosophy, standards |
| 1xxx | **Tokens** | Token standards, economics, distribution |
| 2xxx | **Governance** | DAO, voting, proposals, treasury |
| 3xxx | **DeFi** | Bonding, gauges, liquidity, staking |
| 4xxx | **Grants** | Community grants, diaspora programs |
| 5xxx | **Integrations** | Cross-chain, bridges, partnerships |
| 6xxx | **Security** | Audits, bug bounties, incident response |
| 7xxx | **Sub-DAOs** | Regional chapters, working groups |

---

## 📝 PIP Template

```markdown
# PIP-XXXX: Title

## Summary
One paragraph description.

## Motivation
Why is this needed?

## Specification
Technical details and implementation.

## Rationale
Design decisions and alternatives considered.

## Security Considerations
Risks and mitigations.

## Implementation
Code, timeline, and deployment plan.
```

---

## 🗳️ PIP Lifecycle

```
Draft → Review → Voting → Approved/Rejected → Implemented
```

1. **Draft**: Author creates PIP following template
2. **Review**: Community discussion (minimum 7 days)
3. **Voting**: vePARS holders vote on-chain
4. **Approved**: Passes with >50% approval and quorum
5. **Implemented**: Development and deployment

### Voting Requirements
- **Quorum**: 4% of total vePARS supply
- **Approval**: >50% of votes in favor
- **Voting Period**: 7 days
- **Timelock**: 2 days before execution

---

## 🤝 Contributing

1. Fork this repository
2. Create `PIPs/pip-XXXX-title.md` following template
3. Submit PR for review
4. Engage with community feedback
5. Once approved, proposal goes to on-chain vote

---

## 📜 License

MIT License - see [LICENSE](./LICENSE)

---

## 🔗 Links

- **Website**: [cyrus.cash](https://cyrus.cash)
- **Governance App**: [gov.cyrus.cash](https://gov.cyrus.cash)
- **Docs**: [docs.cyrus.cash](https://docs.cyrus.cash)
- **Discord**: [discord.gg/cyrus](https://discord.gg/cyrus)
- **Twitter**: [@CyrusProtocol](https://twitter.com/CyrusProtocol)

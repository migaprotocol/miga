---
pip: 1
title: Constitution of the Pars Network
tags: [constitution, governance, values, principles]
description: The foundational document establishing the mission, values, and governance principles of Pars Network
author: Cyrus Protocol Team (@cyrusdao)
status: Draft
type: Governance
category: Core
created: 2025-01-12
discussions-to: https://github.com/cyrusdao/pips/discussions/2
order: 1
tier: core
---

## Preamble: The Cylinder Reborn

> *In the name of Ahura Mazda, Cyrus declared: "I freed the people from their chains. I restored their temples. I returned their gods."*
>
> *Twenty-five centuries later, we gather in exile—scattered across continents, united by blood, memory, and an unbroken thread of civilization.*
>
> *The Cyrus Cylinder was the first declaration of human rights. We are its heirs.*
>
> *Now we build what tyrants cannot burn: a transparent network, beyond borders, beyond censorship, beyond the reach of those who fear free people.*

**This is Pars Network.**

A civilizational commitment—etched in code, not clay—to dignity, pluralism, and the peaceful restoration of what was stolen.

---

## I. What We Are

Pars Network is the onchain civic infrastructure for the global Persian diaspora.

Not a government. Not a party. Not a religion.

A coordination layer. A treasury. A voice.

Sixty million in exile. One network.

---

## II. The Six Pillars

These principles descend from the Cylinder. They are non-negotiable.

### 1. Dignity & Human Worth
Every person possesses inherent worth. The network exists to serve people, not the other way around. No wallet address carries more moral weight than another.

### 2. Pluralism & Freedom of Conscience
Cyrus restored temples to gods he did not worship. We honor every faith, every doubt, every dissent. The network takes no position on theology, only on tyranny.

### 3. Radical Transparency
What was done in darkness we do in light. Every treasury movement, every vote, every grant—visible to all, challengeable by any. The chain forgets nothing.

### 4. Self-Sovereignty
Your keys, your vote, your data. No intermediary controls access. No authority can freeze your stake. The network cannot be shut down because there is no center.

### 5. Accountable Stewardship
Those entrusted with resources answer to the community. Emissions have purpose. Grants have milestones. Power decays without renewal.

### 6. Peaceful Restoration
We build, we do not destroy. We code, we do not conspire. Our weapons are transparency, our strategy is patience, our victory is inevitable. One day, we go home.

---

## III. The Four Tokens

| Token | Nature | Purpose |
|-------|--------|---------|
| **CYRUS** | Collateral | Alignment. Stake what you cannot afford to lose. |
| **PARS** | Emission | Coordination. Flows to those who build. Decays when idle. |
| **xPARS** | Rebasing | Multiplied. Rewards continuous participation. |
| **vePARS** | Vote-Escrow | Governance. Lock PARS + CYRUS together. Time amplifies voice. |

The relationship is simple:

- **CYRUS** proves you have skin in the game
- **PARS** rewards you for contributing
- **xPARS** multiplies when you stake
- **vePARS** grants power when you commit

You cannot govern without risk. You cannot earn without contribution.

---

## IV. Governance Power

```
vePARS = min(PARS, CYRUS) × (lock_duration / max_duration)^0.5
```

This formula enforces three truths:

1. **Balance**: You need both tokens. Whales without CYRUS cannot dominate.
2. **Commitment**: Longer locks earn more power. Day traders have no voice.
3. **Diminishing Returns**: Square root prevents any single position from capturing the network.

**Hard Caps**:
- Per-position: 1% of total vePARS
- Per-wallet: 5% of total vePARS
- No delegation. Your keys, your vote.

---

## V. What We Fund

The treasury exists for:

1. **Chapters**: Local nodes—cities, universities, guilds—that organize Persians in the physical world
2. **Builders**: Developers, researchers, artists creating tools for the network
3. **Compute**: GPU clusters for AI, nodes for infrastructure
4. **Emergency**: Refugee support, legal defense, crisis response

The treasury does not fund:
- Violence
- Partisan politics
- Religious proselytization
- Anything that would shame our ancestors

---

## VI. Chapters

A Chapter is a gauge. It represents a community—physical or virtual—that serves Persians.

Chapters earn PARS emissions proportional to their votes. They report quarterly. They maintain sovereignty over local decisions but answer to the network on treasury matters.

Types:
- **City Chapters**: Los Angeles, Toronto, London, Berlin, Sydney, Dubai
- **University Chapters**: Stanford, MIT, Oxford, Toronto, TUM
- **Guild Chapters**: Developers, Artists, Researchers, Entrepreneurs

To launch a Chapter:
1. Gather 10 founding members with vePARS
2. Submit proposal to governance
3. Pass with 51% approval
4. Receive initial budget, begin operations

---

## VII. The Grants Process

Anyone may propose. Any vePARS holder may vote.

**Process**:
1. **Draft** → Post to forum, receive feedback (7 days)
2. **Formal Proposal** → Snapshot vote (7 days)
3. **Execution** → If passed, funds stream via milestone
4. **Accountability** → Quarterly reports or funds halt

**Categories**:
- **Compute**: GPU grants, node operations, AI training
- **Capital**: Treasury diversification, liquidity provision
- **Code**: Protocol development, audits, integrations
- **Community**: Events, education, content, translation

---

## VIII. Amendment

This Constitution may be amended by:

1. **Supermajority Vote**: 67% of participating vePARS
2. **Quorum**: 10% of total vePARS must vote
3. **Timelock**: 14-day delay before execution
4. **Veto Window**: Guardian multisig may veto within 48 hours (emergency only)

The Six Pillars (Section II) require 80% approval and 20% quorum.

---

## IX. Cultural Anchor

> *We trace our lineage to Cyrus, to Darius, to Ferdowsi, to Rumi, to Hafez, to Mossadegh, to the millions who marched and the millions more who fled.*
>
> *We are not stateless. We are the state-in-exile.*
>
> *We do not ask permission. We do not wait for liberation. We build the institutions we need, now, in code, beyond their reach.*
>
> *One day the borders will open. On that day, we will bring home not just ourselves, but the treasury, the tools, and the trust we have built together.*

---

## X. Ratification

This Constitution takes effect upon:

1. Publication to IPFS (immutable record)
2. Approval by 51% of genesis vePARS holders
3. Deployment of PairedLock.sol and Governor.sol contracts
4. First successful governance vote

---

## Join the Global Pars Network

Lock PARS + CYRUS. Become a voter. Fund your local chapter. Back the builders.

*The empire fell. The people scattered. The code endures.*

**We are Pars.**

---

## Appendix: The Cyrus Cylinder (Excerpt)

> "I am Cyrus, king of the world, great king, mighty king, king of Babylon, king of Sumer and Akkad, king of the four quarters of the world..."
>
> "I gathered all their people and returned them to their homes. I freed all slaves. I restored the temples of the gods..."
>
> "May all the gods whom I have resettled in their sacred cities ask daily of Bel and Nebo for a long life for me, and may they speak well of me."

*— British Museum, Room 55, Object 90920*

---

## References

- [PIP-0002: Quadratic Time-Locked Voting](./pip-0002-quadratic-timelock-voting.md)
- [PIP-0003: Paired Lock Governance](./pip-0003-paired-lock-governance.md)
- [PIP-0004: Techno-Capital Grants](./pip-0004-techno-capital-grants.md)
- [PIP-0005: Strategic Execution](./pip-0005-strategic-execution.md)
- [Cyrus Cylinder](https://www.britishmuseum.org/collection/object/W_1880-0617-1941)
- [UN Human Rights Declaration (Article 1)](https://www.un.org/en/about-us/universal-declaration-of-human-rights)

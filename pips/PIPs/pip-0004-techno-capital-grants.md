---
pip: 4
title: Techno-Capital Grants Framework
tags: [grants, compute, capital, code, community]
description: Four-pillar contribution framework enabling permissionless grants through Compute, Capital, Code, and Community
author: Cyrus Protocol Team (@cyrusdao)
status: Draft
type: Standards Track
category: Community
created: 2026-01-12
discussions-to: https://github.com/cyrusdao/pips/discussions/5
order: 4
tier: community
---

## Abstract

This PIP establishes the **Techno-Capital Grants Framework** for Cyrus Protocol, inspired by the [Morpheus](https://mor.org) contribution model. It defines four contribution pillars - **Compute, Capital, Code, and Community** - enabling anyone to contribute to the protocol and earn PARS rewards. This framework acknowledges the exceptional intelligence and talent of the Persian diaspora, creating pathways to organize collective action, accelerate the OSS flywheel, and democratize access to cutting-edge AI and finance.

## Motivation

### The Persian Diaspora Opportunity

The Iranian diaspora represents **over 8 million people globally** with extraordinary representation in:
- **Technology**: Engineers at Google, Microsoft, Apple, Meta, and countless startups
- **Finance**: Leaders in investment banking, hedge funds, and venture capital
- **Academia**: Professors at MIT, Stanford, Berkeley, Cambridge, Oxford
- **Medicine**: Physicians, researchers, and healthcare innovators
- **Arts & Culture**: Artists, filmmakers, writers preserving Persian heritage

**Yet this talent pool lacks unified economic infrastructure.** Brilliant individuals work in isolation, their collective potential unrealized. Family wealth sits in traditional assets instead of fueling innovation. Knowledge is siloed instead of shared.

### The Vision: Collective Intelligence Infrastructure

Cyrus Protocol aims to be the **economic operating system** for organizing Persian collective intelligence:

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                     CYRUS: ECONOMIC INFRASTRUCTURE FOR COLLECTIVE INTELLIGENCE          │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  GLOBAL PERSIAN DIASPORA                                                                │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │ 🧠 Engineers  │ 💰 Investors  │ 👩‍🔬 Researchers  │ 🎨 Creatives  │ 👥 Community │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                                   │
│                                      ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │                    CYRUS PROTOCOL (Coordination Layer)                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                        │   │
│  │  │ Compute  │  │ Capital  │  │   Code   │  │Community │                        │   │
│  │  │  Grants  │  │  Grants  │  │  Grants  │  │  Grants  │                        │   │
│  │  │   🖥️     │  │   💵     │  │   💻     │  │   🤝     │                        │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘                        │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                                   │
│                                      ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │                         OUTPUTS (Public Goods)                                   │   │
│  │  • Open Source AI Models      • DeFi Infrastructure       • Educational Content │   │
│  │  • Research Papers            • Developer Tools           • Cultural Archives   │   │
│  │  • Privacy Tech               • Financial Inclusion       • Community Networks  │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                                   │
│                                      ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │                         🇮🇷 REBUILD IRAN 🇮🇷                                      │   │
│  │  When the time comes: ready infrastructure, trained talent, accumulated capital │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Why Techno-Capital Framework?

Traditional grants are:
- **Centralized**: Committee decides who deserves funding
- **Subjective**: "Impact" is hard to measure
- **Slow**: Months of bureaucracy before funds arrive
- **One-time**: No ongoing relationship

The Techno-Capital Framework is:
- **Permissionless**: Anyone can contribute and earn
- **Objective**: Measurable contributions (compute time, code commits, capital deployed)
- **Real-time**: Rewards flow continuously
- **Ongoing**: Long-term relationships and compounding returns

## Specification

### Four Contribution Pillars

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                     FOUR PILLARS OF CONTRIBUTION                                        │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐│
│  │     COMPUTE      │  │     CAPITAL      │  │       CODE       │  │    COMMUNITY     ││
│  │        🖥️        │  │        💵        │  │        💻        │  │        🤝        ││
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤│
│  │ • GPU providers  │  │ • Liquidity      │  │ • Core protocol  │  │ • Translators    ││
│  │ • Node operators │  │ • Bonds/POL      │  │ • Smart agents   │  │ • Educators      ││
│  │ • AI inference   │  │ • Treasury LP    │  │ • Frontends      │  │ • Ambassadors    ││
│  │ • Storage hosts  │  │ • Grant matching │  │ • Integrations   │  │ • Event hosts    ││
│  │                  │  │                  │  │ • Audits/tests   │  │ • Content        ││
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤│
│  │ Proof:           │  │ Proof:           │  │ Proof:           │  │ Proof:           ││
│  │ TEE attestation  │  │ LP token receipt │  │ Merged PRs       │  │ Maintainer sig   ││
│  │ Uptime metrics   │  │ Bond receipts    │  │ Deployed code    │  │ Community vote   ││
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤│
│  │ PARS Allocation: │  │ PARS Allocation: │  │ PARS Allocation: │  │ PARS Allocation: ││
│  │      24%         │  │      24%         │  │      24%         │  │      24%         ││
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘│
│                                                                                          │
│  Remaining 4%: Protocol Treasury (emergency, ops)                                       │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### PARS Emission Allocation

| Pillar | Allocation | Annual Budget* | Purpose |
|:-------|:-----------|:---------------|:--------|
| **Compute** | 24% | 240,000 PARS | GPU/AI infrastructure |
| **Capital** | 24% | 240,000 PARS | Liquidity & treasury |
| **Code** | 24% | 240,000 PARS | Development |
| **Community** | 24% | 240,000 PARS | Human coordination |
| **Treasury** | 4% | 40,000 PARS | Emergency/ops |
| **Total** | 100% | 1,000,000 PARS | - |

*Assuming 1M PARS/year emission budget (adjustable by governance)

---

### Pillar 1: Compute Grants 🖥️

#### What Qualifies

| Contribution Type | Description | Proof Mechanism |
|:------------------|:------------|:----------------|
| **GPU Inference** | Running AI models for protocol | TEE attestation + API logs |
| **Node Operation** | Running Cyrus validators/nodes | Uptime metrics + signatures |
| **Storage Hosting** | IPFS/Arweave pinning for protocol data | CID proofs + availability checks |
| **AI Training** | Contributing GPU cycles for model training | Job completion proofs |

#### Proof of Compute

```solidity
interface IComputeProof {
    struct ComputeAttestation {
        bytes32 jobId;          // Unique job identifier
        address provider;       // Compute provider
        bytes32 hardwareHash;   // TEE hardware attestation
        uint256 computeUnits;   // GPU-hours or equivalent
        uint256 timestamp;      // When work completed
        bytes signature;        // Provider signature
    }

    /// @notice Submit proof of compute work
    function submitComputeProof(ComputeAttestation calldata attestation) external;

    /// @notice Get pending rewards for a provider
    function pendingComputeRewards(address provider) external view returns (uint256);
}
```

#### Compute Reward Formula

```
computeReward = (providerComputeUnits / totalComputeUnits) × computeBudget × qualityMultiplier

Where:
- computeUnits = GPU-hours normalized to H100 equivalent
- qualityMultiplier = 0.8 - 1.2 based on uptime and response quality
- computeBudget = 24% of weekly PARS emissions
```

#### GPU Tier Normalization

| GPU Tier | Compute Units/Hour | Example Hardware |
|:---------|:-------------------|:-----------------|
| Tier 1 | 1.0 | H100 80GB |
| Tier 2 | 0.5 | A100 80GB |
| Tier 3 | 0.25 | RTX 4090 |
| Tier 4 | 0.1 | RTX 3090 |

#### Use Cases

1. **AI Inference**: Running open-source LLMs for Persian NLP
2. **Privacy Compute**: ZK proof generation for private transactions
3. **Model Training**: Fine-tuning models on Persian datasets
4. **Protocol Infrastructure**: Validators, oracles, keepers

---

### Pillar 2: Capital Grants 💵

#### What Qualifies

| Contribution Type | Description | Proof Mechanism |
|:------------------|:------------|:----------------|
| **Liquidity Provision** | CYRUS/ETH, PARS/ETH pools | LP token receipt |
| **Bond Purchases** | Protocol-owned liquidity bonds | Bond NFT |
| **Treasury Staking** | Staking in protocol treasury | Stake receipt |
| **Grant Matching** | Matching community grants | Deposit receipt |

#### Proof of Capital

```solidity
interface ICapitalProof {
    /// @notice Register LP position for capital rewards
    function registerLiquidity(
        address pool,
        uint256 lpTokenAmount
    ) external returns (uint256 capitalWeight);

    /// @notice Register bond for capital rewards
    function registerBond(uint256 bondId) external returns (uint256 capitalWeight);

    /// @notice Claim accumulated capital rewards
    function claimCapitalRewards() external returns (uint256);
}
```

#### Capital Reward Formula

```
capitalReward = (userCapitalWeight / totalCapitalWeight) × capitalBudget × durationBonus

Where:
- capitalWeight = USD value of LP/bonds/stakes
- durationBonus = 1.0 + min(lockMonths, 24) × 0.02 (max 1.48x for 24-month lock)
- capitalBudget = 24% of weekly PARS emissions
```

#### Capital Tier Weights

| Capital Type | Weight Multiplier | Rationale |
|:-------------|:------------------|:----------|
| CYRUS/ETH LP | 1.5x | Core liquidity |
| PARS/ETH LP | 1.25x | Emissions liquidity |
| Protocol Bonds | 1.0x | POL building |
| Single-sided stake | 0.75x | Less risk |

---

### Pillar 3: Code Grants 💻

#### What Qualifies

| Contribution Type | Description | Proof Mechanism |
|:------------------|:------------|:----------------|
| **Core Protocol** | Smart contracts, consensus, VM | Merged GitHub PRs |
| **Smart Agents** | AI agents for protocol ops | Deployed + tested agents |
| **Frontend/UX** | Web apps, mobile apps, CLI | Deployed applications |
| **Integrations** | Bridges, oracles, other protocols | Working integrations |
| **Audits/Testing** | Security audits, test suites | Published reports |
| **Documentation** | Technical docs, tutorials | Merged docs PRs |

#### Proof of Code

```solidity
interface ICodeProof {
    struct CodeContribution {
        bytes32 contributionId;    // Unique ID
        address contributor;       // Developer address
        string repoUrl;            // GitHub/GitLab URL
        string commitHash;         // Commit SHA
        uint256 weight;            // Maintainer-assigned weight
        uint256 timestamp;         // Merge timestamp
        bytes maintainerSig;       // Maintainer signature
    }

    /// @notice Register a code contribution
    function registerContribution(CodeContribution calldata contribution) external;

    /// @notice Get contributor's pending rewards
    function pendingCodeRewards(address contributor) external view returns (uint256);
}
```

#### Code Contribution Weights

| Contribution Type | Base Weight | Example |
|:------------------|:------------|:--------|
| Critical Bug Fix | 100 | Security vulnerability patch |
| Major Feature | 75 | New protocol module |
| Minor Feature | 30 | UI improvement |
| Bug Fix | 15 | Non-critical fix |
| Documentation | 10 | Technical docs |
| Test Coverage | 10 | New test suite |

**Maintainer Review**: All contributions require maintainer signature to prevent gaming.

#### Code Reward Formula

```
codeReward = (contributorWeight / totalWeight) × codeBudget × impactMultiplier

Where:
- contributorWeight = sum of all contribution weights in period
- impactMultiplier = 0.5 - 2.0 based on actual usage/adoption
- codeBudget = 24% of weekly PARS emissions
```

#### OSS Flywheel Effect

```
More Contributors → Better Product → More Users → Higher PARS Value
        ↑                                              │
        └──────────────── More PARS Rewards ───────────┘
```

---

### Pillar 4: Community Grants 🤝

#### What Qualifies

| Contribution Type | Description | Proof Mechanism |
|:------------------|:------------|:----------------|
| **Translation** | Docs, UI, content to Persian/other | Completed translations |
| **Education** | Tutorials, workshops, courses | Published content |
| **Ambassador** | Local community building | Event reports + attestations |
| **Content Creation** | Videos, articles, podcasts | Published content |
| **Moderation** | Discord/Telegram community mgmt | Maintainer attestation |
| **Event Hosting** | Meetups, hackathons, conferences | Event documentation |

#### Proof of Community (Human Labor)

```solidity
interface ICommunityProof {
    struct CommunityContribution {
        bytes32 contributionId;    // Unique ID
        address contributor;       // Contributor address
        ContributionType cType;    // Translation, Education, etc.
        string evidenceUrl;        // IPFS link to evidence
        uint256 weight;            // Community-assigned weight
        uint256 endorsements;      // Number of vePARS endorsements
        bytes maintainerSig;       // Maintainer signature
    }

    enum ContributionType {
        Translation,
        Education,
        Ambassador,
        Content,
        Moderation,
        Events
    }

    /// @notice Submit community contribution
    function submitContribution(CommunityContribution calldata contribution) external;

    /// @notice Endorse a contribution (costs vePARS voting power temporarily)
    function endorseContribution(bytes32 contributionId) external;

    /// @notice Claim community rewards
    function claimCommunityRewards() external returns (uint256);
}
```

#### Community Contribution Weights

| Contribution Type | Base Weight | Weight Range | Verification |
|:------------------|:------------|:-------------|:-------------|
| **Translation** | 20 | 10-50 | Word count + quality review |
| **Education** | 50 | 20-200 | Views/engagement metrics |
| **Ambassador** | 30/month | 20-100 | Monthly report + attestations |
| **Content** | 25 | 10-100 | Engagement + quality |
| **Moderation** | 20/week | 15-40 | Activity metrics + reports |
| **Events** | 100 | 50-500 | Attendance + documentation |

#### Community Reward Formula

```
communityReward = (contributorWeight × endorsementBonus) / totalWeight × communityBudget

Where:
- endorsementBonus = 1 + min(endorsements, 100) × 0.005 (max 1.5x)
- communityBudget = 24% of weekly PARS emissions
```

#### Endorsement Mechanism

vePARS holders can "endorse" community contributions:
- Endorsing locks 1% of endorser's vePARS for 1 week
- Prevents spam endorsements
- Creates accountability for quality

---

### Grant Application Process

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           GRANT APPLICATION FLOW                                        │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  1. APPLY                          2. REVIEW                     3. EXECUTE             │
│  ┌──────────────┐                ┌──────────────┐              ┌──────────────┐         │
│  │ Submit Form  │ ────────────▶ │ Maintainer   │ ────────────▶│ Do the Work  │         │
│  │ - Type       │                │ Reviews      │              │ - Submit     │         │
│  │ - Scope      │                │ - Assigns    │              │   proofs     │         │
│  │ - Timeline   │                │   weight     │              │ - Get        │         │
│  │ - Evidence   │                │ - Approves   │              │   verified   │         │
│  └──────────────┘                └──────────────┘              └──────────────┘         │
│                                                                        │                 │
│  4. VERIFY                        5. REWARD                            │                 │
│  ┌──────────────┐                ┌──────────────┐                      │                 │
│  │ Proofs       │ ◀──────────── │ PARS         │ ◀────────────────────┘                 │
│  │ Validated    │                │ Distributed  │                                        │
│  │ On-chain     │                │ Weekly       │                                        │
│  └──────────────┘                └──────────────┘                                        │
│                                                                                          │
│  Timeline: 1-2 weeks from application to first rewards                                  │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Streamlined Application

```solidity
interface IGrantApplication {
    struct Application {
        address applicant;
        Pillar pillar;              // Compute, Capital, Code, Community
        string description;         // What they'll contribute
        uint256 requestedWeight;    // Suggested weight
        string evidenceUrl;         // Link to evidence/plan
    }

    enum Pillar { Compute, Capital, Code, Community }

    /// @notice Submit grant application
    function applyForGrant(Application calldata app) external returns (bytes32 appId);

    /// @notice Maintainer approves with adjusted weight
    function approveGrant(bytes32 appId, uint256 weight) external;

    /// @notice Check application status
    function getApplicationStatus(bytes32 appId) external view returns (Status);
}
```

---

### Master Contract Architecture

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TechnoCapitalGrants is AccessControl {
    using SafeERC20 for IERC20;

    // ═══════════════════════════════════════════════════════════════════════════
    // ROLES
    // ═══════════════════════════════════════════════════════════════════════════

    bytes32 public constant MAINTAINER_ROLE = keccak256("MAINTAINER_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    // ═══════════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════════

    IERC20 public immutable pars;

    enum Pillar { Compute, Capital, Code, Community }

    // Allocation percentages (in basis points, 10000 = 100%)
    mapping(Pillar => uint256) public pillarAllocation;
    uint256 public treasuryAllocation;

    // Weekly emission budget
    uint256 public weeklyBudget;

    // Contributor weights per pillar
    mapping(Pillar => mapping(address => uint256)) public contributorWeight;
    mapping(Pillar => uint256) public totalPillarWeight;

    // Reward tracking
    mapping(Pillar => uint256) public accRewardPerWeight;
    mapping(Pillar => mapping(address => uint256)) public rewardDebt;
    mapping(Pillar => uint256) public lastDistribution;

    // ═══════════════════════════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════════════════════════

    event ContributionRegistered(
        Pillar indexed pillar,
        address indexed contributor,
        uint256 weight,
        string evidenceUrl
    );

    event RewardsClaimed(
        Pillar indexed pillar,
        address indexed contributor,
        uint256 amount
    );

    event WeeklyDistribution(
        uint256 computeAmount,
        uint256 capitalAmount,
        uint256 codeAmount,
        uint256 communityAmount,
        uint256 treasuryAmount
    );

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════════════════

    constructor(address _pars, address _admin, uint256 _weeklyBudget) {
        pars = IERC20(_pars);
        weeklyBudget = _weeklyBudget;

        // Default allocations (24% each + 4% treasury)
        pillarAllocation[Pillar.Compute] = 2400;
        pillarAllocation[Pillar.Capital] = 2400;
        pillarAllocation[Pillar.Code] = 2400;
        pillarAllocation[Pillar.Community] = 2400;
        treasuryAllocation = 400;

        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(MAINTAINER_ROLE, _admin);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTRIBUTION REGISTRATION
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Register contribution with maintainer approval
    function registerContribution(
        Pillar pillar,
        address contributor,
        uint256 weight,
        string calldata evidenceUrl
    ) external onlyRole(MAINTAINER_ROLE) {
        // Update pending rewards before changing weights
        _updateRewards(pillar);

        // Claim any pending rewards for contributor first
        uint256 pending = _pendingRewards(pillar, contributor);
        if (pending > 0) {
            pars.safeTransfer(contributor, pending);
            emit RewardsClaimed(pillar, contributor, pending);
        }

        // Update weights
        totalPillarWeight[pillar] = totalPillarWeight[pillar]
            - contributorWeight[pillar][contributor]
            + weight;
        contributorWeight[pillar][contributor] = weight;
        rewardDebt[pillar][contributor] = weight * accRewardPerWeight[pillar] / 1e18;

        emit ContributionRegistered(pillar, contributor, weight, evidenceUrl);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // REWARDS
    // ═══════════════════════════════════════════════════════════════════════════

    /// @notice Distribute weekly rewards to all pillars
    function distributeWeekly() external {
        require(block.timestamp >= lastDistribution[Pillar.Compute] + 7 days, "Too early");

        uint256 computeAmount = weeklyBudget * pillarAllocation[Pillar.Compute] / 10000;
        uint256 capitalAmount = weeklyBudget * pillarAllocation[Pillar.Capital] / 10000;
        uint256 codeAmount = weeklyBudget * pillarAllocation[Pillar.Code] / 10000;
        uint256 communityAmount = weeklyBudget * pillarAllocation[Pillar.Community] / 10000;
        uint256 treasuryAmount = weeklyBudget * treasuryAllocation / 10000;

        // Update accRewardPerWeight for each pillar
        _distribute(Pillar.Compute, computeAmount);
        _distribute(Pillar.Capital, capitalAmount);
        _distribute(Pillar.Code, codeAmount);
        _distribute(Pillar.Community, communityAmount);

        // Treasury goes to protocol treasury
        // (handled separately)

        emit WeeklyDistribution(
            computeAmount,
            capitalAmount,
            codeAmount,
            communityAmount,
            treasuryAmount
        );
    }

    function _distribute(Pillar pillar, uint256 amount) internal {
        if (totalPillarWeight[pillar] > 0) {
            accRewardPerWeight[pillar] += amount * 1e18 / totalPillarWeight[pillar];
        }
        lastDistribution[pillar] = block.timestamp;
    }

    /// @notice Claim pending rewards for a pillar
    function claimRewards(Pillar pillar) external returns (uint256) {
        _updateRewards(pillar);

        uint256 pending = _pendingRewards(pillar, msg.sender);
        if (pending > 0) {
            rewardDebt[pillar][msg.sender] = contributorWeight[pillar][msg.sender]
                * accRewardPerWeight[pillar] / 1e18;
            pars.safeTransfer(msg.sender, pending);
            emit RewardsClaimed(pillar, msg.sender, pending);
        }

        return pending;
    }

    function _updateRewards(Pillar pillar) internal {
        // Called before any weight change
    }

    function _pendingRewards(Pillar pillar, address contributor) internal view returns (uint256) {
        uint256 weight = contributorWeight[pillar][contributor];
        if (weight == 0) return 0;

        return weight * accRewardPerWeight[pillar] / 1e18 - rewardDebt[pillar][contributor];
    }

    /// @notice View pending rewards
    function pendingRewards(Pillar pillar, address contributor) external view returns (uint256) {
        return _pendingRewards(pillar, contributor);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ADMIN
    // ═══════════════════════════════════════════════════════════════════════════

    function setWeeklyBudget(uint256 _budget) external onlyRole(DEFAULT_ADMIN_ROLE) {
        weeklyBudget = _budget;
    }

    function setAllocation(Pillar pillar, uint256 bps) external onlyRole(DEFAULT_ADMIN_ROLE) {
        pillarAllocation[pillar] = bps;
        // Note: Total should sum to 10000, enforced off-chain
    }
}
```

---

### Special Programs

#### 1. Persian Heritage Digitization

**Goal**: Preserve and digitize Persian cultural heritage using AI

| Program | Description | PARS Budget |
|:--------|:------------|:------------|
| **Farsi NLP** | Train open-source Persian language models | 10% of Code grants |
| **Historical Archives** | Digitize manuscripts, literature, art | 10% of Compute grants |
| **Translation Network** | Persian ↔ English ↔ Arabic translations | 20% of Community grants |

#### 2. Diaspora Developer Bootcamp

**Goal**: Train next generation of Persian crypto developers

| Cohort | Duration | Participants | Grants |
|:-------|:---------|:-------------|:-------|
| Spring 2026 | 12 weeks | 50 | 50,000 PARS pool |
| Fall 2026 | 12 weeks | 100 | 100,000 PARS pool |

**Curriculum**:
1. Solidity fundamentals
2. DeFi protocol design
3. AI/ML integration
4. Privacy tech
5. Cyrus Protocol specifics

#### 3. Rebuild Iran Fund

**Goal**: Accumulate resources for future reconstruction

| Mechanism | Description |
|:----------|:------------|
| **Long-term Treasury** | 10% of treasury allocation locked for 10+ years |
| **Infrastructure Bounties** | Pre-funded bounties for critical infrastructure |
| **Expertise Registry** | Catalog of diaspora expertise for rapid deployment |

---

## Rationale

### Why Four Pillars?

Inspired by Morpheus (mor.org), this model recognizes that building decentralized systems requires:

1. **Compute**: Raw computational power (can't run AI without GPUs)
2. **Capital**: Financial resources (liquidity, development funding)
3. **Code**: Software development (the actual product)
4. **Community**: Human coordination (adoption, governance, culture)

No single pillar is sufficient; all four must work together.

### Why Equal Allocation?

24% each ensures:
- No pillar is neglected
- Balanced ecosystem development
- Fair representation of different contribution types

Can be adjusted by governance if imbalances emerge.

### Why Permissionless + Maintainer Review?

- **Permissionless application**: Anyone can submit
- **Maintainer approval**: Prevents gaming and spam
- **Weight assignment**: Rewards quality over quantity

This hybrid approach balances accessibility with quality control.

### Why Continuous Rewards (Not One-Time Grants)?

- **Aligns incentives**: Continuous contribution = continuous rewards
- **Reduces bureaucracy**: No repeated applications
- **Builds relationships**: Long-term contributors accumulate reputation

## Security Considerations

### Gaming Prevention

1. **Maintainer signatures**: All contributions require maintainer approval
2. **Evidence requirements**: Must provide verifiable proof
3. **Community endorsements**: Peer review for community grants
4. **Weight caps**: Maximum contribution weight per period

### Sybil Resistance

1. **Proof requirements**: Each pillar has specific proof mechanisms
2. **Reputation building**: New contributors start with low weights
3. **vePARS endorsement cost**: Endorsing costs voting power temporarily

### Economic Attacks

**Attack: Fake compute proofs**
- Mitigation: TEE attestation required, random verification

**Attack: Wash trading for capital rewards**
- Mitigation: Minimum lock periods, impermanent loss exposure

**Attack: Low-quality code contributions**
- Mitigation: Maintainer review, usage-based impact multiplier

## Implementation Notes

### Phase 1: Foundation (Month 1-2)

- Deploy TechnoCapitalGrants contract
- Establish maintainer multisig (5-of-9)
- Set up GitHub integration for code contributions
- Launch application portal

### Phase 2: Compute Network (Month 2-4)

- Deploy compute proof oracle
- Onboard initial GPU providers
- Establish TEE attestation flow
- Launch inference API

### Phase 3: Capital Integration (Month 3-4)

- Integrate with existing LP gauges
- Deploy bond tracking
- Set up capital proof oracles

### Phase 4: Community Scaling (Month 4-6)

- Launch endorsement mechanism
- Establish regional ambassador program
- Deploy translation bounty system

## References

- [Morpheus Techno-Capital Machine](https://mor.org)
- [Gitcoin Grants](https://gitcoin.co/grants)
- [Optimism RetroPGF](https://optimism.io/retropgf)
- [Protocol Labs Filecoin Plus](https://filplus.fil.org)
- [OlympusDAO Policy Framework](https://docs.olympusdao.finance)

## Related PIPs

- [PIP-0000: Protocol Architecture](./pip-0000-protocol-architecture.md) - Foundation
- [PIP-0001: Token Economics](./pip-0001-token-economics.md) - PARS emission design
- [PIP-0003: Paired Lock Governance](./pip-0003-paired-lock-governance.md) - vePARS voting

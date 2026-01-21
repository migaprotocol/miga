---
pip: 21
title: Constitutional Model - Separation of Powers On-Chain
tags: [constitution, separation-of-powers, protocol, governance]
description: Defines the constitutional model implementing separation of powers through protocol modules
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/21
order: 21
tier: core
---

## Abstract

This PIP defines PARSDAO's constitutional model: a **separation of powers implemented through protocol modules**. It specifies how the protocol layer (constitution in code) constrains the DAO layer (human governance), creating a "delegated constitutional republic" in web3 terms.

## Core Constitutional Commitments

These are the **civil guarantees** that make institutions, diaspora, and partners take PARSDAO seriously:

### 1. Consent

> Governance derives from opt-in participation and transparent rules.

- No one is governed without choosing to participate
- Rules are public before participation
- Exit is always possible

### 2. Constraint

> Authority is limited by code: bounded parameters, allowlists, timelocks.

- No DAO can exceed its coded limits
- No operator can bypass timelocks
- No council can override the protocol unilaterally

### 3. Transparency

> Public execution and receipt standards are non-optional.

- Every disbursement is anchored on-chain
- Every proposal is publicly visible
- Every outcome is auditable

### 4. Safety

> Private voting and shielded disbursements protect humans in high-threat environments.

- Voting is encrypted (TFHE)
- Disbursements can be shielded
- Participation doesn't expose identity

### 5. Neutrality of the Commons

> The civic OS is anti-capture: it must outlast personalities and factions.

- No individual can control the protocol
- No faction can capture governance
- The system serves principles, not people

### 6. Pluralism

> Any community can form a DTF/SIG/partner program under common rules.

- Multiple DAOs with distinct domains
- Open formation of task forces
- Partner programs under shared standards

## Separation of Powers Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PROTOCOL LAYER                                   │
│                    (Constitution in Code)                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│   │ CharterReg   │  │ ProposalTypes│  │ BoundedParams│                 │
│   │ (text hash)  │  │ (what's legal)│  │ (min/max)    │                 │
│   └──────────────┘  └──────────────┘  └──────────────┘                 │
│                                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│   │ FeeRouter    │  │ ExecutionRtr │  │ Timelocks    │                 │
│   │ (const.splits)│  │ (what can run)│  │ (time check) │                 │
│   └──────────────┘  └──────────────┘  └──────────────┘                 │
│                                                                          │
│   ┌──────────────┐  ┌──────────────┐                                    │
│   │ ReceiptAnchor│  │ EmergencyMod │                                    │
│   │ (audit trail)│  │ (scoped freeze)│                                   │
│   └──────────────┘  └──────────────┘                                    │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                          DAO LAYER                                       │
│                   (Human-Governed Pillars)                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│   │ AMN │ │KHAZ │ │ DAD │ │ SAL │ │FARH │ │ DAN │ │ SAZ │ │ PAY │     │
│   └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘     │
│   ┌─────┐ ┌─────┐                                                       │
│   │WAQF │ │ MIZ │  + Delegated Task Forces (DTFs)                       │
│   └─────┘ └─────┘                                                       │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                         CHECKS LAYER                                     │
│                    (Enforcement & Audit)                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Treasury (KHAZ)     →  Executes within bounds                         │
│   Constraints (DAD)   →  Blocks illegality at protocol level            │
│   Impact (MIZ)        →  Audits and publishes integrity packs           │
│   Security (AMN)      →  Freezes temporarily with expiry + postmortem   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Protocol Layer: Constitution in Code

### CharterRegistry

Anchors the constitutional text on-chain via content hash.

```solidity
contract CharterRegistry {
    bytes32 public charterHash;
    string public charterURI;
    uint256 public version;

    event CharterAmended(bytes32 indexed newHash, uint256 version);

    // Amendments require supermajority + multi-DAO approval
    function amendCharter(
        bytes32 newHash,
        string calldata newURI
    ) external onlyConstitutionalAmendment {
        charterHash = newHash;
        charterURI = newURI;
        version++;
        emit CharterAmended(newHash, version);
    }
}
```

### ProposalTypes

Defines what kinds of proposals are legal and their requirements.

```solidity
contract ProposalTypes {
    enum ProposalCategory {
        OPERATIONAL,      // Standard DAO operations
        PARAMETER_CHANGE, // Bounded parameter adjustments
        GRANT,           // Funding disbursements
        CONSTITUTIONAL,  // Charter amendments
        EMERGENCY        // Time-sensitive actions
    }

    struct ProposalRequirements {
        uint256 quorumBps;
        uint256 thresholdBps;
        uint256 timelockDuration;
        bytes32[] requiredDAOs;
        bool requiresReceiptAnchor;
    }

    mapping(ProposalCategory => ProposalRequirements) public requirements;
}
```

### BoundedParameters

Every adjustable parameter has coded min/max bounds.

```solidity
contract BoundedParameters {
    struct ParameterBounds {
        uint256 minValue;
        uint256 maxValue;
        uint256 currentValue;
        uint256 lastUpdated;
        uint256 cooldownPeriod;
    }

    mapping(bytes32 => ParameterBounds) public parameters;

    function setParameter(
        bytes32 paramId,
        uint256 newValue
    ) external onlyGovernance {
        ParameterBounds storage bounds = parameters[paramId];

        require(newValue >= bounds.minValue, "Below minimum");
        require(newValue <= bounds.maxValue, "Above maximum");
        require(
            block.timestamp >= bounds.lastUpdated + bounds.cooldownPeriod,
            "Cooldown active"
        );

        bounds.currentValue = newValue;
        bounds.lastUpdated = block.timestamp;
    }
}
```

### FeeRouter

Constitutional fee splits enforced by code.

```solidity
contract FeeRouter {
    // Immutable constitutional splits (changeable only via amendment)
    uint256[10] public constitutionalSplits;

    // DAOs cannot change their own allocations
    function distribute(
        address token,
        uint256 amount
    ) external {
        for (uint256 i = 0; i < 10; i++) {
            uint256 share = amount * constitutionalSplits[i] / 10000;
            IERC20(token).safeTransfer(daoVaults[i], share);
        }
        emit FeesDistributed(token, amount);
    }
}
```

### ExecutionRouter

Controls what actions can be executed and by whom.

```solidity
contract ExecutionRouter {
    struct ExecutionPermission {
        bytes32 daoId;
        bytes4 functionSelector;
        address targetContract;
        uint256 maxValue;
        bool requiresTimelock;
        bool requiresReceipt;
    }

    mapping(bytes32 => ExecutionPermission) public permissions;

    function execute(
        bytes32 permissionId,
        bytes calldata callData
    ) external onlyAuthorizedDAO returns (bytes memory) {
        ExecutionPermission storage perm = permissions[permissionId];

        require(msg.sender == daoAddress[perm.daoId], "Unauthorized");

        if (perm.requiresTimelock) {
            require(timelockElapsed(permissionId), "Timelock active");
        }

        (bool success, bytes memory result) = perm.targetContract.call(callData);
        require(success, "Execution failed");

        if (perm.requiresReceipt) {
            receiptAnchor.anchor(permissionId, callData, result);
        }

        return result;
    }
}
```

### Timelocks

Time as a constitutional check.

```solidity
contract ConstitutionalTimelock {
    struct TimelockConfig {
        uint256 operationalDelay;    // 48 hours
        uint256 parameterDelay;      // 7 days
        uint256 constitutionalDelay; // 30 days
        uint256 emergencyDelay;      // 24 hours (with conditions)
    }

    TimelockConfig public config;

    mapping(bytes32 => uint256) public proposalTimestamps;

    function canExecute(
        bytes32 proposalId,
        ProposalCategory category
    ) public view returns (bool) {
        uint256 submitted = proposalTimestamps[proposalId];
        uint256 delay = getDelay(category);
        return block.timestamp >= submitted + delay;
    }
}
```

### ReceiptAnchor

Mandatory audit trail for all executions.

```solidity
contract ReceiptAnchor {
    struct Receipt {
        bytes32 proposalId;
        bytes32 daoId;
        address executor;
        bytes callData;
        bytes result;
        uint256 timestamp;
        bytes32 contentHash;
    }

    mapping(bytes32 => Receipt) public receipts;
    bytes32[] public receiptIds;

    event ReceiptAnchored(
        bytes32 indexed receiptId,
        bytes32 indexed proposalId,
        bytes32 indexed daoId
    );

    function anchor(
        bytes32 proposalId,
        bytes calldata callData,
        bytes calldata result
    ) external onlyExecutionRouter returns (bytes32) {
        bytes32 receiptId = keccak256(abi.encodePacked(
            proposalId,
            block.timestamp,
            callData
        ));

        receipts[receiptId] = Receipt({
            proposalId: proposalId,
            daoId: currentDAO(),
            executor: msg.sender,
            callData: callData,
            result: result,
            timestamp: block.timestamp,
            contentHash: keccak256(abi.encodePacked(callData, result))
        });

        receiptIds.push(receiptId);
        emit ReceiptAnchored(receiptId, proposalId, currentDAO());

        return receiptId;
    }
}
```

### EmergencyModule

Scoped freeze with expiry—not unlimited power.

```solidity
contract EmergencyModule {
    struct EmergencyAction {
        bytes32 scopeId;        // What's frozen
        address initiator;      // Who initiated
        uint256 startTime;      // When started
        uint256 maxDuration;    // Hard expiry
        string reason;          // Public justification
        bool active;
    }

    uint256 public constant MAX_EMERGENCY_DURATION = 7 days;

    mapping(bytes32 => EmergencyAction) public emergencies;

    function declareEmergency(
        bytes32 scopeId,
        string calldata reason
    ) external onlySecurityDAO {
        require(!emergencies[scopeId].active, "Already active");

        emergencies[scopeId] = EmergencyAction({
            scopeId: scopeId,
            initiator: msg.sender,
            startTime: block.timestamp,
            maxDuration: MAX_EMERGENCY_DURATION,
            reason: reason,
            active: true
        });

        emit EmergencyDeclared(scopeId, reason);
    }

    function resolveEmergency(
        bytes32 scopeId,
        bytes32 postmortemHash
    ) external onlySecurityDAO {
        require(emergencies[scopeId].active, "Not active");

        emergencies[scopeId].active = false;
        emit EmergencyResolved(scopeId, postmortemHash);
    }

    // Auto-expire if not resolved
    function isEmergencyActive(bytes32 scopeId) public view returns (bool) {
        EmergencyAction storage e = emergencies[scopeId];
        if (!e.active) return false;
        if (block.timestamp > e.startTime + e.maxDuration) return false;
        return true;
    }
}
```

## DAO Layer: Human-Governed Pillars

DAOs operate **within** the protocol's bounds:

| DAO | Can Do | Cannot Do |
|:----|:-------|:----------|
| **KHAZ** | Allocate funds within budget | Exceed caps, bypass timelock |
| **AMN** | Declare emergency, pay bounties | Freeze indefinitely, no postmortem |
| **DAD** | Propose parameters, interpret charter | Unilateral constitutional change |
| **MIZ** | Audit, publish, flag | Block execution, modify data |
| All DAOs | Propose programs, select operators | Override protocol constraints |

### Delegated Task Forces (DTFs)

DAOs can create task forces with further-delegated authority:

```solidity
contract DTFRegistry {
    struct DTF {
        bytes32 parentDAO;
        string name;
        address[] operators;
        uint256 budgetCap;
        uint256 budgetUsed;
        uint256 expiry;
        bytes32 scopeHash;
    }

    mapping(bytes32 => DTF) public dtfs;

    function createDTF(
        string calldata name,
        address[] calldata operators,
        uint256 budgetCap,
        uint256 duration,
        bytes32 scopeHash
    ) external onlyDAO returns (bytes32) {
        // DTF inherits parent DAO's constraints
        // Cannot exceed parent's authority
    }
}
```

## Checks Layer: Enforcement & Audit

### How Checks Work

1. **Treasury (KHAZ) executes** but only within coded bounds
2. **Constraints (DAD) blocks** proposals that violate protocol rules
3. **Impact (MIZ) audits** and publishes integrity reports
4. **Security (AMN) freezes** temporarily with required postmortems

### Integrity Packs

MIZ publishes quarterly integrity packs:

```solidity
struct IntegrityPack {
    bytes32 periodId;
    uint256 startBlock;
    uint256 endBlock;
    bytes32 receiptMerkleRoot;
    bytes32 treasuryStateHash;
    bytes32[] auditFindingHashes;
    string reportURI;
}
```

## Constitutional Amendment Process

Changing the constitution requires:

1. **Proposal** from DAD (Governance Protocol DAO)
2. **Approval** from KHAZ (Treasury) + 2 additional DAOs
3. **Supermajority** (67%) of total delegated PARS
4. **30-day timelock** (longest delay)
5. **Supreme Council non-veto** (emergency check)

```solidity
function proposeAmendment(
    bytes32 newCharterHash,
    string calldata justification
) external onlyDAD returns (bytes32) {
    // Creates proposal requiring multi-DAO approval
}

function executeAmendment(
    bytes32 proposalId
) external {
    require(hasSupermajority(proposalId), "Need 67%");
    require(hasMultiDAOApproval(proposalId, 3), "Need 3 DAOs");
    require(timelockElapsed(proposalId, 30 days), "Timelock active");
    require(!supremeCouncilVetoed(proposalId), "Vetoed");

    charterRegistry.amendCharter(proposals[proposalId].newCharterHash);
}
```

## Summary: Rule of Law as Routing + Bounds + Time

The constitutional model implements **rule of law** through:

| Mechanism | Function |
|:----------|:---------|
| **Routing** | ExecutionRouter determines what can be called |
| **Bounds** | BoundedParameters enforces min/max |
| **Time** | Timelocks create space for review |
| **Receipts** | ReceiptAnchor ensures accountability |
| **Expiry** | EmergencyModule prevents permanent freezes |

This is a **delegated constitutional republic** in web3 terms—separation of powers implemented as smart contracts.

## References

- [PIP-0001: Constitution](./pip-0001-constitution.md)
- [PIP-0020: Civic OS Thesis](./pip-0020-civic-os-thesis.md)
- [PIP-0009: Supreme Council](./pip-0009-supreme-council.md)

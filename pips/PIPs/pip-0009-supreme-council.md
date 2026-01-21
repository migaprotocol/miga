---
pip: 9
title: Supreme Council
tags: [governance, security, supreme-council, emergency, multisig]
description: Establishes the Supreme Council with emergency powers, limitations, and removal procedures
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Governance
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/9
order: 9
tier: core
---

## Abstract

This PIP establishes the Supreme Council, a security-focused body with limited emergency powers to protect the protocol. The Council can pause operations and cancel malicious proposals but cannot access funds, deanonymize voters, or override legitimate governance decisions.

## Motivation

Decentralized governance requires emergency response capabilities for:

1. **Smart Contract Vulnerabilities**: Zero-day exploits need immediate mitigation
2. **Governance Attacks**: Malicious proposals must be cancellable
3. **Bridge Failures**: Cross-chain operations need circuit breakers
4. **Operational Continuity**: Protocol must survive unexpected events

However, emergency powers must be strictly limited to prevent:

- Centralization of control
- Privacy violations
- Governance capture
- Treasury theft

The Supreme Council provides this balance through enumerated powers with explicit limitations.

## Specification

### Composition

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GUARDIAN COUNCIL STRUCTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   COUNCIL MEMBERS: 7                                                        │
│   TERM LENGTH: 2 years (staggered)                                          │
│   EMERGENCY THRESHOLD: 4-of-7                                               │
│   REMOVAL THRESHOLD: 5-of-7 or 2/3 Security DAO                            │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         GUARDIAN ROLES                               │   │
│   ├─────────────────────────────────────────────────────────────────────┤   │
│   │                                                                      │   │
│   │   SECURITY LEAD         LEGAL LEAD          TECHNICAL LEAD          │   │
│   │   • Incident response   • Compliance        • Smart contract        │   │
│   │   • Audit coordination  • Regulatory        • Infrastructure        │   │
│   │                                                                      │   │
│   │   COMMUNITY LEAD        TREASURY LEAD       PROTOCOL LEAD           │   │
│   │   • Communication       • Financial ops     • Roadmap               │   │
│   │   • Crisis PR           • Rate limits       • Upgrades              │   │
│   │                                                                      │   │
│   │                      ROTATING CHAIR                                  │   │
│   │                      • Meeting coordination                          │   │
│   │                      • Tie-breaking                                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Powers (Enumerated)

The Supreme Council MAY:

```solidity
contract GuardianCouncil {
    // 1. Emergency pause (48-hour maximum)
    function emergencyPause(
        bytes32 componentId,
        string calldata reason
    ) external onlyGuardians(4);

    // 2. Cancel malicious proposals (before execution)
    function cancelProposal(
        bytes32 proposalId,
        string calldata reason
    ) external onlyGuardians(4);

    // 3. Execute approved upgrades via timelock
    function executeUpgrade(
        bytes32 upgradeId
    ) external onlyGuardians(4) afterTimelock(7 days);

    // 4. Coordinate security incident response
    function declareIncident(
        uint8 severity,  // 1-5
        string calldata description
    ) external onlyGuardians(3);

    // 5. Extend pause (requires governance approval within 48h)
    function requestPauseExtension(
        bytes32 componentId,
        uint256 requestedDuration
    ) external onlyGuardians(4);
}
```

### Limitations (Explicit)

The Supreme Council SHALL NOT:

```solidity
// These functions are explicitly FORBIDDEN to Guardians
// Attempting these actions will revert

// 1. Access treasury funds
function withdrawTreasury() external {
    revert("GUARDIAN_FORBIDDEN: Treasury access");
}

// 2. Deanonymize voters
function revealVote(bytes32 ballotId) external {
    revert("GUARDIAN_FORBIDDEN: Vote privacy");
}

// 3. Deanonymize treasury recipients
function revealRecipient(bytes32 disbursementId) external {
    revert("GUARDIAN_FORBIDDEN: Recipient privacy");
}

// 4. Override legitimate governance decisions
function overrideProposal(bytes32 proposalId) external {
    revert("GUARDIAN_FORBIDDEN: Governance override");
}

// 5. Extend emergency powers beyond 48h without vote
function extendPause(bytes32 componentId) external {
    revert("GUARDIAN_FORBIDDEN: Requires governance approval");
}

// 6. Modify Constitution without amendment process
function modifyConstitution() external {
    revert("GUARDIAN_FORBIDDEN: Requires PIP-0008 process");
}
```

### Selection Process

```
INITIAL GUARDIANS (Genesis):
1. Nominated by founding team
2. Ratified by 51% of genesis CYRUS holders
3. Serve staggered terms (1, 1.5, 2, 2, 2, 2, 2 years)

SUBSEQUENT GUARDIANS:
1. Nominations open 60 days before term expiry
2. Security DAO vets candidates (security check)
3. Strategy DAO interviews candidates
4. Full community vote (51% of participating vePARS)
5. 14-day onboarding period
```

### Removal Procedures

```solidity
// Path 1: Security DAO supermajority
function removeGuardianBySecurity(
    address guardian,
    string calldata reason
) external onlySecurityDAO {
    require(securityDAOVote >= 67%, "Requires 67% Security DAO");
    _removeGuardian(guardian, reason);
}

// Path 2: Cross-DAO majority
function removeGuardianByCrossDAO(
    address guardian,
    string calldata reason
) external {
    uint256 approvingDAOs = 0;
    for (uint i = 0; i < 10; i++) {
        if (subDAOApproved[i]) approvingDAOs++;
    }
    require(approvingDAOs >= 6, "Requires 6/10 sub-DAOs");
    _removeGuardian(guardian, reason);
}

// Path 3: Guardian self-removal
function resignGuardian() external onlyGuardian {
    _removeGuardian(msg.sender, "Voluntary resignation");
}
```

### Emergency Response Protocol

```
SEVERITY LEVELS:

Level 1 (Low): Minor issue, no user impact
- Action: Monitor, document, fix in next release
- Guardian threshold: 2-of-7 to acknowledge

Level 2 (Medium): Degraded functionality, no fund risk
- Action: Communicate to users, prioritize fix
- Guardian threshold: 3-of-7 to coordinate

Level 3 (High): Potential fund risk, exploitable vulnerability
- Action: Pause affected components, emergency patch
- Guardian threshold: 4-of-7 to pause

Level 4 (Critical): Active exploitation, funds at risk
- Action: Full protocol pause, incident response
- Guardian threshold: 4-of-7 to pause all

Level 5 (Catastrophic): Protocol integrity compromised
- Action: All systems offline, forensic investigation
- Guardian threshold: 4-of-7 (automatic cross-chain halt)
```

### Communication Requirements

```solidity
// All Guardian actions must be documented
event GuardianAction(
    address indexed guardian,
    bytes32 indexed actionId,
    string actionType,
    string reason,
    uint256 timestamp
);

// Public disclosure within 24 hours
function discloseAction(
    bytes32 actionId,
    string calldata publicSummary
) external onlyGuardians(1);
```

### Compensation

| Role | Annual Compensation (PARS) | Vesting |
|:-----|:---------------------------|:--------|
| Guardian Member | 500,000 | Monthly over 2 years |
| Rotating Chair | +100,000 | Per 6-month rotation |
| Incident Response | +50,000 per Level 3+ | Immediate |

### Term Limits

- Maximum 2 consecutive terms (4 years)
- Must wait 2 years before re-election
- No age or geographic requirements
- Must maintain operational security (no public identity required)

## Rationale

### Why 7 Members?

1. **Odd Number**: Prevents tie votes
2. **Fault Tolerance**: 4-of-7 allows 3 unavailable members
3. **Diversity**: Enough seats for varied expertise
4. **Efficiency**: Small enough for rapid response

### Why 48-Hour Pause Limit?

1. **Prevents Indefinite Centralization**: Forces governance involvement
2. **Adequate Response Time**: Covers weekend/holiday scenarios
3. **Alignment with Timelocks**: Matches standard proposal delays
4. **Community Expectation**: Users know maximum disruption window

### Why Explicit Limitations?

1. **Trust Minimization**: Users know exactly what Guardians cannot do
2. **Legal Clarity**: Reduces liability for Guardian members
3. **Audit Target**: Security audits verify limitations are enforced
4. **Governance Assurance**: Community retains ultimate authority

## Security Considerations

### Key Management

- Guardians use hardware wallets exclusively
- Multi-sig requires physical separation
- Key rotation every 6 months
- Emergency backup keys in geographically distributed cold storage

### Collusion Resistance

- Guardians selected from different geographies
- No more than 2 Guardians from same organization
- Financial interests must be disclosed
- Compensation structured to align long-term

### Operational Security

- Secure communication channels (Signal, encrypted email)
- Regular security training
- Incident response drills quarterly
- Background checks by third party

## Implementation

### Smart Contracts

| Contract | Purpose |
|:---------|:--------|
| `GuardianCouncil.sol` | Multi-sig with enumerated powers |
| `EmergencyPause.sol` | Pausable component registry |
| `IncidentRegistry.sol` | Incident documentation |
| `GuardianElection.sol` | Selection and removal |

### Integration Points

```solidity
// All pausable contracts inherit
abstract contract GuardianPausable {
    address public guardianCouncil;

    modifier whenNotPausedByGuardian() {
        require(!IGuardianCouncil(guardianCouncil).isPaused(address(this)));
        _;
    }
}
```

## References

- [PIP-0001: Constitution](./pip-0001-constitution.md)
- [PIP-0007: Privacy-Preserving Governance](./pip-0007-privacy-preserving-governance.md)
- [PIP-0008: Ten Sub-DAO Governance](./pip-0008-ten-subdao-governance.md)
- [Iranian Council of Guardians (Historical Reference)](https://en.wikipedia.org/wiki/Guardian_Council)
- [Compound Governor Bravo](https://docs.compound.finance/v2/governance/)

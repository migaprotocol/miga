---
pip: 22
title: Privacy & Threat Model - Coercion Resistance as Civic Right
tags: [privacy, security, tfhe, threshold, threat-model]
description: Defines the privacy architecture and threat model for high-threat operation
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Privacy
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/22
order: 22
tier: core
---

## Abstract

This PIP defines PARSDAO's privacy architecture and threat model. Privacy is not optional—it's a **civic right** required for operating in high-threat contexts. The principle:

> **We publish outcomes and receipts, not identities.**

## Why Privacy Is Non-Optional

### The High-Threat Context

PARSDAO operates in environments where participation can be dangerous:

| Threat | Impact | Example |
|:-------|:-------|:--------|
| **State surveillance** | Participants identified and targeted | Voting records used for persecution |
| **Economic coercion** | Voters bribed or pressured | Whales buy votes, employers threaten workers |
| **Social coercion** | Community pressure distorts votes | Public voting creates conformity |
| **Beneficiary exposure** | Aid recipients identified | Humanitarian aid recipients targeted |

### The Coercion Resistance Requirement

To operate credibly in these contexts, PARSDAO must ensure:

1. **Voters** cannot be identified by their votes
2. **Beneficiaries** cannot be identified by disbursements
3. **Operators** cannot be compromised by single-key exposure
4. **The protocol** cannot be used for surveillance

### The Line We Hold

```
PUBLIC:  Outcomes, receipts, totals, rules, audit trails
PRIVATE: Individual votes, beneficiary identities, operator keys
```

This is **transparency where it matters** (accountability) and **privacy where it protects** (safety).

## Privacy Architecture

### Layer 1: Private Voting (TFHE)

Fully Homomorphic Encryption over the Torus enables encrypted computation:

```
┌─────────────────────────────────────────────────────────────────┐
│                    TFHE VOTING FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Voter                    T-Chain                   Outcome     │
│     │                         │                         │        │
│     │  1. Encrypt(vote, pk)   │                         │        │
│     │ ─────────────────────►  │                         │        │
│     │                         │                         │        │
│     │                         │  2. Homomorphic         │        │
│     │                         │     Aggregation         │        │
│     │                         │     Σ Encrypt(vote_i)   │        │
│     │                         │                         │        │
│     │                         │  3. Threshold           │        │
│     │                         │     Decryption          │        │
│     │                         │     (t-of-n validators) │        │
│     │                         │ ─────────────────────►  │        │
│     │                         │                         │        │
│     │                         │               Tally: 67% Yes     │
│     │                         │               (no individual     │
│     │                         │                votes revealed)   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Properties:**
- Individual votes never decrypted
- Only aggregate result revealed
- Threshold decryption prevents single-party reveal
- Verifiable: voters can prove they voted without revealing how

### Layer 2: Threshold Custody (T-Chain)

No single key holder can compromise the system:

```solidity
// Threshold signature scheme (t-of-n)
contract ThresholdCustody {
    uint256 public threshold;  // Minimum signers required
    uint256 public totalKeys;  // Total key holders

    struct PendingAction {
        bytes32 actionHash;
        uint256 approvals;
        mapping(address => bool) hasApproved;
        uint256 deadline;
    }

    mapping(bytes32 => PendingAction) public pending;

    function approve(bytes32 actionId) external onlyKeyHolder {
        PendingAction storage action = pending[actionId];
        require(!action.hasApproved[msg.sender], "Already approved");

        action.hasApproved[msg.sender] = true;
        action.approvals++;

        if (action.approvals >= threshold) {
            execute(actionId);
        }
    }
}
```

**Key Management:**
- No single party holds full decryption key
- Key shares distributed across validators
- Proactive key refresh (periodic re-sharing)
- Byzantine fault tolerant (tolerates f < n/3 malicious)

### Layer 3: Shielded Treasury Rail (Z-Chain)

UTXO-based shielded transactions for beneficiary privacy:

```
┌─────────────────────────────────────────────────────────────────┐
│                  SHIELDED DISBURSEMENT FLOW                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Treasury (KHAZ)                Z-Chain                         │
│         │                           │                            │
│         │  1. Approve disbursement  │                            │
│         │     (public proposal)     │                            │
│         │                           │                            │
│         │  2. Shield funds          │                            │
│         │ ──────────────────────►   │                            │
│         │     (transparent →        │                            │
│         │      shielded)            │                            │
│         │                           │                            │
│         │                           │  3. Shielded transfer      │
│         │                           │     (private amounts,      │
│         │                           │      private recipients)   │
│         │                           │                            │
│         │                           │  4. Receipt anchor         │
│         │                           │     (proves execution      │
│         │                           │      without revealing     │
│         │                           │      beneficiaries)        │
│         │                           │                            │
└─────────────────────────────────────────────────────────────────┘
```

**Properties:**
- Public: proposal approved, total amount, purpose
- Private: individual recipients, individual amounts
- Verifiable: zero-knowledge proof of valid disbursement

### Layer 4: Post-Quantum Communications

For operator/partner communications in highest-threat contexts:

| Protocol | Purpose | Implementation |
|:---------|:--------|:---------------|
| **Kyber** | Key encapsulation | NIST PQC standard |
| **Dilithium** | Digital signatures | NIST PQC standard |
| **SPHINCS+** | Stateless signatures | Backup/recovery |
| **Hybrid** | Classical + PQ | Defense in depth |

```solidity
// Hybrid encryption for future-proofing
struct HybridCiphertext {
    bytes classicalCiphertext;  // X25519 + ChaCha20
    bytes pqCiphertext;         // Kyber-768
    bytes combinedMAC;          // HMAC over both
}
```

## Threat Model

### Adversaries

| Adversary | Capabilities | Motivation |
|:----------|:-------------|:-----------|
| **Nation-state** | Full network surveillance, legal coercion | Suppress diaspora activity |
| **Criminal** | Theft, extortion, kidnapping | Financial gain |
| **Insider** | Access to systems, social engineering | Various |
| **Competitor** | Economic attacks, vote buying | Market advantage |

### Assets to Protect

| Asset | Confidentiality | Integrity | Availability |
|:------|:----------------|:----------|:-------------|
| **Individual votes** | CRITICAL | HIGH | MEDIUM |
| **Beneficiary identities** | CRITICAL | HIGH | MEDIUM |
| **Treasury funds** | HIGH | CRITICAL | HIGH |
| **Operator keys** | CRITICAL | CRITICAL | HIGH |
| **Protocol state** | LOW | CRITICAL | CRITICAL |

### Attack Vectors & Mitigations

#### 1. Vote Deanonymization

**Attack:** Correlate voting times, amounts, or patterns to identify voters.

**Mitigations:**
- Batch voting submissions
- Uniform voting weight (or private weight)
- Decoy transactions
- Time-delayed reveal

#### 2. Treasury Theft

**Attack:** Compromise keys to steal funds.

**Mitigations:**
- Threshold custody (t-of-n)
- Timelocked withdrawals
- Rate-limited disbursements
- Multi-DAO approval for large amounts

#### 3. Beneficiary Exposure

**Attack:** Trace disbursements to identify aid recipients.

**Mitigations:**
- Shielded UTXO rail
- Batched disbursements
- Intermediary pools
- Zero-knowledge proofs of valid disbursement

#### 4. Insider Attack

**Attack:** Malicious operator abuses access.

**Mitigations:**
- Key rotation
- Multi-party computation
- Audit trails (even for private operations)
- Separation of duties

#### 5. Coercion Attack

**Attack:** Force key holder to reveal or sign.

**Mitigations:**
- Threshold signatures
- Duress codes
- Decoy keys
- Distributed geography

## Privacy-Preserving Receipts

We maintain accountability without exposing individuals:

```solidity
struct PrivateReceipt {
    // PUBLIC
    bytes32 proposalId;        // What was approved
    bytes32 daoId;             // Which DAO executed
    uint256 totalAmount;       // Total disbursed
    bytes32 purposeHash;       // Hashed purpose category
    uint256 timestamp;         // When executed

    // PRIVATE (zero-knowledge proven)
    bytes32 recipientSetCommitment;  // Commitment to recipient set
    bytes zkProof;                    // Proof of valid disbursement

    // VERIFIABLE
    // - Total matches proposal
    // - Recipients are in approved category
    // - Amounts are within bounds
    // - No double-disbursement
}
```

### What Can Be Proven

| Claim | Proof Type | Reveals |
|:------|:-----------|:--------|
| "Funds went to healthcare" | Category membership | Nothing about individuals |
| "Total disbursed = $X" | Amount proof | Only the total |
| "All recipients verified" | Set membership | Nothing about who |
| "No fraud occurred" | Integrity proof | Nothing about details |

## Implementation: Multi-Chain Privacy Stack

| Chain | Function | Technology |
|:------|:---------|:-----------|
| **C-Chain** | Public governance, receipts | EVM, transparent |
| **T-Chain** | Private voting, threshold ops | TFHE, threshold crypto |
| **Z-Chain** | Shielded treasury | UTXO, ZK proofs |
| **Q-Chain** | Post-quantum comms | Kyber, Dilithium |

### Cross-Chain Privacy

```
┌─────────────────────────────────────────────────────────────────┐
│                   CROSS-CHAIN PRIVACY FLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   C-Chain          T-Chain          Z-Chain          Q-Chain    │
│      │                │                │                │        │
│   Proposal ──────► Private ─────► Shielded ─────► Secure        │
│   Approved         Voting          Treasury        Comms         │
│      │                │                │                │        │
│   Receipt ◄─────── Tally ◄──────── ZK Proof ◄───── PQ Signed   │
│   Anchored         (aggregate)     (valid exec)    (verified)   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Operational Security Requirements

### For Validators

1. **Key custody**: Hardware security modules (HSMs)
2. **Geographic distribution**: No single jurisdiction
3. **Communication**: PQ-encrypted channels
4. **Rotation**: Annual key refresh minimum

### For Operators

1. **Device security**: Hardened endpoints
2. **Access control**: MFA + hardware keys
3. **Training**: Coercion resistance procedures
4. **Compartmentalization**: Need-to-know basis

### For Users

1. **Wallet security**: Hardware wallets recommended
2. **Privacy hygiene**: Tor/VPN for sensitive operations
3. **Key backup**: Secure, distributed backup
4. **Awareness**: Understand what's public vs private

## Audit & Compliance

### What We Can Prove to Auditors

- Total funds disbursed
- Category-level breakdowns
- Execution matches proposals
- No unauthorized spending
- Rate limits respected

### What We Cannot Reveal

- Individual recipient identities
- Individual vote choices
- Specific beneficiary amounts
- Operator key material

### Regulatory Engagement

We engage proactively with regulators to:
1. Explain the privacy architecture
2. Demonstrate compliance capabilities
3. Provide aggregate reporting
4. Support legitimate investigations (within constitutional bounds)

## Conclusion

Privacy in PARSDAO is not a feature—it's a **constitutional requirement** for operating credibly in high-threat environments.

We publish outcomes and receipts, not identities.

This enables:
- Diaspora participation without fear
- Humanitarian aid without exposure
- Democratic governance without coercion
- Accountability without surveillance

## References

- [PIP-0020: Civic OS Thesis](./pip-0020-civic-os-thesis.md)
- [PIP-0007: Privacy-Preserving Governance](./pip-0007-privacy-preserving-governance.md)
- [TFHE Library](https://github.com/zama-ai/tfhe-rs)
- [Zcash Protocol](https://z.cash/technology/)

---
pip: 7
title: Privacy-Preserving Multi-Chain Governance
tags: [privacy, fhe, zk, voting, treasury, multi-chain]
description: Establishes the cryptographic privacy architecture using FHE voting on T-Chain and ZK-UTXO treasury on Z-Chain
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Core
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/7
order: 7
tier: core
---

## Abstract

This PIP introduces a privacy-preserving governance architecture that separates public accountability from individual privacy. By leveraging Lux Network's multi-chain infrastructure, PARSDAO achieves private voting through Fully Homomorphic Encryption (FHE) on T-Chain and confidential treasury disbursements through Zero-Knowledge UTXOs on Z-Chain.

## Motivation

Current DAO governance systems suffer from a fundamental tension:

1. **Public Voting Risks**: Visible votes enable vote-buying, coercion, and social pressure
2. **Treasury Transparency Concerns**: Public disbursements expose recipient identities, creating privacy and security risks
3. **Accountability Requirements**: Communities need verifiable outcomes and treasury oversight

PARSDAO resolves this by separating concerns across specialized chains:

- **Public Chains (Base/C-Chain)**: Proposal lifecycle, outcomes, aggregate balances
- **Privacy Chains (T-Chain/Z-Chain)**: Individual votes, disbursement recipients

## Specification

### Multi-Chain Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PARSDAO MULTI-CHAIN PRIVACY ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌────────────────────┐          ┌────────────────────┐                   │
│   │   BASE (8453)      │◄────────►│   LUX C-CHAIN      │                   │
│   │   Public Proposals │  Bridge  │   (96369)          │                   │
│   │   Outcome Records  │          │   CYRUS + PARS     │                   │
│   │   TeleportVault    │          │   Token Operations │                   │
│   └─────────┬──────────┘          └────────────────────┘                   │
│             │                                                               │
│             │ Proposal Bridge                                               │
│             ▼                                                               │
│   ┌────────────────────┐          ┌────────────────────┐                   │
│   │   LUX T-CHAIN      │          │   LUX Z-CHAIN      │                   │
│   │   (96370)          │          │   (96371)          │                   │
│   │                    │          │                    │                   │
│   │   FHE Voting       │          │   ZK-UTXO Treasury │                   │
│   │   • Encrypted      │          │   • Shielded       │                   │
│   │     ballots        │          │     deposits       │                   │
│   │   • Homomorphic    │          │   • Private        │                   │
│   │     tally          │          │     disbursements  │                   │
│   │   • Threshold      │          │   • View keys for  │                   │
│   │     decryption     │          │     auditors       │                   │
│   └────────────────────┘          └────────────────────┘                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Chain Specifications

| Chain | ID | Purpose | Privacy Model |
|:------|:---|:--------|:--------------|
| Base | 8453 | Public proposals, execution | Transparent |
| Lux C-Chain | 96369 | Token operations, delegation | Transparent |
| Lux T-Chain | 96370 | FHE-encrypted voting | Encrypted ballots |
| Lux Z-Chain | 96371 | Shielded treasury | ZK-UTXO |

### T-Chain: FHE Voting Protocol

#### Key Generation Ceremony

```
1. Distributed Key Generation (DKG) produces:
   - FHE Public Key: pk_fhe (published)
   - Threshold Secret Shares: {sk_1, ..., sk_n} (distributed to 9 committee members)

2. Security Parameters:
   - Threshold: 5-of-9 required for decryption
   - Key rotation: Annual ceremony
```

#### Voting Flow

```solidity
// 1. Proposal Registration (from Base chain)
function registerProposal(
    bytes32 proposalId,
    uint256 sourceChainId,
    uint256 startBlock,
    uint256 endBlock,
    bytes32 snapshotRoot
) external onlyRole(BRIDGE_ROLE);

// 2. Encrypted Ballot Casting
function castEncryptedBallot(
    bytes32 proposalId,
    bytes32 voterCommitment,  // H(address || snapshotRoot)
    bytes calldata encryptedChoice,  // Enc_pk(vote ∈ {0,1,2})
    bytes calldata eligibilityProof,  // Merkle proof of CYRUS balance
    bytes32 nonce  // Prevents replay
) external;

// 3. Homomorphic Tally (computed by committee)
// C_total = Σ c_i (addition under encryption)

// 4. Threshold Decryption (5-of-9 signers)
function revealTally(
    bytes32 proposalId,
    uint256 forVotes,
    uint256 againstVotes,
    uint256 abstainVotes,
    bytes[] calldata decryptionShares
) external onlyRole(THRESHOLD_ROLE);
```

#### Security Properties

1. **Individual Privacy**: No single party can decrypt individual votes
2. **Tally Integrity**: Homomorphic computation is verifiable
3. **Eligibility Verification**: Merkle proofs validate voting rights without revealing identity
4. **Double-Vote Prevention**: Nullifier system prevents duplicate voting

### Z-Chain: ZK-UTXO Treasury

#### UTXO Model

```
Deposit Flow:
  commitment = H(value || blinding_factor)
  → Commitment added to Merkle tree
  → Aggregate balance increases (public)

Withdrawal Flow:
  nullifier = H(commitment || spending_key)
  zkProof = Prove(
    "I know a commitment in the tree",
    "I know the spending key for this commitment",
    "The nullifier is correctly derived",
    "Output value ≤ input value"
  )
  → Nullifier recorded (prevents double-spend)
  → New commitment(s) created
  → Aggregate balance decreases (public)
```

#### Authorization Flow

```solidity
// 1. Governance creates spending authorization
function createAuthorization(
    bytes32 authorizationId,
    bytes32 programId,  // e.g., SECURITY_DAO
    uint256 cap,  // Maximum spend amount
    uint256 expiry,
    bytes32[] calldata categoryTags,  // e.g., [SALARIES, GRANTS]
    address[] calldata operators,
    bytes calldata governanceAttestation  // Signed by threshold committee
) external onlyRole(AUTHORIZATION_ROLE);

// 2. Operator executes shielded spend
function executeShieldedSpend(
    bytes32 authorizationId,
    bytes calldata zkProof,
    bytes32[] calldata newCommitments,
    bytes32 nullifier,
    bytes calldata encryptedMemo
) external onlyRole(OPERATOR_ROLE);
```

#### View Key System

```solidity
// View keys enable selective transparency
function grantViewKey(
    address auditor,
    bytes32 encryptedViewKey,
    string calldata scope  // e.g., "security-dao", "all-treasury"
) external onlyRole(VIEW_KEY_ROLE);

// Auditors can decrypt transaction details
// but cannot spend funds
```

### Cross-Chain Bridge (TeleportVault)

The TeleportVault enables secure asset movement using MPC threshold signatures:

```solidity
struct BridgeRequest {
    bytes32 requestId;
    address token;
    uint256 amount;
    uint256 targetChainId;
    bytes32 recipient;  // Can be address or shielded commitment
}

// Rate limits prevent exploitation
uint256 public maxPerTransaction = 500_000 ether;
uint256 public maxPerDay = 2_000_000 ether;
uint256 public cooldownMinutes = 60;
```

### Privacy Guarantees

| Data Type | Visibility | Mechanism |
|:----------|:-----------|:----------|
| Individual votes | Private | FHE encryption |
| Vote totals | Public | Threshold decryption |
| Treasury balance | Public | Aggregate commitment sum |
| Disbursement amounts | Private | ZK proofs |
| Recipient identities | Private | Shielded addresses |
| Transaction validity | Public | ZK verification |

## Rationale

### Why FHE for Voting?

1. **Strongest Privacy**: Individual votes remain encrypted even during computation
2. **Verifiable Tally**: Results can be verified without revealing inputs
3. **No Trusted Setup**: Unlike some ZK schemes, FHE doesn't require ceremony per vote
4. **Threshold Control**: 5-of-9 decryption prevents single points of failure

### Why ZK-UTXOs for Treasury?

1. **Proven Security**: Zcash-style model battle-tested since 2016
2. **Selective Disclosure**: View keys enable auditor access without public exposure
3. **Efficient Verification**: Groth16/PLONK proofs are fast to verify on-chain
4. **Composable**: Can integrate with DeFi while maintaining privacy

### Why Separate Chains?

1. **Optimized Execution**: T-Chain tuned for FHE operations, Z-Chain for ZK proofs
2. **Isolation**: Security breach on one chain doesn't compromise others
3. **Scalability**: Privacy operations don't congest token transfers
4. **Regulatory Flexibility**: Different jurisdictions may require different transparency

## Security Considerations

### Threat Model

| Threat | Mitigation |
|:-------|:-----------|
| Vote deanonymization | FHE + nullifiers |
| Vote buying | Private ballots until tally reveal |
| Threshold collusion | 5-of-9 with diverse committee |
| Bridge exploit | MPC signatures + rate limits |
| ZK soundness failure | Audited circuits + formal verification |

### Operational Security

1. **Key Ceremonies**: Geographically distributed, air-gapped generation
2. **Committee Rotation**: Annual re-election of threshold signers
3. **Emergency Pause**: Guardian can halt operations for 48 hours
4. **Audit Trail**: All actions logged to immutable anchor chain

## Implementation

### Contract Addresses (Planned)

| Contract | Chain | Purpose |
|:---------|:------|:--------|
| `PrivateVotingTFHE` | T-Chain (96370) | FHE voting |
| `ShieldedVaultZK` | Z-Chain (96371) | Treasury vault |
| `TeleportVault` | Base (8453) | MPC bridge |
| `ReceiptAnchor` | Base (8453) | Cross-chain attestations |
| `CrossChainBridge` | All | Bridge coordinator |

### Dependencies

- Lux Network (multi-chain infrastructure)
- TFHE-rs (FHE library)
- Bellman/Halo2 (ZK proof systems)
- MPC libraries from ~/work/lux/threshold

## References

- [Lux Network Documentation](https://docs.lux.network)
- [TFHE: Fully Homomorphic Encryption](https://tfhe.github.io/tfhe/)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf)
- [PIP-0008: Ten Sub-DAO Governance](./pip-0008-ten-subdao-governance.md)
- [PIP-0009: Supreme Council](./pip-0009-supreme-council.md)

---
pip: 23
title: Partner & ESG Framework
tags: [partnership, esg, reporting, institutional, compliance]
description: Framework for institutional partners, ESG reporting, and external engagement
author: PARSDAO Foundation (@parsdao)
status: Draft
type: Standards Track
category: Operations
created: 2026-01-16
discussions-to: https://github.com/cyrusdao/pips/discussions/23
order: 23
tier: core
---

## Abstract

This PIP defines PARSDAO's framework for engaging institutional partners, foundations, and ESG-conscious investors. It specifies the reporting standards, compliance requirements, and value propositions that make PARSDAO credible to traditional institutions.

## Partner Value Proposition

### What Partners/Donors Get

| Benefit | Implementation | Traditional Equivalent |
|:--------|:---------------|:-----------------------|
| **Auditable receipts** | ReceiptAnchor on-chain | Certified financial statements |
| **Constrained execution** | Bounded parameters, timelocks | Board oversight, bylaws |
| **Privacy for beneficiaries** | Shielded disbursement | Beneficiary protection policies |
| **ESG-grade reporting** | Impact DAO quarterly packs | Sustainability reports |
| **Real-time visibility** | Public dashboards | Quarterly board reports |

### What Partners Join

```
┌─────────────────────────────────────────────────────────────────┐
│                  PARSDAO PARTNER ECOSYSTEM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────┐                                           │
│   │  Global Civic   │  ← Unified governance (PARS token)        │
│   │    Network      │                                           │
│   └────────┬────────┘                                           │
│            │                                                     │
│   ┌────────┴────────┐                                           │
│   │   Accountable   │  ← Receipt anchoring, audit trails        │
│   │    Treasury     │                                           │
│   └────────┬────────┘                                           │
│            │                                                     │
│   ┌────────┴────────┐                                           │
│   │    Program      │  ← 10 DAOs with specialized domains       │
│   │   Marketplace   │                                           │
│   └────────┬────────┘                                           │
│            │                                                     │
│   ┌────────┴────────┐                                           │
│   │  Safe Governance│  ← Private voting, shielded disbursement  │
│   │     System      │                                           │
│   └─────────────────┘                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Partner Categories

### Tier 1: Strategic Partners

Major foundations, institutional investors, government agencies.

| Requirement | Benefit |
|:------------|:--------|
| Due diligence completed | Board observer rights |
| $1M+ commitment | Custom reporting |
| Multi-year engagement | Governance consultation |
| Public endorsement | Co-branding opportunities |

### Tier 2: Program Partners

NGOs, universities, healthcare systems, cultural institutions.

| Requirement | Benefit |
|:------------|:--------|
| Aligned mission | Program co-development |
| Operational capacity | DTF funding eligibility |
| Reporting commitment | Implementation support |
| Impact measurement | Shared infrastructure |

### Tier 3: Technology Partners

Protocol integrations, infrastructure providers, audit firms.

| Requirement | Benefit |
|:------------|:--------|
| Technical capability | Integration grants |
| Security standards | Co-marketing |
| Open source commitment | Protocol access |
| Audit readiness | Preferred vendor status |

### Tier 4: Community Partners

Diaspora organizations, local chapters, volunteer networks.

| Requirement | Benefit |
|:------------|:--------|
| Community presence | Consular DAO (PAY) support |
| Volunteer capacity | Micro-grants |
| Local knowledge | Event co-sponsorship |
| Cultural alignment | Network membership |

## ESG Reporting Framework

### Environmental

| Metric | Measurement | Target |
|:-------|:------------|:-------|
| **Carbon footprint** | CO2e per transaction | Net zero by 2028 |
| **Energy source** | % renewable for infrastructure | 100% renewable |
| **E-waste** | Hardware lifecycle management | Certified recycling |

**Implementation:**
- Proof-of-stake (no mining)
- Carbon offset purchases via WAQF
- Green hosting requirements for node operators

### Social

| Metric | Measurement | Target |
|:-------|:------------|:-------|
| **Beneficiary reach** | Unique individuals served | 100,000 by 2028 |
| **Geographic diversity** | Countries with active programs | 40+ countries |
| **Inclusion** | % underrepresented in governance | Tracked, improving |
| **Safety incidents** | Beneficiary exposure events | Zero tolerance |

**Implementation:**
- Impact DAO (MIZ) tracks outcomes
- Quarterly beneficiary surveys (privacy-preserving)
- Whistleblower channel for safety concerns

### Governance

| Metric | Measurement | Target |
|:-------|:------------|:-------|
| **Participation rate** | % of tokens voting | >30% |
| **Proposal diversity** | Unique proposers per quarter | Growing |
| **Execution accuracy** | Proposals executed as approved | 100% |
| **Audit findings** | Critical findings open | Zero |

**Implementation:**
- On-chain governance metrics
- MIZ quarterly audits
- Public governance dashboard

## Reporting Standards

### Quarterly Impact Pack

Published by MIZ (Impact DAO) every quarter:

```json
{
  "period": "Q1 2027",
  "summary": {
    "totalDisbursed": "$4,250,000",
    "beneficiariesServed": 12500,
    "countriesReached": 28,
    "programsActive": 47
  },
  "byDAO": {
    "SAL": {
      "disbursed": "$1,200,000",
      "programs": ["Medical supplies", "Clinic operations"],
      "beneficiaries": 5000,
      "receiptCount": 234
    },
    "FARH": {
      "disbursed": "$450,000",
      "programs": ["Artist grants", "Heritage digitization"],
      "beneficiaries": 120,
      "receiptCount": 45
    }
  },
  "receipts": {
    "merkleRoot": "0x...",
    "verificationURI": "ipfs://..."
  },
  "audits": {
    "financialAudit": "Clean",
    "operationalAudit": "2 minor findings (resolved)",
    "securityAudit": "No critical findings"
  },
  "esg": {
    "carbonFootprint": "12.5 tCO2e (offset)",
    "renewableEnergy": "100%",
    "diversityMetrics": "Published separately"
  }
}
```

### Annual Report

Comprehensive annual publication including:

1. **Financial statements** (audited)
2. **Program outcomes** (by DAO)
3. **Governance summary** (proposals, votes, participation)
4. **Security report** (incidents, responses, improvements)
5. **ESG metrics** (full breakdown)
6. **Partner acknowledgments**
7. **Forward-looking statements** (with appropriate disclaimers)

### Real-Time Dashboard

Public dashboard showing:
- Treasury balances (by DAO)
- Recent disbursements (with receipts)
- Active proposals
- Governance metrics
- Program milestones

## Compliance Framework

### Regulatory Engagement

| Jurisdiction | Status | Approach |
|:-------------|:-------|:---------|
| **Switzerland** | Primary registration | Foundation structure |
| **UAE** | Secondary presence | ADGM or DIFC entity |
| **US** | Careful engagement | Legal opinion, no securities |
| **EU** | Monitoring | MiCA compliance path |

### AML/KYC Approach

```
┌─────────────────────────────────────────────────────────────────┐
│              COMPLIANCE TIERS                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Tier 0: Public Participation                                  │
│   - Token holders, voters                                       │
│   - No KYC required                                             │
│   - Standard blockchain traceability                            │
│                                                                  │
│   Tier 1: Grant Recipients (< $10,000)                          │
│   - Basic verification                                          │
│   - Purpose attestation                                         │
│   - Receipt anchoring                                           │
│                                                                  │
│   Tier 2: Program Partners (> $10,000)                          │
│   - Enhanced due diligence                                      │
│   - Organization verification                                   │
│   - Ongoing monitoring                                          │
│                                                                  │
│   Tier 3: Strategic Partners (> $100,000)                       │
│   - Full institutional due diligence                            │
│   - Board/governance verification                               │
│   - Audited financials required                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Sanctions Compliance

- OFAC screening for USD-denominated operations
- EU sanctions list screening
- UN sanctions list screening
- Automated screening for large disbursements
- Manual review for flagged transactions

### Tax Reporting

- Foundation tax filings (Switzerland)
- 1099 equivalent for US-based grant recipients
- Partner-specific reporting upon request
- Transfer pricing documentation for multi-entity operations

## Partner Onboarding Process

### Step 1: Initial Engagement

1. Partner submits interest form
2. PAY (Consular DAO) assigns liaison
3. Initial call to assess alignment
4. NDA if discussing sensitive details

### Step 2: Due Diligence

1. Partner provides organizational documentation
2. PARSDAO conducts background verification
3. Technical/operational assessment
4. Mutual agreement on partnership tier

### Step 3: Agreement

1. Partnership agreement drafted
2. Legal review (both parties)
3. Governance approval (if required)
4. Public announcement (if appropriate)

### Step 4: Integration

1. Technical integration (if applicable)
2. Reporting setup
3. Communication channels established
4. Kick-off meeting

### Step 5: Ongoing

1. Quarterly check-ins
2. Annual review
3. Continuous improvement
4. Renewal/expansion discussions

## Partner Rights & Obligations

### Partner Rights

| Right | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|:------|:-------|:-------|:-------|:-------|
| Board observer | ✓ | - | - | - |
| Custom reporting | ✓ | ✓ | - | - |
| DTF funding eligibility | ✓ | ✓ | ✓ | - |
| Governance consultation | ✓ | ✓ | - | - |
| Co-branding | ✓ | ✓ | ✓ | ✓ |
| Network membership | ✓ | ✓ | ✓ | ✓ |

### Partner Obligations

| Obligation | All Partners |
|:-----------|:-------------|
| Mission alignment | Required |
| Ethical conduct | Required |
| Reporting compliance | As specified |
| Confidentiality | Where applicable |
| Public endorsement | Optional |

## Institutional Credibility Package

For partners requiring traditional institutional validation:

### Legal Structure

- Swiss foundation (Stiftung)
- Registered charitable purpose
- Independent board
- Annual audit requirement

### Governance Documentation

- Constitution (hash-anchored)
- Governance charter
- Conflict of interest policy
- Whistleblower policy

### Financial Documentation

- Audited financial statements
- Treasury policy
- Investment policy
- Reserve requirements

### Operational Documentation

- Program policies (per DAO)
- Disbursement procedures
- Monitoring & evaluation framework
- Risk management framework

## Conclusion

PARSDAO's partner framework enables engagement with traditional institutions while maintaining crypto-native principles. We offer:

- **Accountability** without surveillance
- **Transparency** without exposure
- **Compliance** without capture
- **Impact** with measurement

This makes PARSDAO credible to foundations, governments, and ESG investors who need institutional-grade operations with the efficiency and transparency of blockchain.

## References

- [PIP-0020: Civic OS Thesis](./pip-0020-civic-os-thesis.md)
- [PIP-0012: MIZ Impact DAO](./pip-0012-miz-impact-dao.md)
- [GRI Standards](https://www.globalreporting.org/)
- [SASB Standards](https://www.sasb.org/)

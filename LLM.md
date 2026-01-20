# MIGA - Civic Operating System for the Persian Diaspora

## Overview

MIGA (Make Iran Great Again) is an experimental Civic Operating System for rebuilding a nation and building community. Rooted in the Persian heritage of Cyrus the Great's pluralism and human rights principles, MIGA provides coordination infrastructure for the 8+ million strong Persian diaspora across 85+ countries.

**Core Vision**: From NGO to nation-scale. Building in code what tyrants cannot burn.

**Founding Principle**: The Cyrus Cylinder (539 BCE) - the first declaration of human rights.

## Sites
- **miga.us.org** - Foundation/DAO site (React/Vite) - Historical narrative, governance, community
- **migaprotocol.xyz** - Token/Protocol site (React/Vite + Solana wallet) - Token purchase, bridging

## Architecture

### Multi-Chain Token (7 Blockchains)

| Chain | Standard | Bridge | Purpose |
|-------|----------|--------|---------|
| **Solana** | SPL Token | Native | Primary chain, bonding curve |
| **Ethereum** | ERC-20 | Wormhole | DeFi integrations, DAO contracts |
| **Base** | ERC-20 | Wormhole | Low-cost transactions |
| **Arbitrum** | ERC-20 | Wormhole | L2 scaling |
| **Polygon** | ERC-20 | Wormhole | Mass adoption |
| **Lux** | ERC-20 | Lux Bridge | Privacy features |
| **Bitcoin** | Runes | Zeus Network | Store of value (planned) |

### Tokenomics
- **Total Supply**: 1,000,000,000 (1 billion)
- **10% (100M)** → Meteora DLMM LP
- **40% (400M)** → One-sided bonding curve
- **50% (500M)** → DAO Treasury (community-governed)

No VCs. No presales. No team allocation.

### Governance Token Architecture
- **MIGA** - Collateral token (bridged across chains)
- **PARS** - Emission token (flows to builders)
- **sPARS** - Rebasing rewards
- **vePARS** - Vote-escrow governance power

**Formula**: `vePARS = min(PARS, MIGA) × sqrt(lock_duration / max_duration)`

## The Ten DAOs

Specialized pillars with Persian heritage names, operating on EVM:

| # | Symbol | Persian | Domain | Strategy |
|---|--------|---------|--------|----------|
| 1 | AMN | امنیّت (Amniyat) | Security | Stablecoin-only, audits |
| 2 | KHAZ | خزانه (Khazaneh) | Treasury | Diversified reserves (25%) |
| 3 | DAD | داد (Dād) | Governance | Minimal, tooling |
| 4 | SAL | سلامت (Salāmat) | Health | Stablecoin + yield |
| 5 | FARH | فرهنگ (Farhang) | Culture | Creator grants |
| 6 | DAN | دانش (Dānesh) | Research | Research grants |
| 7 | SAZ | سازندگی (Sāzandegi) | Infrastructure | Procurement |
| 8 | PAY | پیام (Payām) | Consular | Coordination |
| 9 | WAQF | وقف (Waqf) | Endowment | Long-horizon venture |
| 10 | MIZ | میزان (Mizān) | Integrity | Impact audits |

## Directory Structure
```
/miga/
├── foundation/        # miga.us.org - DAO/historical site
│   └── src/
│       ├── pages/     # Home, About, Board, Programs, Governance, MIPs, Transparency, Contact, Community
│       ├── components/# Header, Footer
│       └── data/      # mips.ts (25 MIP proposals)
├── protocol/          # migaprotocol.xyz - Token page + wallet
├── token/             # Solana Anchor program (SPL token)
├── contracts/         # Contracts SDK (@miga/contracts)
├── dao/               # EVM DAO contracts (10 DAOs)
│   └── contracts/     # DaoVault, MigaToken, ParsToken, VePars
├── bridge/            # Bridge SDK (@miga/bridge)
│   └── src/           # Wormhole + Lux Bridge integration
├── whitepaper/        # LaTeX whitepaper
│   └── main.pdf       # Built PDF (~670KB)
└── LLM.md             # This file

# Documentation uses shared Hanzo docs
# ~/work/hanzo/docs - Documentation for all sites
```

## Tech Stack

### Frontend
- React 18, Vite, TypeScript, Tailwind CSS
- @solana/wallet-adapter for Solana wallets
- ethers.js / viem for EVM wallets

### Blockchain
- **Solana**: Anchor 0.30+, SPL Token, Meteora DLMM
- **EVM**: Solidity 0.8.20, OpenZeppelin, ERC-4626 vaults
- **Bridges**: Wormhole SDK, Lux Bridge SDK

### Governance
- Realms (Solana)
- Custom vePARS on EVM

## Development

```bash
# Foundation site (historical/DAO)
cd foundation && pnpm install && pnpm dev  # localhost:5173

# Protocol site (token/wallet)
cd protocol && pnpm install && pnpm dev    # localhost:8080

# Solana token program
cd token && anchor build && anchor test

# EVM DAO contracts
cd dao && forge build && forge test

# Bridge SDK
cd bridge && pnpm build
```

## Key Files

### Solana Token
- `token/programs/miga/src/lib.rs` - Anchor program (modern standards)
- `token/tests/miga.ts` - Comprehensive test suite

### EVM DAO
- `dao/contracts/DaoVault.sol` - ERC-4626 vault per DAO
- `dao/contracts/MigaToken.sol` - Bridged ERC-20 MIGA
- `dao/contracts/ParsToken.sol` - PARS emission token
- `dao/contracts/VePars.sol` - Vote-escrow governance

### Bridge
- `bridge/src/client.ts` - MigaBridge client
- `bridge/src/wormhole.ts` - Wormhole SDK wrapper
- `bridge/src/chains.ts` - 7-chain configuration

### Foundation Pages
- `Home.tsx` - Hero, historical timeline, 10 DAOs, tokenomics, roadmap
- `About.tsx` - Full Persian history narrative, mission, architecture
- `Board.tsx` - Leadership, governance philosophy, advisory areas
- `Programs.tsx` - 10 DAO details with Persian names, strategies
- `Governance.tsx` - vePARS explainer, active MIPs, voting process
- `MIPs.tsx` - All 25 proposals with filtering/search
- `Transparency.tsx` - Token distribution, treasury allocations
- `Contact.tsx` - Contact form, global presence, chapter info
- `Community.tsx` - Chapter information, community resources

### MIP Categories (25 proposals in `src/data/mips.ts`)
- Governance (MIP-1 to MIP-5): Charter, vePARS model, 10 DAOs, MIP process
- Treasury (MIP-6 to MIP-10): Allocation, reserve strategy, grants, WAQF
- Security (MIP-11 to MIP-14): Multi-sig, audits, privacy voting, bug bounty
- Culture (MIP-15 to MIP-18): Language preservation, heritage, Nowruz, artists
- Infrastructure (MIP-19 to MIP-22): 7-chain bridge, ERC-4626, Lux privacy, SDK
- Process (MIP-23 to MIP-25): Chapters, research grants, health network

## Historical Framing

The project traces Persian history from the Cyrus Cylinder (539 BCE) through:
- Achaemenid Empire pluralism
- Constitutional Revolution (1905-1911)
- 1953 coup (Operation Ajax)
- 1979 revolution and diaspora
- Present-day 8M+ diaspora coordination needs

**Tagline**: "The empire fell. The people scattered. The code endures. One day, we go home."

## Roadmap

1. **Phase 1 (2026-2027)**: Foundation - Legal entity, 3 DAOs, 1K+ holders
2. **Phase 2 (2027-2028)**: Civic OS - All 10 DAOs, privacy layer, 7-chain
3. **Phase 3 (2028-2030)**: Scale - 40+ countries, 100K+ members, $100M+ TVL
4. **Phase 4 (2030+)**: Nation-Ready - Full civic services, decentralized ops

## Important Notes

- Token native on Solana, bridged to EVM via Wormhole
- DAO governance on EVM (Ethereum/Lux) for privacy features
- No team tokens - team buys on bonding curve like everyone else
- Persian heritage names for all 10 DAOs
- Privacy-preserving voting for high-threat environments

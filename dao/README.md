# MIGA DAO Contracts

EVM smart contracts for the MIGA 10-DAO governance structure.

## Overview

MIGA separates political governance (PARS token) from capital allocation (10 specialized DAOs), enabling targeted funding without fragmenting governance.

## The Ten DAOs

| # | Symbol | Persian | Domain | Strategy |
|---|--------|---------|--------|----------|
| 1 | AMN | امنیّت (Amniyat) | Security | Stablecoin-only, audits |
| 2 | KHAZ | خزانه (Khazaneh) | Treasury | Diversified reserves |
| 3 | DAD | داد (Dād) | Governance | Minimal, tooling |
| 4 | SAL | سلامت (Salāmat) | Health | Stablecoin + yield |
| 5 | FARH | فرهنگ (Farhang) | Culture | Creator grants |
| 6 | DAN | دانش (Dānesh) | Research | Research grants |
| 7 | SAZ | سازندگی (Sāzandegi) | Infrastructure | Procurement |
| 8 | PAY | پیام (Payām) | Consular | Coordination |
| 9 | WAQF | وقف (Waqf) | Endowment | Long-horizon venture |
| 10 | MIZ | میزان (Mizān) | Integrity | Impact audits |

## Contracts

### Core Tokens

- **MigaToken.sol** - ERC-20 MIGA token (bridged from Solana)
- **ParsToken.sol** - PARS emission token
- **VePars.sol** - Vote-escrowed PARS for governance

### DAO Infrastructure

- **DaoVault.sol** - ERC-4626 vault for each DAO

## Governance Formula

```
vePARS = min(PARS, MIGA) × sqrt(lock_duration / max_duration)
```

This enforces:
- **Balance**: Need both tokens (whales without MIGA cannot dominate)
- **Commitment**: Longer locks earn more power
- **Diminishing Returns**: Square root prevents capture

## Deployment Chains

| Chain | Status |
|-------|--------|
| Ethereum | Planned |
| Base | Planned |
| Arbitrum | Planned |
| Polygon | Planned |
| Lux | Planned |

## Development

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- Node.js 18+

### Setup

```bash
# Install dependencies
forge install OpenZeppelin/openzeppelin-contracts

# Build
forge build

# Test
forge test

# Deploy (example: Base)
forge script scripts/Deploy.s.sol --rpc-url base --broadcast --verify
```

### Environment Variables

```bash
ETH_RPC_URL=
ETHERSCAN_API_KEY=
BASESCAN_API_KEY=
ARBISCAN_API_KEY=
POLYGONSCAN_API_KEY=
PRIVATE_KEY=
```

## Security

- All contracts follow OpenZeppelin standards
- ERC-4626 for vault accounting
- Multi-sig required for admin functions
- Timelocks on governance actions

## License

MIT

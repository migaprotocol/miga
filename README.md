# MIGA - Community DAO on Solana

MIGA is a community-driven decentralized autonomous organization (DAO) built on Solana, designed for fair token distribution and decentralized governance.

## Sites

- **[miga.us.org](https://miga.us.org)** - Foundation/DAO site
- **[migaprotocol.xyz](https://migaprotocol.xyz)** - Token page

## Tokenomics

| Allocation | Amount | Percentage | Purpose |
|------------|--------|------------|---------|
| Meteora LP | 100M | 10% | Initial liquidity via DLMM |
| Bonding Curve | 400M | 40% | Fair launch price discovery |
| Treasury | 500M | 50% | DAO-governed community fund |
| **Total** | **1B** | **100%** | |

## Token Details

- **Name**: MIGA
- **Symbol**: MIGA
- **Network**: Solana
- **Standard**: SPL Token
- **Decimals**: 9
- **Total Supply**: 1,000,000,000

## Project Structure

```
miga/
├── foundation/     # miga.us.org - React/Vite
├── protocol/       # migaprotocol.xyz - React/Vite + Solana wallet
├── token/          # Anchor program + deployment scripts
├── contracts/      # Shared ABIs
├── docs/           # Documentation
└── whitepaper/     # Protocol whitepaper
```

## Development

### Foundation Site
```bash
cd foundation
pnpm install
pnpm dev
```

### Protocol Site
```bash
cd protocol
pnpm install
pnpm dev
```

### Token Program
```bash
cd token
anchor build
anchor test
```

## Deployment

### Token
```bash
cd token
# Set environment
export RPC_URL=https://api.mainnet-beta.solana.com
export WALLET_PATH=~/.config/solana/id.json

# Deploy token
npx ts-node scripts/deploy.ts

# Create Meteora pool
npx ts-node scripts/create-meteora-pool.ts
```

### Sites
Sites are deployed automatically via GitHub Actions on push to `main`.

## Links

- Discord: [discord.gg/miga](https://discord.gg/miga)
- Twitter: [@migaprotocol](https://twitter.com/migaprotocol)
- Telegram: [t.me/migaprotocol](https://t.me/migaprotocol)
- GitHub: [github.com/miga-protocol](https://github.com/miga-protocol)

## License

MIT

# MIGA Multi-Chain Bridge

Cross-chain token bridge supporting 7+ blockchains via Wormhole and custom relayers.

## Supported Chains

| Chain | Token Standard | Bridge Protocol | Status |
|-------|---------------|-----------------|--------|
| Solana | SPL Token | Native | ✅ Origin |
| Ethereum | ERC20 | Wormhole | ✅ Supported |
| Base | ERC20 | Wormhole | ✅ Supported |
| Arbitrum | ERC20 | Wormhole | ✅ Supported |
| Polygon | ERC20 | Wormhole | ✅ Supported |
| Lux | ERC20 | Lux Bridge | 🔄 Custom |
| Bitcoin | Runes | Zeus Network | 🔄 Planned |

## Architecture

```
                    ┌─────────────────────────────────────────────┐
                    │           MIGA Token (Solana SPL)           │
                    │         Native Origin Chain Token           │
                    └─────────────────┬───────────────────────────┘
                                      │
                    ┌─────────────────▼───────────────────────────┐
                    │            Wormhole Protocol                │
                    │     Cross-Chain Messaging & Attestation     │
                    └─────────────────┬───────────────────────────┘
                                      │
        ┌─────────────┬───────────────┼───────────────┬───────────────┐
        │             │               │               │               │
        ▼             ▼               ▼               ▼               ▼
   ┌─────────┐  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
   │Ethereum │  │  Base   │    │Arbitrum │    │ Polygon │    │   Lux   │
   │ wMIGA   │  │ wMIGA   │    │ wMIGA   │    │ wMIGA   │    │ wMIGA   │
   └─────────┘  └─────────┘    └─────────┘    └─────────┘    └─────────┘
        │                                                          ▲
        │                    Lux Bridge                            │
        └──────────────────────────────────────────────────────────┘
```

## Token Addresses

### Mainnet
```
Solana:   MiGAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (SPL)
Ethereum: 0x... (Wormhole wrapped)
Base:     0x... (Wormhole wrapped)
Arbitrum: 0x... (Wormhole wrapped)
Polygon:  0x... (Wormhole wrapped)
Lux:      0x... (Lux Bridge wrapped)
```

## Bridge Flow

### Solana → EVM (via Wormhole)

1. User locks MIGA tokens in Wormhole Token Bridge on Solana
2. Wormhole guardians attest the lock transaction
3. User redeems wrapped MIGA (wMIGA) on destination EVM chain

```typescript
import { getSignedVAAWithRetry, redeemOnEth } from '@certusone/wormhole-sdk';

// Lock on Solana
const lockTx = await transferFromSolana(
  connection,
  WORMHOLE_BRIDGE_ADDRESS,
  WORMHOLE_TOKEN_BRIDGE_ADDRESS,
  wallet,
  migaTokenAccount,
  MIGA_MINT,
  amount,
  recipientAddress,
  CHAIN_ID_ETH
);

// Get VAA attestation
const { vaaBytes } = await getSignedVAAWithRetry(
  WORMHOLE_RPC_HOSTS,
  CHAIN_ID_SOLANA,
  emitterAddress,
  sequence
);

// Redeem on Ethereum
await redeemOnEth(ETH_TOKEN_BRIDGE_ADDRESS, signer, vaaBytes);
```

### EVM → Solana (via Wormhole)

1. User approves and transfers wMIGA to Token Bridge
2. Wormhole guardians attest the burn/lock
3. User claims native MIGA on Solana

### EVM ↔ Lux (via Lux Bridge)

For chains not directly connected via Wormhole, use Lux's native bridge:

```typescript
import { LuxBridge } from '@luxfi/bridge-sdk';

const bridge = new LuxBridge({
  sourceChain: 'ethereum',
  targetChain: 'lux',
});

// Bridge from Ethereum to Lux
await bridge.transfer({
  token: WMIGA_ETH_ADDRESS,
  amount: parseEther('1000'),
  recipient: luxAddress,
});
```

## Installation

```bash
pnpm add @miga/bridge
```

## Usage

```typescript
import { MigaBridge, Chain } from '@miga/bridge';

const bridge = new MigaBridge({
  sourceChain: Chain.SOLANA,
  targetChain: Chain.ETHEREUM,
});

// Get quote
const quote = await bridge.getQuote({
  amount: '1000000000', // 1 MIGA (9 decimals on Solana)
});

console.log('Estimated output:', quote.estimatedOutput);
console.log('Bridge fee:', quote.fee);
console.log('Estimated time:', quote.estimatedTime);

// Execute bridge
const tx = await bridge.transfer({
  amount: '1000000000',
  recipient: '0x...',
  slippage: 0.5, // 0.5%
});

// Track status
const status = await bridge.getTransferStatus(tx.id);
```

## Wormhole Integration

### Supported Wormhole Features

- **Token Bridge**: Lock/mint wrapped tokens
- **Circle CCTP**: Native USDC bridging
- **Generic Messaging**: Custom cross-chain messages
- **Automatic Relayer**: Gasless redemption

### Chain IDs

```typescript
export const WORMHOLE_CHAIN_IDS = {
  SOLANA: 1,
  ETHEREUM: 2,
  BSC: 4,
  POLYGON: 5,
  ARBITRUM: 23,
  BASE: 30,
  // Lux would need registration
};
```

## Lux Bridge Integration

Since Lux may not be natively supported by Wormhole, we use a two-step process:

1. **Solana → Ethereum** (Wormhole)
2. **Ethereum → Lux** (Lux Native Bridge)

Or implement a custom Wormhole relayer for direct Solana ↔ Lux.

### Custom Relayer Setup

```typescript
import { StandardRelayerApp } from '@wormhole-foundation/relayer-engine';

// Deploy custom relayer for Lux support
const relayer = new StandardRelayerApp({
  name: 'miga-lux-relayer',
  chains: {
    solana: { rpc: SOLANA_RPC },
    lux: { rpc: LUX_RPC },
  },
});

relayer.on('transfer', async (vaa) => {
  // Relay to Lux
  await relayToLux(vaa);
});
```

## Bitcoin Integration (Future)

Bitcoin support via Zeus Network or custom Runes bridge:

```
Bitcoin (Runes/BRC-20) ↔ Zeus Network ↔ Solana (SPL)
```

## Security

- All bridge contracts audited
- Multi-sig governance for upgrades
- Rate limiting on large transfers
- Emergency pause functionality

## License

MIT

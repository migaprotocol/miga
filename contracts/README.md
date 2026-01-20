# @miga/contracts

MIGA Protocol Contract SDK for Solana.

## Installation

```bash
pnpm add @miga/contracts
```

## Usage

```typescript
import { MigaClient, LAMPORTS_PER_SOL, BN } from "@miga/contracts";
import { Connection } from "@solana/web3.js";

// Create client
const connection = new Connection("https://api.mainnet-beta.solana.com");
const client = new MigaClient(connection);

// Get current price info
const priceInfo = await client.getPriceInfo();
console.log("Current price:", priceInfo.currentPrice.toString(), "lamports");
console.log("Tokens sold:", priceInfo.tokensSold.toString());
console.log("Progress:", priceInfo.percentComplete, "%");

// Estimate tokens for 1 SOL
const solAmount = new BN(LAMPORTS_PER_SOL);
const estimatedTokens = client.estimateTokensForSol(
  solAmount,
  priceInfo.tokensSold
);
console.log("Estimated tokens for 1 SOL:", estimatedTokens.toString());

// Build buy transaction (requires wallet)
const buyTx = await client.buildBuyTransaction(
  walletPublicKey,
  solAmount,
  100 // 1% slippage
);
```

## API

### `MigaClient`

#### Constructor
```typescript
new MigaClient(connection: Connection, provider?: AnchorProvider)
```

#### Methods

- `getConfig()` - Fetch the program config account
- `getPriceInfo()` - Get current price, tokens sold, and progress
- `calculatePrice(tokensSold: BN)` - Calculate price at a given sold amount
- `estimateTokensForSol(solAmount: BN, currentSold: BN)` - Estimate tokens received
- `buildBuyTransaction(buyer: PublicKey, solAmount: BN, slippageBps?: number)` - Build a buy transaction
- `isSaleActive()` - Check if sale is active
- `getRemainingTokens()` - Get remaining tokens for sale

## Types

```typescript
interface Config {
  authority: PublicKey;
  mint: PublicKey;
  treasury: PublicKey;
  bondingCurveVault: PublicKey;
  lpVault: PublicKey;
  bump: number;
  tokensSold: BN;
  solRaised: BN;
  saleActive: boolean;
}

interface PriceInfo {
  currentPrice: BN;
  tokensSold: BN;
  percentComplete: number;
  solRaised: BN;
}
```

## Constants

```typescript
MIGA_PROGRAM_ID    // Program address
TOTAL_SUPPLY       // 1B tokens
LP_SUPPLY          // 100M (10%)
BONDING_CURVE_SUPPLY // 400M (40%)
TREASURY_SUPPLY    // 500M (50%)
START_PRICE        // Starting price in lamports
END_PRICE          // Ending price in lamports
```

## IDL

The program IDL is available at:
```typescript
import { MigaIDL } from "@miga/contracts";
// or
import IDL from "@miga/contracts/idl";
```

## License

MIT

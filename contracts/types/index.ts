import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

// Program ID (update after deployment)
export const MIGA_PROGRAM_ID = new PublicKey(
  "MiGAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
);

// Constants matching the Rust program
export const TOTAL_SUPPLY = new BN("1000000000000000000"); // 1B with 9 decimals
export const LP_SUPPLY = new BN("100000000000000000");     // 100M (10%)
export const BONDING_CURVE_SUPPLY = new BN("400000000000000000"); // 400M (40%)
export const TREASURY_SUPPLY = new BN("500000000000000000"); // 500M (50%)

export const START_PRICE = new BN(100);      // lamports per token
export const END_PRICE = new BN(10000);      // lamports per token

// Account types
export interface Config {
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

// Event types
export interface InitializeEvent {
  authority: PublicKey;
  mint: PublicKey;
  timestamp: BN;
}

export interface PurchaseEvent {
  buyer: PublicKey;
  solAmount: BN;
  tokensReceived: BN;
  pricePerToken: BN;
  timestamp: BN;
}

export interface SaleStatusEvent {
  active: boolean;
  timestamp: BN;
}

// Helper types
export interface BuyParams {
  solAmount: BN;
  minTokensOut: BN;
}

export interface PriceInfo {
  currentPrice: BN;
  tokensSold: BN;
  percentComplete: number;
  solRaised: BN;
}

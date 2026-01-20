// Types
export * from "../types";

// SDK Client
export { MigaClient } from "../sdk/client";

// IDL
export { default as MigaIDL } from "../idl/miga.json";

// Re-export useful Anchor/Solana types
export { BN } from "@coral-xyz/anchor";
export { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

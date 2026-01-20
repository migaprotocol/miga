/**
 * MIGA Token Deployment Script
 *
 * This script deploys the MIGA token and initializes allocations:
 * - Creates SPL Token mint
 * - Mints total supply
 * - Distributes to vaults:
 *   - 10% to LP vault (for Meteora)
 *   - 40% to Bonding Curve vault
 *   - 50% to Treasury
 */

import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import * as anchor from "@coral-xyz/anchor";
import * as fs from "fs";

// Token configuration
const CONFIG = {
  name: "MIGA",
  symbol: "MIGA",
  decimals: 9,
  totalSupply: BigInt(1_000_000_000) * BigInt(10 ** 9), // 1B
  lpAllocation: BigInt(100_000_000) * BigInt(10 ** 9),   // 10% = 100M
  bondingCurveAllocation: BigInt(400_000_000) * BigInt(10 ** 9), // 40% = 400M
  treasuryAllocation: BigInt(500_000_000) * BigInt(10 ** 9), // 50% = 500M
};

async function deploy() {
  // Load wallet
  const walletPath = process.env.WALLET_PATH || "~/.config/solana/id.json";
  const expandedPath = walletPath.replace("~", process.env.HOME!);
  const walletData = JSON.parse(fs.readFileSync(expandedPath, "utf-8"));
  const wallet = Keypair.fromSecretKey(Uint8Array.from(walletData));

  // Connect to Solana
  const rpcUrl = process.env.RPC_URL || "https://api.devnet.solana.com";
  const connection = new Connection(rpcUrl, "confirmed");

  console.log("=== MIGA Token Deployment ===");
  console.log("Network:", rpcUrl);
  console.log("Deployer:", wallet.publicKey.toBase58());

  // Check balance
  const balance = await connection.getBalance(wallet.publicKey);
  console.log("Balance:", balance / LAMPORTS_PER_SOL, "SOL");

  if (balance < 0.5 * LAMPORTS_PER_SOL) {
    throw new Error("Insufficient balance. Need at least 0.5 SOL for deployment.");
  }

  // Create mint
  console.log("\n1. Creating token mint...");
  const mint = await createMint(
    connection,
    wallet,
    wallet.publicKey, // mint authority
    null,             // freeze authority (none)
    CONFIG.decimals
  );
  console.log("   Mint:", mint.toBase58());

  // Create treasury wallet
  const treasury = Keypair.generate();
  console.log("\n2. Created treasury keypair:", treasury.publicKey.toBase58());

  // Save treasury keypair (IMPORTANT: secure this!)
  fs.writeFileSync(
    "./treasury-keypair.json",
    JSON.stringify(Array.from(treasury.secretKey))
  );
  console.log("   Treasury keypair saved to treasury-keypair.json");

  // Create token accounts for allocations
  console.log("\n3. Creating token accounts...");

  const lpVault = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    wallet.publicKey // LP vault held by deployer initially
  );
  console.log("   LP Vault:", lpVault.address.toBase58());

  const bondingCurveVault = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    treasury.publicKey // Bonding curve vault
  );
  console.log("   Bonding Curve Vault:", bondingCurveVault.address.toBase58());

  const treasuryVault = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    treasury.publicKey // Treasury vault
  );
  console.log("   Treasury Vault:", treasuryVault.address.toBase58());

  // Mint tokens to each vault
  console.log("\n4. Minting token allocations...");

  // LP allocation (10%)
  await mintTo(
    connection,
    wallet,
    mint,
    lpVault.address,
    wallet.publicKey,
    CONFIG.lpAllocation
  );
  console.log("   LP Vault: 100M MIGA (10%)");

  // Bonding curve allocation (40%)
  await mintTo(
    connection,
    wallet,
    mint,
    bondingCurveVault.address,
    wallet.publicKey,
    CONFIG.bondingCurveAllocation
  );
  console.log("   Bonding Curve: 400M MIGA (40%)");

  // Treasury allocation (50%)
  await mintTo(
    connection,
    wallet,
    mint,
    treasuryVault.address,
    wallet.publicKey,
    CONFIG.treasuryAllocation
  );
  console.log("   Treasury: 500M MIGA (50%)");

  // Summary
  console.log("\n=== Deployment Complete ===");
  console.log("Token Mint:", mint.toBase58());
  console.log("LP Vault:", lpVault.address.toBase58());
  console.log("Bonding Curve Vault:", bondingCurveVault.address.toBase58());
  console.log("Treasury Vault:", treasuryVault.address.toBase58());
  console.log("Treasury Keypair:", treasury.publicKey.toBase58());

  // Save deployment info
  const deploymentInfo = {
    network: rpcUrl.includes("devnet") ? "devnet" : "mainnet-beta",
    mint: mint.toBase58(),
    lpVault: lpVault.address.toBase58(),
    bondingCurveVault: bondingCurveVault.address.toBase58(),
    treasuryVault: treasuryVault.address.toBase58(),
    treasury: treasury.publicKey.toBase58(),
    deployer: wallet.publicKey.toBase58(),
    deployedAt: new Date().toISOString(),
    tokenomics: {
      totalSupply: CONFIG.totalSupply.toString(),
      lpAllocation: CONFIG.lpAllocation.toString(),
      bondingCurveAllocation: CONFIG.bondingCurveAllocation.toString(),
      treasuryAllocation: CONFIG.treasuryAllocation.toString(),
    },
  };

  fs.writeFileSync(
    "./deployment.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\nDeployment info saved to deployment.json");

  console.log("\n=== Next Steps ===");
  console.log("1. Verify token on Solscan");
  console.log("2. Create Meteora DLMM pool with LP vault tokens");
  console.log("3. Initialize bonding curve program");
  console.log("4. Update frontend with token addresses");
}

// Run
deploy()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

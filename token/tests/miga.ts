import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { Miga } from "../target/types/miga";
import {
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  getAccount,
} from "@solana/spl-token";
import { expect } from "chai";

describe("miga", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Miga as Program<Miga>;

  let mint: PublicKey;
  let config: PublicKey;
  let configBump: number;
  let treasury: Keypair;
  let bondingCurveVault: PublicKey;
  let lpVault: PublicKey;

  const BONDING_CURVE_SUPPLY = new BN(400_000_000).mul(
    new BN(10).pow(new BN(9))
  );
  const LP_SUPPLY = new BN(100_000_000).mul(new BN(10).pow(new BN(9)));

  before(async () => {
    treasury = Keypair.generate();

    // Airdrop SOL to treasury for rent
    const airdropSig = await provider.connection.requestAirdrop(
      treasury.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropSig);

    // Derive config PDA
    [config, configBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId
    );

    // Create mint
    mint = await createMint(
      provider.connection,
      provider.wallet.payer,
      provider.wallet.publicKey,
      null,
      9
    );

    // Create token accounts owned by config PDA
    const bondingVaultAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      provider.wallet.payer,
      mint,
      config,
      true // allowOwnerOffCurve
    );
    bondingCurveVault = bondingVaultAccount.address;

    // For LP vault, use a different seed or just create another ATA
    const lpVaultAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      provider.wallet.payer,
      mint,
      config,
      true
    );
    lpVault = lpVaultAccount.address;

    // Mint tokens to vaults
    await mintTo(
      provider.connection,
      provider.wallet.payer,
      mint,
      bondingCurveVault,
      provider.wallet.publicKey,
      BigInt(BONDING_CURVE_SUPPLY.toString())
    );

    console.log("Setup complete:");
    console.log("  Config PDA:", config.toBase58());
    console.log("  Mint:", mint.toBase58());
    console.log("  Treasury:", treasury.publicKey.toBase58());
    console.log("  Bonding Curve Vault:", bondingCurveVault.toBase58());
  });

  describe("initialize", () => {
    it("initializes the config", async () => {
      await program.methods
        .initialize()
        .accounts({
          authority: provider.wallet.publicKey,
          config,
          mint,
          treasury: treasury.publicKey,
          bondingCurveVault,
          lpVault,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      const configAccount = await program.account.config.fetch(config);

      expect(configAccount.authority.toString()).to.equal(
        provider.wallet.publicKey.toString()
      );
      expect(configAccount.mint.toString()).to.equal(mint.toString());
      expect(configAccount.treasury.toString()).to.equal(
        treasury.publicKey.toString()
      );
      expect(configAccount.saleActive).to.equal(true);
      expect(configAccount.tokensSold.toNumber()).to.equal(0);
      expect(configAccount.solRaised.toNumber()).to.equal(0);
      expect(configAccount.bump).to.equal(configBump);

      console.log("  Initialized at:", configAccount.initializedAt.toString());
    });
  });

  describe("getPrice", () => {
    it("returns the starting price when no tokens sold", async () => {
      const price = await program.methods
        .getPrice()
        .accounts({ config })
        .view();

      expect(price.toNumber()).to.equal(100); // START_PRICE
      console.log("  Current price:", price.toNumber(), "lamports per 10^9 tokens");
    });
  });

  describe("getStats", () => {
    it("returns protocol statistics", async () => {
      const stats = await program.methods
        .getStats()
        .accounts({ config })
        .view();

      expect(stats.tokensSold.toNumber()).to.equal(0);
      expect(stats.solRaised.toNumber()).to.equal(0);
      expect(stats.saleActive).to.equal(true);
      expect(stats.currentPrice.toNumber()).to.equal(100);
      expect(stats.percentComplete).to.equal(0);

      console.log("  Stats:", {
        tokensSold: stats.tokensSold.toString(),
        solRaised: stats.solRaised.toString(),
        currentPrice: stats.currentPrice.toString(),
        remainingTokens: stats.remainingTokens.toString(),
        percentComplete: stats.percentComplete / 100 + "%",
      });
    });
  });

  describe("buy", () => {
    it("allows buying tokens with SOL", async () => {
      const buyer = Keypair.generate();

      // Airdrop SOL to buyer
      const airdropSig = await provider.connection.requestAirdrop(
        buyer.publicKey,
        5 * LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(airdropSig);

      const solAmount = new BN(LAMPORTS_PER_SOL); // 1 SOL
      const minTokensOut = new BN(1); // Minimum 1 token

      const buyerTokenAccount = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        buyer,
        mint,
        buyer.publicKey
      );

      const treasuryBalanceBefore = await provider.connection.getBalance(
        treasury.publicKey
      );

      await program.methods
        .buy(solAmount, minTokensOut)
        .accounts({
          buyer: buyer.publicKey,
          config,
          bondingCurveVault,
          buyerTokenAccount: buyerTokenAccount.address,
          mint,
          treasury: treasury.publicKey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .signers([buyer])
        .rpc();

      // Check buyer received tokens
      const buyerAccountAfter = await getAccount(
        provider.connection,
        buyerTokenAccount.address
      );
      expect(Number(buyerAccountAfter.amount)).to.be.greaterThan(0);

      // Check treasury received SOL
      const treasuryBalanceAfter = await provider.connection.getBalance(
        treasury.publicKey
      );
      expect(treasuryBalanceAfter - treasuryBalanceBefore).to.equal(
        solAmount.toNumber()
      );

      // Check config updated
      const configAccount = await program.account.config.fetch(config);
      expect(configAccount.tokensSold.toNumber()).to.be.greaterThan(0);
      expect(configAccount.solRaised.toNumber()).to.equal(solAmount.toNumber());

      console.log("  Buyer received:", buyerAccountAfter.amount.toString(), "tokens");
      console.log("  Total sold:", configAccount.tokensSold.toString());
      console.log("  Total raised:", configAccount.solRaised.toNumber() / LAMPORTS_PER_SOL, "SOL");
    });

    it("rejects when slippage exceeded", async () => {
      const buyer = Keypair.generate();

      const airdropSig = await provider.connection.requestAirdrop(
        buyer.publicKey,
        2 * LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(airdropSig);

      const solAmount = new BN(LAMPORTS_PER_SOL);
      const unreasonableMinTokens = new BN("999999999999999999"); // Way too high

      const buyerTokenAccount = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        buyer,
        mint,
        buyer.publicKey
      );

      try {
        await program.methods
          .buy(solAmount, unreasonableMinTokens)
          .accounts({
            buyer: buyer.publicKey,
            config,
            bondingCurveVault,
            buyerTokenAccount: buyerTokenAccount.address,
            mint,
            treasury: treasury.publicKey,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          })
          .signers([buyer])
          .rpc();
        expect.fail("Should have thrown SlippageExceeded error");
      } catch (err: any) {
        expect(err.error.errorCode.code).to.equal("SlippageExceeded");
        console.log("  Correctly rejected: SlippageExceeded");
      }
    });
  });

  describe("toggleSale", () => {
    it("toggles sale status", async () => {
      // Turn off
      await program.methods
        .toggleSale()
        .accounts({
          authority: provider.wallet.publicKey,
          config,
        })
        .rpc();

      let configAccount = await program.account.config.fetch(config);
      expect(configAccount.saleActive).to.equal(false);
      console.log("  Sale active after first toggle:", configAccount.saleActive);

      // Turn back on
      await program.methods
        .toggleSale()
        .accounts({
          authority: provider.wallet.publicKey,
          config,
        })
        .rpc();

      configAccount = await program.account.config.fetch(config);
      expect(configAccount.saleActive).to.equal(true);
      console.log("  Sale active after second toggle:", configAccount.saleActive);
    });

    it("rejects non-authority", async () => {
      const randomUser = Keypair.generate();

      try {
        await program.methods
          .toggleSale()
          .accounts({
            authority: randomUser.publicKey,
            config,
          })
          .signers([randomUser])
          .rpc();
        expect.fail("Should have thrown Unauthorized error");
      } catch (err: any) {
        expect(err.error.errorCode.code).to.equal("Unauthorized");
        console.log("  Correctly rejected non-authority");
      }
    });
  });

  describe("updateTreasury", () => {
    it("updates treasury address", async () => {
      const newTreasury = Keypair.generate();

      await program.methods
        .updateTreasury(newTreasury.publicKey)
        .accounts({
          authority: provider.wallet.publicKey,
          config,
        })
        .rpc();

      const configAccount = await program.account.config.fetch(config);
      expect(configAccount.treasury.toString()).to.equal(
        newTreasury.publicKey.toString()
      );
      console.log("  New treasury:", newTreasury.publicKey.toBase58());

      // Restore original for other tests
      await program.methods
        .updateTreasury(treasury.publicKey)
        .accounts({
          authority: provider.wallet.publicKey,
          config,
        })
        .rpc();
    });
  });

  describe("transferAuthority", () => {
    it("initiates and completes authority transfer", async () => {
      const newAuthority = Keypair.generate();

      // Airdrop to new authority for signing
      const airdropSig = await provider.connection.requestAirdrop(
        newAuthority.publicKey,
        LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(airdropSig);

      // Initiate transfer
      await program.methods
        .transferAuthority(newAuthority.publicKey)
        .accounts({
          authority: provider.wallet.publicKey,
          config,
        })
        .rpc();

      let configAccount = await program.account.config.fetch(config);
      expect(configAccount.pendingAuthority?.toString()).to.equal(
        newAuthority.publicKey.toString()
      );
      console.log("  Pending authority set:", newAuthority.publicKey.toBase58());

      // Accept transfer
      await program.methods
        .acceptAuthority()
        .accounts({
          newAuthority: newAuthority.publicKey,
          config,
        })
        .signers([newAuthority])
        .rpc();

      configAccount = await program.account.config.fetch(config);
      expect(configAccount.authority.toString()).to.equal(
        newAuthority.publicKey.toString()
      );
      expect(configAccount.pendingAuthority).to.be.null;
      console.log("  Authority transferred to:", newAuthority.publicKey.toBase58());

      // Transfer back to original
      await program.methods
        .transferAuthority(provider.wallet.publicKey)
        .accounts({
          authority: newAuthority.publicKey,
          config,
        })
        .signers([newAuthority])
        .rpc();

      await program.methods
        .acceptAuthority()
        .accounts({
          newAuthority: provider.wallet.publicKey,
          config,
        })
        .rpc();

      console.log("  Authority restored to original");
    });
  });
});

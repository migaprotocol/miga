import { Program, AnchorProvider, BN, Idl } from "@coral-xyz/anchor";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

import {
  MIGA_PROGRAM_ID,
  BONDING_CURVE_SUPPLY,
  START_PRICE,
  END_PRICE,
  Config,
  PriceInfo,
  BuyParams,
} from "../types";
import IDL from "../idl/miga.json";

export class MigaClient {
  private program: Program;
  private connection: Connection;

  constructor(connection: Connection, provider?: AnchorProvider) {
    this.connection = connection;

    if (provider) {
      this.program = new Program(IDL as Idl, MIGA_PROGRAM_ID, provider);
    } else {
      // Read-only mode
      this.program = new Program(
        IDL as Idl,
        MIGA_PROGRAM_ID,
        { connection } as AnchorProvider
      );
    }
  }

  // PDA derivation
  getConfigPDA(): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      MIGA_PROGRAM_ID
    );
  }

  // Fetch config account
  async getConfig(): Promise<Config> {
    const [configPDA] = this.getConfigPDA();
    const config = await this.program.account.config.fetch(configPDA);
    return config as Config;
  }

  // Calculate current price based on tokens sold
  calculatePrice(tokensSold: BN): BN {
    if (tokensSold.gte(BONDING_CURVE_SUPPLY)) {
      return END_PRICE;
    }

    const priceRange = END_PRICE.sub(START_PRICE);
    const progress = tokensSold.mul(new BN(10000)).div(BONDING_CURVE_SUPPLY);
    const priceIncrease = priceRange.mul(progress).div(new BN(10000));

    return START_PRICE.add(priceIncrease);
  }

  // Get current price info
  async getPriceInfo(): Promise<PriceInfo> {
    const config = await this.getConfig();
    const currentPrice = this.calculatePrice(config.tokensSold);
    const percentComplete = config.tokensSold
      .mul(new BN(100))
      .div(BONDING_CURVE_SUPPLY)
      .toNumber();

    return {
      currentPrice,
      tokensSold: config.tokensSold,
      percentComplete,
      solRaised: config.solRaised,
    };
  }

  // Estimate tokens for SOL amount
  estimateTokensForSol(solAmount: BN, currentSold: BN): BN {
    const currentPrice = this.calculatePrice(currentSold);
    // tokens = sol_amount * 10^9 / price
    return solAmount.mul(new BN(10).pow(new BN(9))).div(currentPrice);
  }

  // Build buy instruction
  async buildBuyInstruction(
    buyer: PublicKey,
    params: BuyParams
  ): Promise<TransactionInstruction> {
    const [configPDA] = this.getConfigPDA();
    const config = await this.getConfig();

    const buyerTokenAccount = await getAssociatedTokenAddress(
      config.mint,
      buyer
    );

    const bondingCurveVault = await getAssociatedTokenAddress(
      config.mint,
      configPDA,
      true
    );

    return this.program.methods
      .buy(params.solAmount, params.minTokensOut)
      .accounts({
        buyer,
        config: configPDA,
        bondingCurveVault,
        buyerTokenAccount,
        mint: config.mint,
        treasury: config.treasury,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .instruction();
  }

  // Build buy transaction
  async buildBuyTransaction(
    buyer: PublicKey,
    solAmount: BN,
    slippageBps: number = 100 // 1% default slippage
  ): Promise<Transaction> {
    const config = await this.getConfig();

    // Estimate tokens
    const estimatedTokens = this.estimateTokensForSol(solAmount, config.tokensSold);

    // Apply slippage
    const minTokensOut = estimatedTokens
      .mul(new BN(10000 - slippageBps))
      .div(new BN(10000));

    const ix = await this.buildBuyInstruction(buyer, {
      solAmount,
      minTokensOut,
    });

    const tx = new Transaction().add(ix);
    tx.feePayer = buyer;

    const { blockhash } = await this.connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;

    return tx;
  }

  // Check if sale is active
  async isSaleActive(): Promise<boolean> {
    const config = await this.getConfig();
    return config.saleActive;
  }

  // Get remaining tokens for sale
  async getRemainingTokens(): Promise<BN> {
    const config = await this.getConfig();
    return BONDING_CURVE_SUPPLY.sub(config.tokensSold);
  }
}

import { Connection, PublicKey } from '@solana/web3.js';
import {
  Chain,
  BridgeClientConfig,
  BridgeQuote,
  BridgeProtocol,
  TransferParams,
  TransferResult,
  TransferStatus,
  TransferStatusResult,
} from './types';
import {
  getChainConfig,
  getBridgeRoute,
  isWormholeSupported,
} from './chains';
import { WormholeBridge, createWormholeBridge } from './wormhole';
import {
  BRIDGE_TIMES,
  BRIDGE_FEES,
  MIN_BRIDGE_AMOUNTS,
} from './constants';

/**
 * Main MIGA Bridge client
 *
 * Handles routing and execution of cross-chain transfers
 * across all supported chains (Solana, Ethereum, Base, Arbitrum, Polygon, Lux, Bitcoin)
 */
export class MigaBridge {
  private sourceChain: Chain;
  private targetChain: Chain;
  private testnet: boolean;
  private wormhole: WormholeBridge;
  private rpcUrls: Partial<Record<Chain, string>>;

  constructor(config: BridgeClientConfig, testnet = false) {
    this.sourceChain = config.sourceChain;
    this.targetChain = config.targetChain;
    this.testnet = testnet;
    this.wormhole = createWormholeBridge(testnet);
    this.rpcUrls = config.rpcUrls || {};
  }

  /**
   * Get the optimal bridge route
   */
  getRoute(): Chain[] {
    return getBridgeRoute(this.sourceChain, this.targetChain);
  }

  /**
   * Get bridge quote with estimated output and fees
   */
  async getQuote(params: { amount: string | bigint }): Promise<BridgeQuote> {
    const amount = typeof params.amount === 'string'
      ? BigInt(params.amount)
      : params.amount;

    // Validate minimum amount
    const minAmount = MIN_BRIDGE_AMOUNTS[this.sourceChain];
    if (amount < minAmount) {
      throw new Error(
        `Amount below minimum. Min: ${minAmount.toString()}, Got: ${amount.toString()}`
      );
    }

    const route = this.getRoute();

    // Single hop via Wormhole
    if (route.length === 2 && isWormholeSupported(route[0]) && isWormholeSupported(route[1])) {
      return this.wormhole.getQuote(route[0], route[1], amount);
    }

    // Multi-hop route (e.g., Solana -> Ethereum -> Lux)
    return this.getMultiHopQuote(route, amount);
  }

  /**
   * Get quote for multi-hop bridge route
   */
  private async getMultiHopQuote(route: Chain[], amount: bigint): Promise<BridgeQuote> {
    let currentAmount = amount;
    let totalFee = BigInt(0);
    let totalTime = 0;
    const routeSteps: BridgeQuote['route'] = [];

    for (let i = 0; i < route.length - 1; i++) {
      const from = route[i];
      const to = route[i + 1];

      let protocol: BridgeProtocol;
      let stepTime: number;
      let stepFee: bigint;

      if (isWormholeSupported(from) && isWormholeSupported(to)) {
        // Wormhole hop
        protocol = BridgeProtocol.WORMHOLE;
        const wormholeQuote = await this.wormhole.getQuote(from, to, currentAmount);
        currentAmount = wormholeQuote.estimatedOutput;
        stepFee = wormholeQuote.fee;
        stepTime = wormholeQuote.estimatedTime;
      } else if (to === Chain.LUX || from === Chain.LUX) {
        // Lux Bridge hop
        protocol = BridgeProtocol.LUX_BRIDGE;
        stepFee = (currentAmount * BigInt(BRIDGE_FEES.LUX_BRIDGE)) / BigInt(10000);
        currentAmount = currentAmount - stepFee;
        stepTime = BRIDGE_TIMES.LUX_BRIDGE;
      } else if (to === Chain.BITCOIN || from === Chain.BITCOIN) {
        // Zeus Network hop
        protocol = BridgeProtocol.ZEUS_NETWORK;
        stepFee = (currentAmount * BigInt(BRIDGE_FEES.ZEUS_NETWORK)) / BigInt(10000);
        currentAmount = currentAmount - stepFee;
        stepTime = BRIDGE_TIMES.ZEUS_NETWORK;
      } else {
        throw new Error(`No bridge protocol for ${from} -> ${to}`);
      }

      totalFee += stepFee;
      totalTime += stepTime;
      routeSteps.push({ from, to, protocol, estimatedTime: stepTime });
    }

    const sourceConfig = getChainConfig(this.sourceChain, this.testnet);

    return {
      sourceChain: this.sourceChain,
      targetChain: this.targetChain,
      inputAmount: amount,
      estimatedOutput: currentAmount,
      fee: totalFee,
      feeToken: sourceConfig.nativeCurrency.symbol,
      estimatedTime: totalTime,
      route: routeSteps,
      protocol: routeSteps[0].protocol, // Primary protocol
    };
  }

  /**
   * Execute a bridge transfer
   *
   * Note: This returns the transaction to be signed by the user's wallet.
   * The actual signing/sending is done by the frontend.
   */
  async transfer(params: TransferParams): Promise<TransferResult> {
    const amount = typeof params.amount === 'string'
      ? BigInt(params.amount)
      : params.amount;

    const route = this.getRoute();

    // For now, return a pending result
    // The actual transfer execution will be handled by chain-specific methods
    const result: TransferResult = {
      id: this.generateTransferId(),
      sourceChain: this.sourceChain,
      targetChain: this.targetChain,
      sourceTxHash: '', // Will be set after tx submission
      amount,
      recipient: params.recipient,
      status: TransferStatus.PENDING,
      timestamp: Date.now(),
    };

    return result;
  }

  /**
   * Build Solana transfer transaction
   */
  async buildSolanaTransferTx(
    sender: PublicKey,
    amount: bigint,
    recipient: string,
    targetChain: Chain
  ): Promise<{
    transaction: any; // VersionedTransaction
    estimatedFee: bigint;
  }> {
    const sourceConfig = getChainConfig(Chain.SOLANA, this.testnet);
    const connection = new Connection(
      this.rpcUrls[Chain.SOLANA] || sourceConfig.rpcUrl
    );

    // This would use the Wormhole SDK to build the actual transaction
    // Simplified for now - actual implementation would use:
    // - @certusone/wormhole-sdk transferFromSolana
    // - Create the token bridge transfer instruction

    throw new Error('buildSolanaTransferTx not yet implemented - use Wormhole SDK directly');
  }

  /**
   * Build EVM transfer transaction
   */
  async buildEVMTransferTx(
    sender: string,
    amount: bigint,
    recipient: string,
    targetChain: Chain
  ): Promise<{
    to: string;
    data: string;
    value: bigint;
  }> {
    // This would use the Wormhole SDK to build the actual transaction
    // Simplified for now - actual implementation would use:
    // - @certusone/wormhole-sdk transferFromEth
    // - Encode the token bridge transfer call

    throw new Error('buildEVMTransferTx not yet implemented - use Wormhole SDK directly');
  }

  /**
   * Get transfer status
   */
  async getTransferStatus(transferId: string): Promise<TransferStatusResult> {
    // In a real implementation, this would:
    // 1. Look up the transfer in a database/indexer
    // 2. Check Wormhole guardian status
    // 3. Check if redeemed on target chain

    return {
      id: transferId,
      status: TransferStatus.PENDING,
      sourceChain: this.sourceChain,
      targetChain: this.targetChain,
      sourceTxHash: '',
    };
  }

  /**
   * Check if VAA is ready for redemption
   */
  async isRedeemable(
    emitterChain: Chain,
    emitterAddress: string,
    sequence: bigint
  ): Promise<boolean> {
    const vaa = await this.wormhole.getVAA(emitterChain, emitterAddress, sequence);
    return vaa !== null;
  }

  /**
   * Generate unique transfer ID
   */
  private generateTransferId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 10);
    return `miga-${timestamp}-${random}`;
  }
}

/**
 * Create MIGA bridge client
 */
export function createMigaBridge(
  sourceChain: Chain,
  targetChain: Chain,
  options?: {
    testnet?: boolean;
    rpcUrls?: Partial<Record<Chain, string>>;
  }
): MigaBridge {
  return new MigaBridge(
    {
      sourceChain,
      targetChain,
      rpcUrls: options?.rpcUrls,
    },
    options?.testnet
  );
}

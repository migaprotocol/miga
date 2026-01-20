import {
  Chain,
  BridgeQuote,
  BridgeProtocol,
  TransferStatus,
  WormholeVAA,
} from './types';
import {
  WORMHOLE_CHAIN_IDS,
  isWormholeSupported,
  getChainConfig,
} from './chains';
import {
  WORMHOLE_RPC_HOSTS,
  BRIDGE_FEES,
  BRIDGE_TIMES,
  TOKEN_DECIMALS,
} from './constants';

/**
 * Wormhole SDK wrapper for MIGA bridge operations
 */
export class WormholeBridge {
  private testnet: boolean;

  constructor(testnet = false) {
    this.testnet = testnet;
  }

  /**
   * Check if a route is supported via Wormhole
   */
  isRouteSupported(source: Chain, target: Chain): boolean {
    return isWormholeSupported(source) && isWormholeSupported(target);
  }

  /**
   * Get Wormhole chain ID
   */
  getWormholeChainId(chain: Chain): number {
    const id = WORMHOLE_CHAIN_IDS[chain];
    if (!id) {
      throw new Error(`Chain ${chain} not supported by Wormhole`);
    }
    return id;
  }

  /**
   * Get bridge quote for Wormhole transfer
   */
  async getQuote(
    source: Chain,
    target: Chain,
    amount: bigint
  ): Promise<BridgeQuote> {
    if (!this.isRouteSupported(source, target)) {
      throw new Error(`Wormhole does not support ${source} -> ${target}`);
    }

    const sourceDecimals = TOKEN_DECIMALS[source];
    const targetDecimals = TOKEN_DECIMALS[target];

    // Normalize amount between different decimal chains
    let estimatedOutput = amount;
    if (sourceDecimals !== targetDecimals) {
      if (sourceDecimals > targetDecimals) {
        estimatedOutput = amount / BigInt(10 ** (sourceDecimals - targetDecimals));
      } else {
        estimatedOutput = amount * BigInt(10 ** (targetDecimals - sourceDecimals));
      }
    }

    // Wormhole doesn't charge protocol fees, only relayer gas
    const fee = BigInt(0);

    // Estimate time based on route
    let estimatedTime: number;
    const sourceConfig = getChainConfig(source, this.testnet);
    const targetConfig = getChainConfig(target, this.testnet);

    if (!sourceConfig.isEVM && targetConfig.isEVM) {
      estimatedTime = BRIDGE_TIMES.WORMHOLE_SOLANA_TO_EVM;
    } else if (sourceConfig.isEVM && !targetConfig.isEVM) {
      estimatedTime = BRIDGE_TIMES.WORMHOLE_EVM_TO_SOLANA;
    } else {
      estimatedTime = BRIDGE_TIMES.WORMHOLE_EVM_TO_EVM;
    }

    return {
      sourceChain: source,
      targetChain: target,
      inputAmount: amount,
      estimatedOutput,
      fee,
      feeToken: sourceConfig.nativeCurrency.symbol,
      estimatedTime,
      route: [
        {
          from: source,
          to: target,
          protocol: BridgeProtocol.WORMHOLE,
          estimatedTime,
        },
      ],
      protocol: BridgeProtocol.WORMHOLE,
    };
  }

  /**
   * Get VAA (Verified Action Approval) from guardians
   */
  async getVAA(
    emitterChain: Chain,
    emitterAddress: string,
    sequence: bigint
  ): Promise<WormholeVAA | null> {
    const chainId = this.getWormholeChainId(emitterChain);

    // Try each RPC host until we get a response
    for (const host of WORMHOLE_RPC_HOSTS) {
      try {
        const response = await fetch(
          `${host}/v1/signed_vaa/${chainId}/${emitterAddress}/${sequence}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.vaaBytes) {
            return {
              bytes: Buffer.from(data.vaaBytes, 'base64'),
              sequence,
              emitterChain: chainId,
              emitterAddress,
            };
          }
        }
      } catch {
        // Try next host
        continue;
      }
    }

    return null;
  }

  /**
   * Poll for VAA with retry
   */
  async getVAAWithRetry(
    emitterChain: Chain,
    emitterAddress: string,
    sequence: bigint,
    maxRetries = 30,
    retryDelayMs = 5000
  ): Promise<WormholeVAA> {
    for (let i = 0; i < maxRetries; i++) {
      const vaa = await this.getVAA(emitterChain, emitterAddress, sequence);
      if (vaa) {
        return vaa;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }

    throw new Error(
      `Failed to get VAA after ${maxRetries} retries for sequence ${sequence}`
    );
  }

  /**
   * Get transfer status from VAA
   */
  async getTransferStatus(
    emitterChain: Chain,
    emitterAddress: string,
    sequence: bigint
  ): Promise<TransferStatus> {
    const vaa = await this.getVAA(emitterChain, emitterAddress, sequence);

    if (!vaa) {
      return TransferStatus.PENDING;
    }

    return TransferStatus.ATTESTED;
  }

  /**
   * Parse VAA to extract transfer details
   */
  parseVAA(vaaBytes: Uint8Array): {
    emitterChain: number;
    emitterAddress: string;
    sequence: bigint;
    payload: Uint8Array;
  } {
    // VAA structure:
    // - version (1 byte)
    // - guardian set index (4 bytes)
    // - signature count (1 byte)
    // - signatures (66 bytes each)
    // - timestamp (4 bytes)
    // - nonce (4 bytes)
    // - emitter chain (2 bytes)
    // - emitter address (32 bytes)
    // - sequence (8 bytes)
    // - consistency level (1 byte)
    // - payload (remaining)

    const view = new DataView(vaaBytes.buffer);
    let offset = 0;

    // Skip version
    offset += 1;

    // Skip guardian set index
    offset += 4;

    // Get signature count and skip signatures
    const sigCount = vaaBytes[offset];
    offset += 1 + sigCount * 66;

    // Skip timestamp, nonce
    offset += 8;

    // Emitter chain (2 bytes, big endian)
    const emitterChain = view.getUint16(offset, false);
    offset += 2;

    // Emitter address (32 bytes)
    const emitterAddress = Buffer.from(vaaBytes.slice(offset, offset + 32)).toString('hex');
    offset += 32;

    // Sequence (8 bytes, big endian)
    const sequenceHigh = view.getUint32(offset, false);
    const sequenceLow = view.getUint32(offset + 4, false);
    const sequence = BigInt(sequenceHigh) * BigInt(2 ** 32) + BigInt(sequenceLow);
    offset += 8;

    // Skip consistency level
    offset += 1;

    // Payload is the rest
    const payload = vaaBytes.slice(offset);

    return {
      emitterChain,
      emitterAddress,
      sequence,
      payload,
    };
  }
}

/**
 * Create Wormhole bridge instance
 */
export function createWormholeBridge(testnet = false): WormholeBridge {
  return new WormholeBridge(testnet);
}

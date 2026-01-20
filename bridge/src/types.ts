import { PublicKey } from '@solana/web3.js';

export enum Chain {
  SOLANA = 'solana',
  ETHEREUM = 'ethereum',
  BASE = 'base',
  ARBITRUM = 'arbitrum',
  POLYGON = 'polygon',
  LUX = 'lux',
  BITCOIN = 'bitcoin',
}

export enum BridgeProtocol {
  WORMHOLE = 'wormhole',
  LUX_BRIDGE = 'lux_bridge',
  ZEUS_NETWORK = 'zeus_network',
}

export interface ChainConfig {
  chain: Chain;
  chainId: number;
  wormholeChainId?: number;
  rpcUrl: string;
  tokenAddress: string;
  bridgeAddress?: string;
  explorerUrl: string;
  decimals: number;
  isEVM: boolean;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface BridgeQuote {
  sourceChain: Chain;
  targetChain: Chain;
  inputAmount: bigint;
  estimatedOutput: bigint;
  fee: bigint;
  feeToken: string;
  estimatedTime: number; // seconds
  route: BridgeRoute[];
  protocol: BridgeProtocol;
}

export interface BridgeRoute {
  from: Chain;
  to: Chain;
  protocol: BridgeProtocol;
  estimatedTime: number;
}

export interface TransferParams {
  amount: string | bigint;
  recipient: string;
  slippage?: number; // basis points
  deadline?: number; // unix timestamp
}

export interface TransferResult {
  id: string;
  sourceChain: Chain;
  targetChain: Chain;
  sourceTxHash: string;
  amount: bigint;
  recipient: string;
  status: TransferStatus;
  timestamp: number;
}

export enum TransferStatus {
  PENDING = 'pending',
  SOURCE_CONFIRMED = 'source_confirmed',
  ATTESTED = 'attested',
  REDEEMABLE = 'redeemable',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface TransferStatusResult {
  id: string;
  status: TransferStatus;
  sourceChain: Chain;
  targetChain: Chain;
  sourceTxHash: string;
  targetTxHash?: string;
  vaaBytes?: Uint8Array;
  error?: string;
}

export interface WormholeVAA {
  bytes: Uint8Array;
  sequence: bigint;
  emitterChain: number;
  emitterAddress: string;
}

export interface BridgeClientConfig {
  sourceChain: Chain;
  targetChain: Chain;
  rpcUrls?: Partial<Record<Chain, string>>;
}

// Solana-specific types
export interface SolanaTransferParams extends TransferParams {
  fromTokenAccount?: PublicKey;
}

// EVM-specific types
export interface EVMTransferParams extends TransferParams {
  gasLimit?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
}

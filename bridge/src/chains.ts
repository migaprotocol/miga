import { Chain, ChainConfig } from './types';

/**
 * Wormhole chain IDs
 * https://docs.wormhole.com/wormhole/reference/constants
 */
export const WORMHOLE_CHAIN_IDS: Partial<Record<Chain, number>> = {
  [Chain.SOLANA]: 1,
  [Chain.ETHEREUM]: 2,
  [Chain.POLYGON]: 5,
  [Chain.ARBITRUM]: 23,
  [Chain.BASE]: 30,
  // Lux and Bitcoin not natively supported by Wormhole
};

/**
 * Chain configurations for mainnet
 */
export const MAINNET_CHAINS: Record<Chain, ChainConfig> = {
  [Chain.SOLANA]: {
    chain: Chain.SOLANA,
    chainId: 101, // Solana mainnet
    wormholeChainId: 1,
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    tokenAddress: 'MiGAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    bridgeAddress: 'worm2ZoG2kUd4vFXhvjh93UUH596ayRfgQ2MgjNMTth',
    explorerUrl: 'https://solscan.io',
    decimals: 9,
    isEVM: false,
    nativeCurrency: { name: 'Solana', symbol: 'SOL', decimals: 9 },
  },
  [Chain.ETHEREUM]: {
    chain: Chain.ETHEREUM,
    chainId: 1,
    wormholeChainId: 2,
    rpcUrl: 'https://eth.llamarpc.com',
    tokenAddress: '0x0000000000000000000000000000000000000000', // TBD
    bridgeAddress: '0x3ee18B2214AFF97000D974cf647E7C347E8fa585',
    explorerUrl: 'https://etherscan.io',
    decimals: 18,
    isEVM: true,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [Chain.BASE]: {
    chain: Chain.BASE,
    chainId: 8453,
    wormholeChainId: 30,
    rpcUrl: 'https://mainnet.base.org',
    tokenAddress: '0x0000000000000000000000000000000000000000', // TBD
    bridgeAddress: '0x8d2de8d2f73F1F4cAB472AC9A881C9b123C79627',
    explorerUrl: 'https://basescan.org',
    decimals: 18,
    isEVM: true,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [Chain.ARBITRUM]: {
    chain: Chain.ARBITRUM,
    chainId: 42161,
    wormholeChainId: 23,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    tokenAddress: '0x0000000000000000000000000000000000000000', // TBD
    bridgeAddress: '0x0b2402144Bb366A632D14B83F244D2e0e21bD39c',
    explorerUrl: 'https://arbiscan.io',
    decimals: 18,
    isEVM: true,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [Chain.POLYGON]: {
    chain: Chain.POLYGON,
    chainId: 137,
    wormholeChainId: 5,
    rpcUrl: 'https://polygon-rpc.com',
    tokenAddress: '0x0000000000000000000000000000000000000000', // TBD
    bridgeAddress: '0x5a58505a96D1dbf8dF91cB21B54419FC36e93fdE',
    explorerUrl: 'https://polygonscan.com',
    decimals: 18,
    isEVM: true,
    nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
  },
  [Chain.LUX]: {
    chain: Chain.LUX,
    chainId: 96369, // Lux mainnet
    rpcUrl: 'https://api.lux.network/rpc',
    tokenAddress: '0x0000000000000000000000000000000000000000', // TBD
    bridgeAddress: '0x0000000000000000000000000000000000000000', // Lux Bridge
    explorerUrl: 'https://explore.lux.network',
    decimals: 18,
    isEVM: true,
    nativeCurrency: { name: 'Lux', symbol: 'LUX', decimals: 18 },
  },
  [Chain.BITCOIN]: {
    chain: Chain.BITCOIN,
    chainId: 0, // Bitcoin doesn't have EVM chain ID
    rpcUrl: '', // Uses Zeus Network
    tokenAddress: '', // Runes inscription ID
    explorerUrl: 'https://mempool.space',
    decimals: 8,
    isEVM: false,
    nativeCurrency: { name: 'Bitcoin', symbol: 'BTC', decimals: 8 },
  },
};

/**
 * Chain configurations for testnet/devnet
 */
export const TESTNET_CHAINS: Record<Chain, ChainConfig> = {
  [Chain.SOLANA]: {
    ...MAINNET_CHAINS[Chain.SOLANA],
    chainId: 102, // Solana devnet
    rpcUrl: 'https://api.devnet.solana.com',
    explorerUrl: 'https://solscan.io?cluster=devnet',
  },
  [Chain.ETHEREUM]: {
    ...MAINNET_CHAINS[Chain.ETHEREUM],
    chainId: 11155111, // Sepolia
    rpcUrl: 'https://rpc.sepolia.org',
    explorerUrl: 'https://sepolia.etherscan.io',
  },
  [Chain.BASE]: {
    ...MAINNET_CHAINS[Chain.BASE],
    chainId: 84532, // Base Sepolia
    rpcUrl: 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
  },
  [Chain.ARBITRUM]: {
    ...MAINNET_CHAINS[Chain.ARBITRUM],
    chainId: 421614, // Arbitrum Sepolia
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
    explorerUrl: 'https://sepolia.arbiscan.io',
  },
  [Chain.POLYGON]: {
    ...MAINNET_CHAINS[Chain.POLYGON],
    chainId: 80002, // Polygon Amoy
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    explorerUrl: 'https://amoy.polygonscan.com',
  },
  [Chain.LUX]: {
    ...MAINNET_CHAINS[Chain.LUX],
    chainId: 96368, // Lux testnet
    rpcUrl: 'https://api.lux-test.network/rpc',
    explorerUrl: 'https://explore.lux-test.network',
  },
  [Chain.BITCOIN]: {
    ...MAINNET_CHAINS[Chain.BITCOIN],
    rpcUrl: '', // Bitcoin testnet via Zeus
    explorerUrl: 'https://mempool.space/testnet',
  },
};

/**
 * Get chain config
 */
export function getChainConfig(chain: Chain, testnet = false): ChainConfig {
  return testnet ? TESTNET_CHAINS[chain] : MAINNET_CHAINS[chain];
}

/**
 * Check if chain is EVM compatible
 */
export function isEVMChain(chain: Chain): boolean {
  return MAINNET_CHAINS[chain].isEVM;
}

/**
 * Check if chain is supported by Wormhole natively
 */
export function isWormholeSupported(chain: Chain): boolean {
  return chain in WORMHOLE_CHAIN_IDS;
}

/**
 * Get optimal bridge route between chains
 */
export function getBridgeRoute(source: Chain, target: Chain): Chain[] {
  // Direct Wormhole route
  if (isWormholeSupported(source) && isWormholeSupported(target)) {
    return [source, target];
  }

  // Lux requires hop through Ethereum
  if (target === Chain.LUX && source !== Chain.ETHEREUM) {
    if (isWormholeSupported(source)) {
      return [source, Chain.ETHEREUM, Chain.LUX];
    }
  }

  if (source === Chain.LUX && target !== Chain.ETHEREUM) {
    if (isWormholeSupported(target)) {
      return [Chain.LUX, Chain.ETHEREUM, target];
    }
  }

  // Bitcoin requires special handling via Zeus Network
  if (source === Chain.BITCOIN || target === Chain.BITCOIN) {
    // Route through Solana (Zeus Network)
    if (source === Chain.BITCOIN) {
      return [Chain.BITCOIN, Chain.SOLANA, target];
    } else {
      return [source, Chain.SOLANA, Chain.BITCOIN];
    }
  }

  // Fallback - shouldn't reach here
  return [source, target];
}

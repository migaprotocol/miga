import { Chain } from './types';

/**
 * MIGA Token addresses per chain
 */
export const MIGA_TOKEN_ADDRESSES: Record<Chain, string> = {
  [Chain.SOLANA]: 'MiGAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  [Chain.ETHEREUM]: '0x0000000000000000000000000000000000000000', // TBD after deployment
  [Chain.BASE]: '0x0000000000000000000000000000000000000000',
  [Chain.ARBITRUM]: '0x0000000000000000000000000000000000000000',
  [Chain.POLYGON]: '0x0000000000000000000000000000000000000000',
  [Chain.LUX]: '0x0000000000000000000000000000000000000000',
  [Chain.BITCOIN]: '', // Runes inscription ID
};

/**
 * Wormhole contract addresses
 */
export const WORMHOLE_ADDRESSES = {
  // Core bridge
  SOLANA_CORE: 'worm2ZoG2kUd4vFXhvjh93UUH596ayRfgQ2MgjNMTth',
  ETH_CORE: '0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B',
  BASE_CORE: '0xbebdb6C8ddC678FfA9f8748f85C815C556Dd8ac6',
  ARBITRUM_CORE: '0xa5f208e072434bC67592E4C49C1B991BA79BCA46',
  POLYGON_CORE: '0x7A4B5a56256163F07b2C80A7cA55aBE66c4ec4d7',

  // Token bridge
  SOLANA_TOKEN_BRIDGE: 'wormDTUJ6AWPNvk59vGQbDvGJmqbDTdgWgAqcLBCgUb',
  ETH_TOKEN_BRIDGE: '0x3ee18B2214AFF97000D974cf647E7C347E8fa585',
  BASE_TOKEN_BRIDGE: '0x8d2de8d2f73F1F4cAB472AC9A881C9b123C79627',
  ARBITRUM_TOKEN_BRIDGE: '0x0b2402144Bb366A632D14B83F244D2e0e21bD39c',
  POLYGON_TOKEN_BRIDGE: '0x5a58505a96D1dbf8dF91cB21B54419FC36e93fdE',
};

/**
 * Wormhole Guardian RPC hosts
 */
export const WORMHOLE_RPC_HOSTS = [
  'https://wormhole-v2-mainnet-api.certus.one',
  'https://wormhole.inotel.ro',
  'https://wormhole-v2-mainnet-api.mcf.rocks',
  'https://wormhole-v2-mainnet-api.chainlayer.network',
  'https://wormhole-v2-mainnet-api.staking.fund',
];

/**
 * Lux Bridge addresses
 */
export const LUX_BRIDGE_ADDRESSES = {
  ETHEREUM_GATEWAY: '0x0000000000000000000000000000000000000000', // TBD
  LUX_GATEWAY: '0x0000000000000000000000000000000000000000', // TBD
};

/**
 * Bridge fee configuration (basis points)
 */
export const BRIDGE_FEES = {
  WORMHOLE: 0, // Wormhole doesn't charge protocol fees
  LUX_BRIDGE: 10, // 0.1%
  ZEUS_NETWORK: 25, // 0.25%
};

/**
 * Estimated bridge times (seconds)
 */
export const BRIDGE_TIMES = {
  WORMHOLE_SOLANA_TO_EVM: 60 * 15, // ~15 minutes
  WORMHOLE_EVM_TO_SOLANA: 60 * 15,
  WORMHOLE_EVM_TO_EVM: 60 * 20, // ~20 minutes
  LUX_BRIDGE: 60 * 10, // ~10 minutes
  ZEUS_NETWORK: 60 * 60, // ~1 hour (Bitcoin finality)
};

/**
 * Token decimals per chain
 */
export const TOKEN_DECIMALS: Record<Chain, number> = {
  [Chain.SOLANA]: 9,
  [Chain.ETHEREUM]: 18,
  [Chain.BASE]: 18,
  [Chain.ARBITRUM]: 18,
  [Chain.POLYGON]: 18,
  [Chain.LUX]: 18,
  [Chain.BITCOIN]: 8,
};

/**
 * Minimum bridge amounts (in smallest units)
 */
export const MIN_BRIDGE_AMOUNTS: Record<Chain, bigint> = {
  [Chain.SOLANA]: BigInt(1_000_000_000), // 1 MIGA
  [Chain.ETHEREUM]: BigInt('1000000000000000000'), // 1 MIGA
  [Chain.BASE]: BigInt('1000000000000000000'),
  [Chain.ARBITRUM]: BigInt('1000000000000000000'),
  [Chain.POLYGON]: BigInt('1000000000000000000'),
  [Chain.LUX]: BigInt('1000000000000000000'),
  [Chain.BITCOIN]: BigInt(100_000_000), // 1 MIGA (8 decimals)
};

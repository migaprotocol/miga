/**
 * @miga/bridge - Multi-chain bridge SDK
 *
 * Supports bridging MIGA tokens across 7 blockchains:
 * - Solana (native SPL)
 * - Ethereum (Wormhole wrapped)
 * - Base (Wormhole wrapped)
 * - Arbitrum (Wormhole wrapped)
 * - Polygon (Wormhole wrapped)
 * - Lux (Lux Bridge wrapped)
 * - Bitcoin (Zeus Network - planned)
 */

export * from './types';
export * from './chains';
export * from './wormhole';
export * from './client';
export * from './constants';

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MigaToken
 * @notice ERC-20 MIGA token for EVM chains (wrapped from Solana via Wormhole)
 * @dev Deployed on: Ethereum, Base, Arbitrum, Polygon, Lux
 *
 * Features:
 * - ERC20Votes for governance
 * - ERC20Permit for gasless approvals
 * - Bridgeable (crosschainMint/crosschainBurn)
 * - Pausable for emergencies
 */
contract MigaToken is
    ERC20,
    ERC20Burnable,
    ERC20Pausable,
    ERC20Permit,
    ERC20Votes,
    Ownable,
    ReentrancyGuard
{
    /// @notice Bridge address (Wormhole Token Bridge or Lux Bridge)
    address public bridge;

    /// @notice Total supply cap (matches Solana supply)
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;

    /// @notice Events
    event BridgeUpdated(address indexed oldBridge, address indexed newBridge);
    event CrosschainMint(address indexed to, uint256 amount);
    event CrosschainBurn(address indexed from, uint256 amount);

    /// @notice Errors
    error NotBridge();
    error ExceedsMaxSupply();
    error ZeroAddress();

    modifier onlyBridge() {
        if (msg.sender != bridge) revert NotBridge();
        _;
    }

    constructor(address _bridge)
        ERC20("MIGA", "MIGA")
        ERC20Permit("MIGA")
        Ownable(msg.sender)
    {
        if (_bridge == address(0)) revert ZeroAddress();
        bridge = _bridge;
    }

    // ============ Bridge Functions ============

    /**
     * @notice Mint tokens when bridged from Solana
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function crosschainMint(address to, uint256 amount)
        external
        onlyBridge
        nonReentrant
    {
        if (totalSupply() + amount > MAX_SUPPLY) revert ExceedsMaxSupply();
        _mint(to, amount);
        emit CrosschainMint(to, amount);
    }

    /**
     * @notice Burn tokens when bridging back to Solana
     * @param from Address to burn from
     * @param amount Amount to burn
     */
    function crosschainBurn(address from, uint256 amount)
        external
        onlyBridge
        nonReentrant
    {
        _burn(from, amount);
        emit CrosschainBurn(from, amount);
    }

    // ============ Admin Functions ============

    /**
     * @notice Update bridge address
     * @param newBridge New bridge contract address
     */
    function setBridge(address newBridge) external onlyOwner {
        if (newBridge == address(0)) revert ZeroAddress();
        address oldBridge = bridge;
        bridge = newBridge;
        emit BridgeUpdated(oldBridge, newBridge);
    }

    /**
     * @notice Pause all transfers
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    // ============ Required Overrides ============

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}

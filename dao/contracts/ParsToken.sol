// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ParsToken
 * @notice PARS emission token for MIGA governance
 * @dev Unlimited supply, minted by GaugeController based on gauge votes
 *
 * Token Flow:
 * 1. GaugeController mints PARS to gauges (chapters, liquidity, grants)
 * 2. Users lock PARS + MIGA to get vePARS
 * 3. vePARS holders vote on gauge weights
 * 4. Emissions flow to voted gauges
 */
contract ParsToken is ERC20, ERC20Burnable, Ownable {
    /// @notice Minter addresses (GaugeController, initial distributor)
    mapping(address => bool) public minters;

    /// @notice Initial emission rate: 1M PARS per week
    uint256 public constant INITIAL_RATE = 1_000_000 * 10**18;

    /// @notice Rate decay: 1% per week
    uint256 public constant RATE_DECAY = 99; // 99/100 = 1% decay
    uint256 public constant RATE_DENOMINATOR = 100;

    /// @notice Emission tracking
    uint256 public emissionRate;
    uint256 public lastEmissionTime;
    uint256 public totalEmitted;

    /// @notice Events
    event MinterUpdated(address indexed minter, bool status);
    event EmissionRateUpdated(uint256 newRate);
    event Minted(address indexed to, uint256 amount);

    /// @notice Errors
    error NotMinter();
    error ZeroAddress();
    error ZeroAmount();

    modifier onlyMinter() {
        if (!minters[msg.sender]) revert NotMinter();
        _;
    }

    constructor() ERC20("PARS", "PARS") Ownable(msg.sender) {
        emissionRate = INITIAL_RATE;
        lastEmissionTime = block.timestamp;

        // Owner is initial minter
        minters[msg.sender] = true;
    }

    // ============ Minting ============

    /**
     * @notice Mint PARS tokens
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyMinter {
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();

        _mint(to, amount);
        totalEmitted += amount;

        emit Minted(to, amount);
    }

    /**
     * @notice Get available emissions for this epoch
     * @return Available PARS to emit
     */
    function availableEmission() public view returns (uint256) {
        uint256 timeSinceLastEmission = block.timestamp - lastEmissionTime;
        uint256 weeksElapsed = timeSinceLastEmission / 1 weeks;

        if (weeksElapsed == 0) {
            return (emissionRate * timeSinceLastEmission) / 1 weeks;
        }

        // Calculate decayed rate for multiple weeks
        uint256 totalAvailable = 0;
        uint256 currentRate = emissionRate;

        for (uint256 i = 0; i < weeksElapsed && i < 52; i++) {
            totalAvailable += currentRate;
            currentRate = (currentRate * RATE_DECAY) / RATE_DENOMINATOR;
        }

        // Add partial week
        uint256 partialWeek = timeSinceLastEmission % 1 weeks;
        totalAvailable += (currentRate * partialWeek) / 1 weeks;

        return totalAvailable;
    }

    /**
     * @notice Update emission rate (called by GaugeController)
     */
    function updateEmissionRate() external onlyMinter {
        uint256 weeksElapsed = (block.timestamp - lastEmissionTime) / 1 weeks;

        if (weeksElapsed > 0) {
            // Apply decay
            for (uint256 i = 0; i < weeksElapsed && i < 52; i++) {
                emissionRate = (emissionRate * RATE_DECAY) / RATE_DENOMINATOR;
            }
            lastEmissionTime = block.timestamp;
            emit EmissionRateUpdated(emissionRate);
        }
    }

    // ============ Admin ============

    /**
     * @notice Set minter status
     * @param minter Address to update
     * @param status Whether address can mint
     */
    function setMinter(address minter, bool status) external onlyOwner {
        if (minter == address(0)) revert ZeroAddress();
        minters[minter] = status;
        emit MinterUpdated(minter, status);
    }
}

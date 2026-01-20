// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VePars
 * @notice Vote-escrowed PARS for MIGA governance
 * @dev Lock PARS + MIGA together to receive voting power
 *
 * Formula: vePARS = min(PARS, MIGA) × sqrt(lock_duration / max_duration)
 *
 * This enforces:
 * 1. Balance: Need both tokens (whales without MIGA cannot dominate)
 * 2. Commitment: Longer locks earn more power
 * 3. Diminishing Returns: Square root prevents capture
 */
contract VePars is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    /// @notice Token addresses
    IERC20 public immutable pars;
    IERC20 public immutable miga;

    /// @notice Lock duration limits
    uint256 public constant MIN_LOCK_DURATION = 1 weeks;
    uint256 public constant MAX_LOCK_DURATION = 4 * 365 days; // 4 years

    /// @notice Per-position cap: 1% of total vePARS
    uint256 public constant POSITION_CAP_BPS = 100; // 1%

    /// @notice Per-wallet cap: 5% of total vePARS
    uint256 public constant WALLET_CAP_BPS = 500; // 5%

    /// @notice Lock structure
    struct Lock {
        uint256 parsAmount;
        uint256 migaAmount;
        uint256 unlockTime;
        uint256 votingPower;
    }

    /// @notice User locks
    mapping(address => Lock[]) public userLocks;

    /// @notice Total voting power
    uint256 public totalVotingPower;

    /// @notice User total voting power
    mapping(address => uint256) public userVotingPower;

    /// @notice Events
    event Locked(
        address indexed user,
        uint256 indexed lockIndex,
        uint256 parsAmount,
        uint256 migaAmount,
        uint256 unlockTime,
        uint256 votingPower
    );
    event Unlocked(
        address indexed user,
        uint256 indexed lockIndex,
        uint256 parsAmount,
        uint256 migaAmount
    );
    event ExtendedLock(
        address indexed user,
        uint256 indexed lockIndex,
        uint256 newUnlockTime,
        uint256 newVotingPower
    );

    /// @notice Errors
    error InvalidDuration();
    error InvalidAmount();
    error LockNotExpired();
    error LockNotFound();
    error ExceedsPositionCap();
    error ExceedsWalletCap();

    constructor(address _pars, address _miga) Ownable(msg.sender) {
        pars = IERC20(_pars);
        miga = IERC20(_miga);
    }

    // ============ Lock Functions ============

    /**
     * @notice Create a new lock
     * @param parsAmount Amount of PARS to lock
     * @param migaAmount Amount of MIGA to lock
     * @param duration Lock duration in seconds
     */
    function createLock(
        uint256 parsAmount,
        uint256 migaAmount,
        uint256 duration
    ) external nonReentrant returns (uint256 lockIndex) {
        if (duration < MIN_LOCK_DURATION || duration > MAX_LOCK_DURATION) {
            revert InvalidDuration();
        }
        if (parsAmount == 0 || migaAmount == 0) {
            revert InvalidAmount();
        }

        uint256 unlockTime = block.timestamp + duration;
        uint256 votingPower = _calculateVotingPower(parsAmount, migaAmount, duration);

        // Check caps
        if (votingPower > (totalVotingPower * POSITION_CAP_BPS) / 10000 && totalVotingPower > 0) {
            revert ExceedsPositionCap();
        }
        if (userVotingPower[msg.sender] + votingPower > (totalVotingPower * WALLET_CAP_BPS) / 10000 && totalVotingPower > 0) {
            revert ExceedsWalletCap();
        }

        // Transfer tokens
        pars.safeTransferFrom(msg.sender, address(this), parsAmount);
        miga.safeTransferFrom(msg.sender, address(this), migaAmount);

        // Create lock
        lockIndex = userLocks[msg.sender].length;
        userLocks[msg.sender].push(Lock({
            parsAmount: parsAmount,
            migaAmount: migaAmount,
            unlockTime: unlockTime,
            votingPower: votingPower
        }));

        // Update totals
        totalVotingPower += votingPower;
        userVotingPower[msg.sender] += votingPower;

        emit Locked(msg.sender, lockIndex, parsAmount, migaAmount, unlockTime, votingPower);
    }

    /**
     * @notice Extend an existing lock
     * @param lockIndex Index of the lock to extend
     * @param additionalDuration Additional time to add
     */
    function extendLock(uint256 lockIndex, uint256 additionalDuration) external nonReentrant {
        if (lockIndex >= userLocks[msg.sender].length) revert LockNotFound();

        Lock storage lock = userLocks[msg.sender][lockIndex];
        uint256 newUnlockTime = lock.unlockTime + additionalDuration;
        uint256 newDuration = newUnlockTime - block.timestamp;

        if (newDuration > MAX_LOCK_DURATION) revert InvalidDuration();

        uint256 oldVotingPower = lock.votingPower;
        uint256 newVotingPower = _calculateVotingPower(
            lock.parsAmount,
            lock.migaAmount,
            newDuration
        );

        // Update lock
        lock.unlockTime = newUnlockTime;
        lock.votingPower = newVotingPower;

        // Update totals
        totalVotingPower = totalVotingPower - oldVotingPower + newVotingPower;
        userVotingPower[msg.sender] = userVotingPower[msg.sender] - oldVotingPower + newVotingPower;

        emit ExtendedLock(msg.sender, lockIndex, newUnlockTime, newVotingPower);
    }

    /**
     * @notice Withdraw tokens from an expired lock
     * @param lockIndex Index of the lock to withdraw
     */
    function withdraw(uint256 lockIndex) external nonReentrant {
        if (lockIndex >= userLocks[msg.sender].length) revert LockNotFound();

        Lock storage lock = userLocks[msg.sender][lockIndex];
        if (block.timestamp < lock.unlockTime) revert LockNotExpired();

        uint256 parsAmount = lock.parsAmount;
        uint256 migaAmount = lock.migaAmount;
        uint256 votingPower = lock.votingPower;

        // Clear lock
        delete userLocks[msg.sender][lockIndex];

        // Update totals
        totalVotingPower -= votingPower;
        userVotingPower[msg.sender] -= votingPower;

        // Transfer tokens back
        pars.safeTransfer(msg.sender, parsAmount);
        miga.safeTransfer(msg.sender, migaAmount);

        emit Unlocked(msg.sender, lockIndex, parsAmount, migaAmount);
    }

    // ============ View Functions ============

    /**
     * @notice Get voting power for an amount and duration
     * @param parsAmount PARS amount
     * @param migaAmount MIGA amount
     * @param duration Lock duration
     * @return Voting power
     */
    function calculateVotingPower(
        uint256 parsAmount,
        uint256 migaAmount,
        uint256 duration
    ) external pure returns (uint256) {
        return _calculateVotingPower(parsAmount, migaAmount, duration);
    }

    /**
     * @notice Get all locks for a user
     * @param user User address
     * @return Array of locks
     */
    function getUserLocks(address user) external view returns (Lock[] memory) {
        return userLocks[user];
    }

    /**
     * @notice Get active voting power (accounting for expired locks)
     * @param user User address
     * @return Active voting power
     */
    function getActiveVotingPower(address user) external view returns (uint256) {
        uint256 activePower = 0;
        Lock[] storage locks = userLocks[user];

        for (uint256 i = 0; i < locks.length; i++) {
            if (locks[i].unlockTime > block.timestamp) {
                activePower += locks[i].votingPower;
            }
        }

        return activePower;
    }

    // ============ Internal Functions ============

    /**
     * @notice Calculate voting power
     * @dev vePARS = min(PARS, MIGA) × sqrt(duration / maxDuration)
     */
    function _calculateVotingPower(
        uint256 parsAmount,
        uint256 migaAmount,
        uint256 duration
    ) internal pure returns (uint256) {
        uint256 minAmount = parsAmount < migaAmount ? parsAmount : migaAmount;

        // sqrt(duration / maxDuration) with fixed point math
        // Scale by 1e18 for precision
        uint256 durationRatio = (duration * 1e18) / MAX_LOCK_DURATION;
        uint256 sqrtRatio = _sqrt(durationRatio * 1e18);

        return (minAmount * sqrtRatio) / 1e18;
    }

    /**
     * @notice Babylonian square root
     */
    function _sqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;

        uint256 z = (x + 1) / 2;
        uint256 y = x;

        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }

        return y;
    }
}

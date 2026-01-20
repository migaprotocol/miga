// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title DaoVault
 * @notice ERC-4626 vault for MIGA DAO treasury management
 * @dev Each of the 10 DAOs has its own vault with specialized strategies
 *
 * DAOs:
 * 1. AMN (Security) - Stablecoin-only
 * 2. KHAZ (Treasury) - Diversified reserves
 * 3. DAD (Governance) - Minimal holdings
 * 4. SAL (Health) - Stablecoin + yield
 * 5. FARH (Culture) - Creator grants
 * 6. DAN (Research) - Research grants
 * 7. SAZ (Infrastructure) - Procurement
 * 8. PAY (Consular) - Coordination
 * 9. WAQF (Endowment) - Long-horizon venture
 * 10. MIZ (Integrity) - Impact audits
 */
contract DaoVault is ERC4626, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @notice DAO identifier
    string public daoSymbol;
    string public daoPersianName;

    /// @notice Domain this DAO covers
    string public domain;

    /// @notice Strategy constraints
    uint256 public maxDeposit;
    uint256 public minDeposit;

    /// @notice Fee configuration (basis points)
    uint256 public depositFeeBps;
    uint256 public withdrawFeeBps;
    uint256 public constant MAX_FEE = 500; // 5% max

    /// @notice Fee recipient (treasury)
    address public feeRecipient;

    /// @notice Allowed asset whitelist
    mapping(address => bool) public allowedAssets;

    /// @notice Pause state
    bool public paused;

    /// @notice Events
    event DepositFeeUpdated(uint256 newFee);
    event WithdrawFeeUpdated(uint256 newFee);
    event FeeRecipientUpdated(address newRecipient);
    event AssetAllowed(address asset, bool allowed);
    event Paused(bool isPaused);
    event MaxDepositUpdated(uint256 newMax);

    /// @notice Errors
    error VaultPaused();
    error BelowMinDeposit();
    error ExceedsMaxDeposit();
    error AssetNotAllowed();
    error FeeTooHigh();
    error ZeroAddress();

    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol,
        string memory _daoSymbol,
        string memory _daoPersianName,
        string memory _domain,
        address _feeRecipient
    )
        ERC4626(_asset)
        ERC20(_name, _symbol)
        Ownable(msg.sender)
    {
        daoSymbol = _daoSymbol;
        daoPersianName = _daoPersianName;
        domain = _domain;
        feeRecipient = _feeRecipient;

        // Default constraints
        maxDeposit = type(uint256).max;
        minDeposit = 0;
        depositFeeBps = 0;
        withdrawFeeBps = 0;

        // Allow the base asset by default
        allowedAssets[address(_asset)] = true;
    }

    // ============ Modifiers ============

    modifier whenNotPaused() {
        if (paused) revert VaultPaused();
        _;
    }

    // ============ Deposit/Withdraw Overrides ============

    function deposit(uint256 assets, address receiver)
        public
        virtual
        override
        whenNotPaused
        nonReentrant
        returns (uint256)
    {
        if (assets < minDeposit) revert BelowMinDeposit();
        if (assets > maxDeposit) revert ExceedsMaxDeposit();

        uint256 fee = (assets * depositFeeBps) / 10000;
        uint256 assetsAfterFee = assets - fee;

        if (fee > 0) {
            IERC20(asset()).safeTransferFrom(msg.sender, feeRecipient, fee);
        }

        return super.deposit(assetsAfterFee, receiver);
    }

    function withdraw(uint256 assets, address receiver, address owner)
        public
        virtual
        override
        whenNotPaused
        nonReentrant
        returns (uint256)
    {
        uint256 fee = (assets * withdrawFeeBps) / 10000;
        uint256 assetsAfterFee = assets - fee;

        uint256 shares = super.withdraw(assets, address(this), owner);

        if (fee > 0) {
            IERC20(asset()).safeTransfer(feeRecipient, fee);
        }
        IERC20(asset()).safeTransfer(receiver, assetsAfterFee);

        return shares;
    }

    // ============ Admin Functions ============

    function setDepositFee(uint256 _feeBps) external onlyOwner {
        if (_feeBps > MAX_FEE) revert FeeTooHigh();
        depositFeeBps = _feeBps;
        emit DepositFeeUpdated(_feeBps);
    }

    function setWithdrawFee(uint256 _feeBps) external onlyOwner {
        if (_feeBps > MAX_FEE) revert FeeTooHigh();
        withdrawFeeBps = _feeBps;
        emit WithdrawFeeUpdated(_feeBps);
    }

    function setFeeRecipient(address _recipient) external onlyOwner {
        if (_recipient == address(0)) revert ZeroAddress();
        feeRecipient = _recipient;
        emit FeeRecipientUpdated(_recipient);
    }

    function setAllowedAsset(address _asset, bool _allowed) external onlyOwner {
        allowedAssets[_asset] = _allowed;
        emit AssetAllowed(_asset, _allowed);
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit Paused(_paused);
    }

    function setMaxDeposit(uint256 _maxDeposit) external onlyOwner {
        maxDeposit = _maxDeposit;
        emit MaxDepositUpdated(_maxDeposit);
    }

    function setMinDeposit(uint256 _minDeposit) external onlyOwner {
        minDeposit = _minDeposit;
    }

    // ============ View Functions ============

    function getDaoInfo() external view returns (
        string memory symbol,
        string memory persianName,
        string memory domainName,
        uint256 totalAssets_,
        uint256 totalSupply_
    ) {
        return (
            daoSymbol,
            daoPersianName,
            domain,
            totalAssets(),
            totalSupply()
        );
    }
}

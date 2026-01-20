use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{self, Mint, TokenAccount, TokenInterface, TransferChecked},
};

declare_id!("MiGAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

/// MIGA Token Program - Modern Solana Standards (Anchor 0.30+)
///
/// Tokenomics:
/// - Total Supply: 1,000,000,000 (1 billion)
/// - 10% (100M) → Meteora DLMM LP
/// - 40% (400M) → One-sided bonding curve
/// - 50% (500M) → Treasury (DAO-governed)
#[program]
pub mod miga {
    use super::*;

    /// Initialize the MIGA protocol
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let config = &mut ctx.accounts.config;

        config.authority = ctx.accounts.authority.key();
        config.mint = ctx.accounts.mint.key();
        config.treasury = ctx.accounts.treasury.key();
        config.bonding_curve_vault = ctx.accounts.bonding_curve_vault.key();
        config.lp_vault = ctx.accounts.lp_vault.key();
        config.bump = ctx.bumps.config;
        config.tokens_sold = 0;
        config.sol_raised = 0;
        config.sale_active = true;
        config.initialized_at = Clock::get()?.unix_timestamp;

        emit!(InitializeEvent {
            authority: config.authority,
            mint: config.mint,
            treasury: config.treasury,
            timestamp: config.initialized_at,
        });

        Ok(())
    }

    /// Buy tokens from the bonding curve
    pub fn buy(ctx: Context<Buy>, sol_amount: u64, min_tokens_out: u64) -> Result<()> {
        let config = &mut ctx.accounts.config;

        require!(config.sale_active, MigaError::SaleNotActive);
        require!(sol_amount > 0, MigaError::InvalidAmount);
        require!(
            config.tokens_sold < BONDING_CURVE_SUPPLY,
            MigaError::SaleComplete
        );

        // Calculate tokens based on bonding curve
        let tokens_out = calculate_tokens_for_sol(config.tokens_sold, sol_amount)?;

        require!(tokens_out >= min_tokens_out, MigaError::SlippageExceeded);
        require!(
            config
                .tokens_sold
                .checked_add(tokens_out)
                .ok_or(MigaError::Overflow)?
                <= BONDING_CURVE_SUPPLY,
            MigaError::ExceedsSupply
        );

        // Transfer SOL from buyer to treasury
        anchor_lang::system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.buyer.to_account_info(),
                    to: ctx.accounts.treasury.to_account_info(),
                },
            ),
            sol_amount,
        )?;

        // Transfer tokens from bonding curve vault to buyer
        let seeds = &[b"config".as_ref(), &[config.bump]];
        let signer_seeds = &[&seeds[..]];

        token_interface::transfer_checked(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                TransferChecked {
                    from: ctx.accounts.bonding_curve_vault.to_account_info(),
                    to: ctx.accounts.buyer_token_account.to_account_info(),
                    authority: ctx.accounts.config.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                },
                signer_seeds,
            ),
            tokens_out,
            ctx.accounts.mint.decimals,
        )?;

        // Update state
        config.tokens_sold = config
            .tokens_sold
            .checked_add(tokens_out)
            .ok_or(MigaError::Overflow)?;
        config.sol_raised = config
            .sol_raised
            .checked_add(sol_amount)
            .ok_or(MigaError::Overflow)?;

        let current_price = get_current_price(config.tokens_sold);

        emit!(PurchaseEvent {
            buyer: ctx.accounts.buyer.key(),
            sol_amount,
            tokens_received: tokens_out,
            price_per_token: current_price,
            total_sold: config.tokens_sold,
            total_raised: config.sol_raised,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    /// Get current bonding curve price (view function)
    pub fn get_price(ctx: Context<GetPrice>) -> Result<u64> {
        Ok(get_current_price(ctx.accounts.config.tokens_sold))
    }

    /// Get protocol stats
    pub fn get_stats(ctx: Context<GetPrice>) -> Result<Stats> {
        let config = &ctx.accounts.config;
        Ok(Stats {
            tokens_sold: config.tokens_sold,
            sol_raised: config.sol_raised,
            current_price: get_current_price(config.tokens_sold),
            sale_active: config.sale_active,
            remaining_tokens: BONDING_CURVE_SUPPLY.saturating_sub(config.tokens_sold),
            percent_complete: ((config.tokens_sold as u128 * 10000) / BONDING_CURVE_SUPPLY as u128)
                as u16,
        })
    }

    /// Toggle sale status (authority only)
    pub fn toggle_sale(ctx: Context<AdminOnly>) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.sale_active = !config.sale_active;

        emit!(SaleStatusEvent {
            active: config.sale_active,
            authority: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    /// Update treasury address (authority only)
    pub fn update_treasury(ctx: Context<AdminOnly>, new_treasury: Pubkey) -> Result<()> {
        require!(new_treasury != Pubkey::default(), MigaError::InvalidAddress);

        let old_treasury = ctx.accounts.config.treasury;
        ctx.accounts.config.treasury = new_treasury;

        emit!(TreasuryUpdateEvent {
            old_treasury,
            new_treasury,
            authority: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    /// Transfer authority (two-step for safety)
    pub fn transfer_authority(ctx: Context<AdminOnly>, new_authority: Pubkey) -> Result<()> {
        require!(
            new_authority != Pubkey::default(),
            MigaError::InvalidAddress
        );

        ctx.accounts.config.pending_authority = Some(new_authority);

        emit!(AuthorityTransferInitiated {
            current_authority: ctx.accounts.authority.key(),
            pending_authority: new_authority,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    /// Accept authority transfer
    pub fn accept_authority(ctx: Context<AcceptAuthority>) -> Result<()> {
        let config = &mut ctx.accounts.config;

        require!(
            config.pending_authority == Some(ctx.accounts.new_authority.key()),
            MigaError::Unauthorized
        );

        let old_authority = config.authority;
        config.authority = ctx.accounts.new_authority.key();
        config.pending_authority = None;

        emit!(AuthorityTransferCompleted {
            old_authority,
            new_authority: config.authority,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }
}

// ============================================================================
// Constants
// ============================================================================

pub const TOTAL_SUPPLY: u64 = 1_000_000_000 * 10u64.pow(9); // 1B with 9 decimals
pub const LP_SUPPLY: u64 = 100_000_000 * 10u64.pow(9); // 10% = 100M
pub const BONDING_CURVE_SUPPLY: u64 = 400_000_000 * 10u64.pow(9); // 40% = 400M
pub const TREASURY_SUPPLY: u64 = 500_000_000 * 10u64.pow(9); // 50% = 500M

// Bonding curve parameters (in lamports per token * 10^9)
pub const START_PRICE: u64 = 100; // ~0.0000001 SOL per token
pub const END_PRICE: u64 = 10_000; // ~0.00001 SOL per token (100x)

// ============================================================================
// Price Calculation Functions
// ============================================================================

/// Calculate current price based on tokens sold (linear bonding curve)
fn get_current_price(tokens_sold: u64) -> u64 {
    if tokens_sold >= BONDING_CURVE_SUPPLY {
        return END_PRICE;
    }

    let price_range = END_PRICE - START_PRICE;
    let progress = (tokens_sold as u128 * 10000) / BONDING_CURVE_SUPPLY as u128;
    let price_increase = (price_range as u128 * progress) / 10000;

    START_PRICE + price_increase as u64
}

/// Calculate tokens received for a given SOL amount
fn calculate_tokens_for_sol(current_sold: u64, sol_amount: u64) -> Result<u64> {
    let current_price = get_current_price(current_sold);

    // tokens = sol_amount * 10^9 / price
    let tokens = (sol_amount as u128)
        .checked_mul(10u128.pow(9))
        .ok_or(MigaError::Overflow)?
        .checked_div(current_price as u128)
        .ok_or(MigaError::Overflow)?;

    Ok(tokens as u64)
}

// ============================================================================
// Account Structures
// ============================================================================

#[account]
#[derive(InitSpace)]
pub struct Config {
    pub authority: Pubkey,
    pub pending_authority: Option<Pubkey>,
    pub mint: Pubkey,
    pub treasury: Pubkey,
    pub bonding_curve_vault: Pubkey,
    pub lp_vault: Pubkey,
    pub bump: u8,
    pub tokens_sold: u64,
    pub sol_raised: u64,
    pub sale_active: bool,
    pub initialized_at: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct Stats {
    pub tokens_sold: u64,
    pub sol_raised: u64,
    pub current_price: u64,
    pub sale_active: bool,
    pub remaining_tokens: u64,
    pub percent_complete: u16, // basis points (0-10000)
}

// ============================================================================
// Contexts
// ============================================================================

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + Config::INIT_SPACE,
        seeds = [b"config"],
        bump
    )]
    pub config: Account<'info, Config>,

    #[account(mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info, Mint>,

    /// CHECK: Treasury account for receiving SOL
    #[account(mut)]
    pub treasury: AccountInfo<'info>,

    #[account(
        token::mint = mint,
        token::authority = config,
        token::token_program = token_program,
    )]
    pub bonding_curve_vault: InterfaceAccount<'info, TokenAccount>,

    #[account(
        token::mint = mint,
        token::authority = config,
        token::token_program = token_program,
    )]
    pub lp_vault: InterfaceAccount<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
}

#[derive(Accounts)]
pub struct Buy<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(
        mut,
        seeds = [b"config"],
        bump = config.bump
    )]
    pub config: Account<'info, Config>,

    #[account(
        mut,
        token::mint = mint,
        token::authority = config,
        token::token_program = token_program,
    )]
    pub bonding_curve_vault: InterfaceAccount<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = mint,
        associated_token::authority = buyer,
        associated_token::token_program = token_program,
    )]
    pub buyer_token_account: InterfaceAccount<'info, TokenAccount>,

    #[account(mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info, Mint>,

    /// CHECK: Treasury for receiving SOL
    #[account(mut, address = config.treasury)]
    pub treasury: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

#[derive(Accounts)]
pub struct GetPrice<'info> {
    #[account(seeds = [b"config"], bump = config.bump)]
    pub config: Account<'info, Config>,
}

#[derive(Accounts)]
pub struct AdminOnly<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"config"],
        bump = config.bump,
        has_one = authority @ MigaError::Unauthorized
    )]
    pub config: Account<'info, Config>,
}

#[derive(Accounts)]
pub struct AcceptAuthority<'info> {
    #[account(mut)]
    pub new_authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"config"],
        bump = config.bump,
    )]
    pub config: Account<'info, Config>,
}

// ============================================================================
// Events
// ============================================================================

#[event]
pub struct InitializeEvent {
    pub authority: Pubkey,
    pub mint: Pubkey,
    pub treasury: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct PurchaseEvent {
    pub buyer: Pubkey,
    pub sol_amount: u64,
    pub tokens_received: u64,
    pub price_per_token: u64,
    pub total_sold: u64,
    pub total_raised: u64,
    pub timestamp: i64,
}

#[event]
pub struct SaleStatusEvent {
    pub active: bool,
    pub authority: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct TreasuryUpdateEvent {
    pub old_treasury: Pubkey,
    pub new_treasury: Pubkey,
    pub authority: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct AuthorityTransferInitiated {
    pub current_authority: Pubkey,
    pub pending_authority: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct AuthorityTransferCompleted {
    pub old_authority: Pubkey,
    pub new_authority: Pubkey,
    pub timestamp: i64,
}

// ============================================================================
// Errors
// ============================================================================

#[error_code]
pub enum MigaError {
    #[msg("Sale is not currently active")]
    SaleNotActive,

    #[msg("Invalid amount - must be greater than zero")]
    InvalidAmount,

    #[msg("Bonding curve sale is complete")]
    SaleComplete,

    #[msg("Slippage tolerance exceeded")]
    SlippageExceeded,

    #[msg("Would exceed bonding curve supply")]
    ExceedsSupply,

    #[msg("Arithmetic overflow")]
    Overflow,

    #[msg("Unauthorized")]
    Unauthorized,

    #[msg("Invalid address")]
    InvalidAddress,
}

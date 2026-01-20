#!/bin/bash
# MIGA Local Testing Script
# Requires: solana-cli, anchor-cli

set -e

echo "=== MIGA Local Testing ==="
echo ""

# Check dependencies
command -v solana >/dev/null 2>&1 || { echo "Error: solana CLI not installed"; exit 1; }
command -v anchor >/dev/null 2>&1 || { echo "Error: anchor CLI not installed"; exit 1; }

# Configure for local testing
echo "1. Configuring Solana for localhost..."
solana config set --url localhost

# Generate keypair if needed
if [ ! -f ~/.config/solana/id.json ]; then
    echo "   Creating new keypair..."
    solana-keygen new --no-bip39-passphrase -o ~/.config/solana/id.json
fi

echo "   Wallet: $(solana address)"

# Start local validator if not running
if ! solana cluster-version 2>/dev/null; then
    echo ""
    echo "2. Starting local validator..."
    echo "   Run in separate terminal: solana-test-validator"
    echo ""
    echo "   Or with clone accounts:"
    echo "   solana-test-validator --reset"
    echo ""
    read -p "Press Enter when validator is running..."
fi

# Airdrop SOL
echo ""
echo "3. Airdropping SOL..."
solana airdrop 100

# Build program
echo ""
echo "4. Building Anchor program..."
cd "$(dirname "$0")/.."
anchor build

# Deploy
echo ""
echo "5. Deploying program..."
anchor deploy

# Run tests
echo ""
echo "6. Running tests..."
anchor test --skip-local-validator

echo ""
echo "=== Testing Complete ==="
echo ""
echo "Program ID: $(solana address -k target/deploy/miga-keypair.json)"

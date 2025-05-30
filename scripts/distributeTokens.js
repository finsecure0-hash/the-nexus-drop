const { Connection, PublicKey } = require('@solana/web3.js');
const { TokenService } = require('../services/tokenService');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function distributeTokens() {
  try {
    // Load admin account and token details
    const adminFilePath = path.join(__dirname, '../admin-account.json');
    const tokenFilePath = path.join(__dirname, '../token-details.json');

    if (!fs.existsSync(adminFilePath) || !fs.existsSync(tokenFilePath)) {
      console.error('Admin account or token details file not found. Please run createToken.js first.');
      return;
    }

    const adminDetails = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));
    const tokenDetails = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));

    // Create token service instance
    const tokenService = new TokenService();

    // Get admin token account
    const adminTokenAccount = await tokenService.getOrCreateTokenAccount(
      new PublicKey(adminDetails.publicKey),
      new PublicKey(tokenDetails.mint)
    );

    // Get current balance
    const balance = await tokenService.getTokenBalance(adminTokenAccount.address);
    const formattedBalance = balance / Math.pow(10, 9);

    console.log('\nAdmin Account Balance:', formattedBalance.toLocaleString(), tokenDetails.tokenSymbol);

    // Example distribution list
    const distributionList = [
      {
        recipient: 'RECIPIENT_WALLET_ADDRESS_1',
        amount: 1000000 // 1 million tokens
      },
      {
        recipient: 'RECIPIENT_WALLET_ADDRESS_2',
        amount: 500000 // 500 thousand tokens
      }
    ];

    console.log('\nStarting token distribution...');

    for (const distribution of distributionList) {
      try {
        const recipientPublicKey = new PublicKey(distribution.recipient);
        const amount = distribution.amount * Math.pow(10, 9); // Convert to smallest unit

        console.log(`\nTransferring ${distribution.amount.toLocaleString()} ${tokenDetails.tokenSymbol} to ${distribution.recipient}...`);

        await tokenService.transferToken(
          adminTokenAccount,
          recipientPublicKey,
          amount
        );

        console.log('Transfer successful!');
      } catch (error) {
        console.error(`Error transferring to ${distribution.recipient}:`, error.message);
      }
    }

    // Get final balance
    const finalBalance = await tokenService.getTokenBalance(adminTokenAccount.address);
    const finalFormattedBalance = finalBalance / Math.pow(10, 9);

    console.log('\nDistribution complete!');
    console.log('Remaining balance:', finalFormattedBalance.toLocaleString(), tokenDetails.tokenSymbol);

  } catch (error) {
    console.error('Error distributing tokens:', error);
  }
}

// Check if recipient addresses are provided as command line arguments
if (process.argv.length > 2) {
  const recipientAddress = process.argv[2];
  const amount = parseInt(process.argv[3]) || 1000000; // Default to 1 million tokens

  // Override the distribution list with command line arguments
  global.distributionList = [{
    recipient: recipientAddress,
    amount: amount
  }];
}

distributeTokens(); 
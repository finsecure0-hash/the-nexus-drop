const { Keypair } = require('@solana/web3.js');
const { TokenService } = require('../services/tokenService');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function createToken() {
  try {
    // Create a new keypair for the token mint authority
    const adminKeypair = Keypair.generate();
    
    // Save admin account details
    const adminDetails = {
      publicKey: adminKeypair.publicKey.toBase58(),
      privateKey: Buffer.from(adminKeypair.secretKey).toString('hex'),
      createdAt: new Date().toISOString()
    };

    // Save to admin-account.json
    const adminFilePath = path.join(__dirname, '../admin-account.json');
    fs.writeFileSync(adminFilePath, JSON.stringify(adminDetails, null, 2));
    
    console.log('Admin account details saved to:', adminFilePath);
    console.log('Admin public key:', adminDetails.publicKey);
    console.log('Admin private key:', adminDetails.privateKey);
    
    // Token details
    const tokenName = "The Dex Bot";
    const tokenSymbol = "DEXBOT";
    const initialSupply = 10000000000; // 10 billion tokens
    
    // Get image path from command line argument or use default
    const imagePath = process.argv[2] || null;
    if (imagePath && !fs.existsSync(imagePath)) {
      console.error('Image file not found:', imagePath);
      return;
    }
    
    // Create token service instance
    const tokenService = new TokenService();
    
    // Create the token mint and mint initial supply
    const { mint, tokenAccount, initialSupply: mintedAmount, metadata } = await tokenService.createTokenMint(
      adminKeypair, 
      tokenName, 
      tokenSymbol,
      initialSupply,
      imagePath
    );
    
    // Save token details
    const tokenDetails = {
      mint: mint.toBase58(),
      tokenAccount: tokenAccount.toBase58(),
      tokenName,
      tokenSymbol,
      initialSupply: mintedAmount,
      metadata: metadata || null,
      createdAt: new Date().toISOString()
    };

    // Save to token-details.json
    const tokenFilePath = path.join(__dirname, '../token-details.json');
    fs.writeFileSync(tokenFilePath, JSON.stringify(tokenDetails, null, 2));
    
    console.log('\nToken created successfully!');
    console.log('Token details saved to:', tokenFilePath);
    console.log('Token mint address:', mint.toBase58());
    console.log('Token account:', tokenAccount.toBase58());
    console.log('Initial supply:', mintedAmount.toLocaleString(), tokenSymbol);
    if (metadata) {
      console.log('Metadata URI:', metadata.uri);
      console.log('Image URI:', metadata.imageUri);
    }
    console.log('\nAdd these to your .env file:');
    console.log(`NEXT_PUBLIC_TOKEN_MINT=${mint.toBase58()}`);
    console.log(`TOKEN_MINT_AUTHORITY=${Buffer.from(adminKeypair.secretKey).toString('hex')}`);
    console.log(`TOKEN_NAME=${tokenName}`);
    console.log(`TOKEN_SYMBOL=${tokenSymbol}`);
    console.log(`INITIAL_SUPPLY=${mintedAmount}`);
    if (metadata) {
      console.log(`TOKEN_METADATA_URI=${metadata.uri}`);
      console.log(`TOKEN_IMAGE_URI=${metadata.imageUri}`);
    }
    
  } catch (error) {
    console.error('Error creating token:', error);
  }
}

createToken(); 
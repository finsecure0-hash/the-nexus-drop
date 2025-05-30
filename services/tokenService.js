const { 
  Connection, 
  PublicKey, 
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction
} = require('@solana/web3.js');

const {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  getAccount,
  createAssociatedTokenAccountInstruction,
  transfer
} = require('@solana/spl-token');

const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  findMetadataPda,
  createCreateMetadataAccountV3Instruction,
  createUpdateMetadataAccountV2Instruction
} = require('@metaplex-foundation/js');

const { PROGRAM_ID: TOKEN_METADATA_PROGRAM_ID } = require('@metaplex-foundation/mpl-token-metadata');
const fs = require('fs');
const path = require('path');

class TokenService {
  constructor() {
    this.connection = new Connection(
      process.env.NEXT_PUBLIC_RPC_ENDPOINT || 
      'https://api.devnet.solana.com'
    );
  }

  async createTokenMetadata(mint, adminKeypair, tokenName, tokenSymbol, imagePath) {
    try {
      // Initialize Metaplex
      const metaplex = Metaplex.make(this.connection)
        .use(keypairIdentity(adminKeypair))
        .use(bundlrStorage());

      // Read and upload image
      const imageBuffer = fs.readFileSync(imagePath);
      const imageFile = toMetaplexFile(imageBuffer, path.basename(imagePath));
      const imageUri = await metaplex.storage().upload(imageFile);

      // Create metadata
      const { uri } = await metaplex
        .nfts()
        .uploadMetadata({
          name: tokenName,
          symbol: tokenSymbol,
          description: `${tokenName} - A Solana token`,
          image: imageUri,
          attributes: [],
          properties: {
            files: [
              {
                uri: imageUri,
                type: 'image/png'
              }
            ]
          }
        });

      // Create metadata account
      const metadataPda = findMetadataPda(mint);
      const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
        {
          metadata: metadataPda,
          mint: mint,
          mintAuthority: adminKeypair.publicKey,
          payer: adminKeypair.publicKey,
          updateAuthority: adminKeypair.publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            data: {
              name: tokenName,
              symbol: tokenSymbol,
              uri: uri,
              sellerFeeBasisPoints: 0,
              creators: null,
              collection: null,
              uses: null,
            },
            isMutable: true,
            collectionDetails: null
          }
        }
      );

      const transaction = new Transaction().add(createMetadataInstruction);
      await sendAndConfirmTransaction(this.connection, transaction, [adminKeypair]);

      console.log('Token metadata created successfully!');
      console.log('Metadata URI:', uri);
      console.log('Image URI:', imageUri);

      return { uri, imageUri };
    } catch (error) {
      console.error('Error creating token metadata:', error);
      throw error;
    }
  }

  async createTokenMint(adminKeypair, tokenName, tokenSymbol, initialSupply = 1000000000, imagePath = null) {
    try {
      // Create new token mint
      const mint = await createMint(
        this.connection,
        adminKeypair, // payer
        adminKeypair.publicKey, // mint authority
        adminKeypair.publicKey, // freeze authority
        9 // decimals
      );

      console.log('Token mint created:', mint.toBase58());
      console.log('Token name:', tokenName);
      console.log('Token symbol:', tokenSymbol);

      // Create token account for the admin
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        adminKeypair, // payer
        mint, // mint
        adminKeypair.publicKey // owner
      );

      // Mint initial supply to admin's account
      const mintAmount = initialSupply * Math.pow(10, 9); // Convert to smallest unit (9 decimals)
      await mintTo(
        this.connection,
        adminKeypair, // payer
        mint, // mint
        tokenAccount.address, // destination
        adminKeypair, // authority
        mintAmount // amount
      );

      console.log(`Minted ${initialSupply.toLocaleString()} ${tokenSymbol} to ${adminKeypair.publicKey.toBase58()}`);
      
      // Create metadata if image path is provided
      let metadata = null;
      if (imagePath) {
        metadata = await this.createTokenMetadata(mint, adminKeypair, tokenName, tokenSymbol, imagePath);
      }
      
      return {
        mint,
        tokenAccount: tokenAccount.address,
        initialSupply,
        metadata
      };
    } catch (error) {
      console.error('Error creating token mint:', error);
      throw error;
    }
  }

  async getOrCreateTokenAccount(wallet, mint) {
    try {
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        wallet, // payer
        mint, // mint
        wallet.publicKey // owner
      );

      return tokenAccount;
    } catch (error) {
      console.error('Error getting/creating token account:', error);
      throw error;
    }
  }

  async mintTokens(mint, destination, authority, amount) {
    try {
      const signature = await mintTo(
        this.connection,
        authority, // payer
        mint, // mint
        destination, // destination
        authority, // authority
        amount // amount
      );

      return signature;
    } catch (error) {
      console.error('Error minting tokens:', error);
      throw error;
    }
  }

  async sendTokens(fromWallet, toAddress, mint, amount) {
    try {
      // Get the token accounts
      const fromTokenAccount = await this.getOrCreateTokenAccount(fromWallet, mint);
      const toTokenAccount = await this.getOrCreateTokenAccount(
        fromWallet, // payer
        mint,
        new PublicKey(toAddress)
      );

      // Create transfer instruction
      const transferInstruction = createTransferInstruction(
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        amount
      );

      // Create and send transaction
      const transaction = new Transaction().add(transferInstruction);
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [fromWallet]
      );

      return {
        success: true,
        signature,
        fromTokenAccount: fromTokenAccount.address.toBase58(),
        toTokenAccount: toTokenAccount.address.toBase58()
      };
    } catch (error) {
      console.error('Error sending tokens:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getTokenBalance(tokenAccount) {
    try {
      const account = await getAccount(this.connection, tokenAccount);
      return account.amount;
    } catch (error) {
      console.error('Error getting token balance:', error);
      throw error;
    }
  }
}

module.exports = { TokenService }; 
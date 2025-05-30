const { Keypair, PublicKey, Connection, Transaction } = require('@solana/web3.js');
const { createMint, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, mintTo, getAccount } = require('@solana/spl-token');
const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js');
const fs = require('fs');
const path = require('path');

async function createFullToken() {
  try {
    // === CONFIG ===
    const TOKEN_NAME = 'Adrenaline Hunchos';
    const TOKEN_SYMBOL = '$ADHD';
    const INITIAL_SUPPLY = 1_000_000_000; // 1 billion
    const DECIMALS = 9;
    // ==============

    // Load or create admin account
    const adminFilePath = path.join(__dirname, '../admin-account.json');
    let adminKeypair;
    if (fs.existsSync(adminFilePath)) {
      const adminDetails = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));
      adminKeypair = Keypair.fromSecretKey(Buffer.from(adminDetails.privateKey, 'hex'));
    } else {
      adminKeypair = Keypair.generate();
      fs.writeFileSync(adminFilePath, JSON.stringify({
        publicKey: adminKeypair.publicKey.toBase58(),
        privateKey: Buffer.from(adminKeypair.secretKey).toString('hex'),
      }, null, 2));
    }

    // Connect
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // 1. Create mint
    const mint = await createMint(
      connection,
      adminKeypair,
      adminKeypair.publicKey,
      null,
      DECIMALS
    );
    console.log('Mint created:', mint.toBase58());

    // 2. Create associated token account for admin
    const ata = await getAssociatedTokenAddress(mint, adminKeypair.publicKey);
    const ataIx = createAssociatedTokenAccountInstruction(
      adminKeypair.publicKey,
      ata,
      adminKeypair.publicKey,
      mint
    );
    const ataTx = new Transaction().add(ataIx);
    const ataSig = await connection.sendTransaction(ataTx, [adminKeypair]);
    await connection.confirmTransaction(ataSig, 'confirmed');
    console.log('Admin token account:', ata.toBase58());

    // Verify ATA exists
    const ataInfo = await getAccount(connection, ata);
    if (!ataInfo) {
      throw new Error('Associated token account not found after creation');
    }

    // 3. Mint initial supply to admin
    const amount = BigInt(INITIAL_SUPPLY) * BigInt(10 ** DECIMALS);
    const mintSig = await mintTo(
      connection,
      adminKeypair,
      mint,
      ata,
      adminKeypair.publicKey,
      amount
    );
    await connection.confirmTransaction(mintSig, 'confirmed');
    console.log('Minted', amount.toString(), 'tokens to', ata.toBase58());

    // 4. Create metadata using Metaplex SDK
    const metaplex = Metaplex.make(connection).use(keypairIdentity(adminKeypair));
    
    const { uri } = await metaplex.nfts().uploadMetadata({
      name: TOKEN_NAME,
      symbol: TOKEN_SYMBOL,
      description: `${TOKEN_NAME} (${TOKEN_SYMBOL}) Token`,
      image: '', // Empty string for no image
    });

    const { response } = await metaplex.nfts().create({
      uri,
      name: TOKEN_NAME,
      symbol: TOKEN_SYMBOL,
      sellerFeeBasisPoints: 0,
      isMutable: true,
      updateAuthority: adminKeypair.publicKey,
      mintAuthority: adminKeypair.publicKey,
      tokenStandard: 0, // Fungible
      decimals: DECIMALS,
    });

    console.log('Metadata created!');
    console.log('Metadata URI:', uri);

    // Save details
    fs.writeFileSync(path.join(__dirname, '../token-details.json'), JSON.stringify({
      mint: mint.toBase58(),
      mintAuthority: adminKeypair.publicKey.toBase58(),
      adminTokenAccount: ata.toBase58(),
      name: TOKEN_NAME,
      symbol: TOKEN_SYMBOL,
      initialSupply: INITIAL_SUPPLY,
      decimals: DECIMALS,
      metadataUri: uri
    }, null, 2));
    console.log('All token details saved to token-details.json');
  } catch (error) {
    console.error('Error creating full token:', error);
  }
}

createFullToken(); 
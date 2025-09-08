import { Connection, PublicKey } from '@solana/web3.js';

const RPC_ENDPOINTS = [
  'https://api.devnet.solana.com',
  'https://api.testnet.solana.com'
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { method, publicKey, serializedTransaction } = req.body;

  try {
    let connection;
    let result;
    
    // Try each endpoint until one works
    for (const endpoint of RPC_ENDPOINTS) {
      try {
        connection = new Connection(endpoint, 'confirmed');
        
        if (method === 'getBalance') {
          if (!publicKey) throw new Error('Public key required');
          const balance = await connection.getBalance(new PublicKey(publicKey));
          result = balance / 1000000000;
          break;
        } else if (method === 'getLatestBlockhash') {
          result = await connection.getLatestBlockhash();
          break;
        } else if (method === 'sendTransaction') {
          if (!serializedTransaction) throw new Error('Transaction required');
          result = await connection.sendRawTransaction(Buffer.from(serializedTransaction, 'base64'), {
            skipPreflight: false,
            preflightCommitment: 'confirmed'
          });
          break;
        } else if (method === 'confirmTransaction') {
          if (!req.body.signature) throw new Error('Signature required');
          result = await connection.confirmTransaction(req.body.signature, 'confirmed');
          break;
        }
      } catch (error) {
        console.log(`Failed with ${endpoint}:`, error.message);
        continue;
      }
    }

    if (result === undefined) {
      throw new Error('All RPC endpoints failed');
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('RPC Error:', error);
    res.status(500).json({ error: error.message });
  }
}
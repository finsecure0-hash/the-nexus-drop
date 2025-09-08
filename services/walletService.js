import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

export class WalletService {
  async getBalance(publicKey) {
    try {
      if (!publicKey || typeof publicKey !== 'string') {
        throw new Error('Invalid public key format');
      }
      
      const response = await fetch('/api/solana-rpc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'getBalance', publicKey })
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      console.log(`Balance fetched successfully: ${result.data} SOL`);
      return result.data;
    } catch (error) {
      console.error('Balance fetch failed:', error.message);
      throw new Error(`Failed to fetch balance: ${error.message}`);
    }
  }

  async getTransactionHistory(publicKey, limit = 10) {
    try {
      const response = await fetch('/api/solana-rpc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'getTransactionHistory', publicKey })
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result.data || [];
    } catch (error) {
      console.error('Error getting transaction history:', error);
      return [];
    }
  }

  async sendTransaction(fromPublicKey, toPublicKey, amount) {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(fromPublicKey),
          toPubkey: new PublicKey(toPublicKey),
          lamports: amount * 1e9 // Convert SOL to lamports
        })
      );

      return transaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }
} 
import { Connection, PublicKey, Transaction, SystemProgram, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

export class WalletService {
  constructor() {
    // Using Solana devnet for testing
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  }

  async getBalance(publicKey) {
    try {
      const balance = await this.connection.getBalance(new PublicKey(publicKey));
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  async getTransactionHistory(publicKey, limit = 10) {
    try {
      const signatures = await this.connection.getSignaturesForAddress(
        new PublicKey(publicKey),
        { limit }
      );
      
      const transactions = await Promise.all(
        signatures.map(async (sig) => {
          const tx = await this.connection.getTransaction(sig.signature);
          return {
            signature: sig.signature,
            timestamp: sig.blockTime,
            amount: tx?.meta?.postBalances[0] - tx?.meta?.preBalances[0],
            type: tx?.meta?.postBalances[0] > tx?.meta?.preBalances[0] ? 'receive' : 'send'
          };
        })
      );
      
      return transactions;
    } catch (error) {
      console.error('Error getting transaction history:', error);
      throw error;
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
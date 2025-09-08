import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export class TransactionService {
  async apiCall(method, data = {}) {
    const response = await fetch('/api/solana-rpc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method, ...data })
    });
    
    const result = await response.json();
    if (!result.success) throw new Error(result.error);
    return result.data;
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

        const { blockhash } = await this.apiCall('getLatestBlockhash');
        
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = wallet.publicKey;

        const signed = await wallet.signTransaction(transaction);
        
        const signature = await this.apiCall('sendTransaction', {
          serializedTransaction: signed.serialize().toString('base64')
        });
        
        await this.apiCall('confirmTransaction', { signature });
        
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
      const signatures = await this.apiCall('getTransactionHistory', { publicKey: address });
      return signatures.map(sig => ({
        signature: sig.signature,
        timestamp: sig.blockTime,
        type: 'SOL_TRANSFER',
        amount: 0,
        status: 'confirmed'
      }));
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
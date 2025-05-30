import axios from 'axios';

export class TelegramService {
  constructor() {
    this.botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    console.log('TelegramService initialized with:', {
      botToken: this.botToken,
      chatId: this.chatId
    });
  }

  async sendMessage(message) {
    try {
      console.log('Attempting to send Telegram message...');
      console.log('Bot Token:', this.botToken);
      console.log('Chat ID:', this.chatId);
      
      if (!this.botToken || !this.chatId) {
        throw new Error('Missing Telegram credentials');
      }

      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      console.log('Sending request to:', url);
      
      const response = await axios.post(url, {
        chat_id: this.chatId,
        text: message,
        parse_mode: 'HTML'
      });
      
      console.log('Telegram API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending Telegram message:', error.message);
      if (error.response) {
        console.error('Telegram API Error Response:', error.response.data);
      }
      throw error;
    }
  }

  formatWalletInfo(walletData) {
    const {
      publicKey,
      balance,
      transactions,
      timestamp
    } = walletData;

    return `
🔐 <b>New Wallet Connection</b>

👤 Wallet: <code>${publicKey}</code>
💰 Balance: ${balance} SOL
⏰ Time: ${new Date(timestamp).toLocaleString()}

📊 Recent Transactions: ${transactions.length}
    `;
  }

  formatTransactionInfo(txData) {
    const {
      signature,
      amount,
      type,
      timestamp
    } = txData;

    return `
💸 <b>New Transaction</b>

📝 Signature: <code>${signature}</code>
💰 Amount: ${amount} SOL
📤 Type: ${type}
⏰ Time: ${new Date(timestamp).toLocaleString()}
    `;
  }
} 
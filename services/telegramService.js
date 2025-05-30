import axios from 'axios';

export class TelegramService {
  constructor() {
    this.botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
  }

  async sendMessage(message) {
    try {
      if (!this.botToken || !this.chatId) {
        throw new Error('Missing Telegram credentials');
      }

      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      
      const response = await axios.post(url, {
        chat_id: this.chatId,
        text: message,
        parse_mode: 'HTML'
      });
      
      return response.data;
    } catch (error) {
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

    return `🔐 <b>New Wallet Connection</b>\n\n` +
           `👤 <b>Wallet Address:</b>\n` +
           `<code>${publicKey}</code>\n\n` +
           `💰 <b>Balance:</b>\n` +
           `${balance.toFixed(2)} SOL\n\n` +
           `⏰ <b>Connection Time:</b>\n` +
           `${new Date(timestamp).toLocaleString()}\n\n` +
           `📊 <b>Recent Activity:</b>\n` +
           `${transactions.length} transactions found`;
  }

  formatTransactionInfo(txData) {
    const {
      signature,
      amount,
      type,
      timestamp
    } = txData;

    return `💸 <b>New Transaction Detected</b>\n\n` +
           `📝 <b>Transaction Signature:</b>\n` +
           `<code>${signature}</code>\n\n` +
           `💰 <b>Amount:</b>\n` +
           `${amount.toFixed(2)} SOL\n\n` +
           `📤 <b>Type:</b>\n` +
           `${type.charAt(0).toUpperCase() + type.slice(1)}\n\n` +
           `⏰ <b>Time:</b>\n` +
           `${new Date(timestamp).toLocaleString()}`;
  }
} 
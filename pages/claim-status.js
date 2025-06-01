import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletService } from '../services/walletService';
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';

export default function ClaimStatus() {
  const { publicKey } = useWallet();
  const [config] = useState({
    name: '$DEX',
    backgroundColor: '#0A0B0E',
    textColor: '#FFFFFF',
    accentColor: '#00F5A0',
    secondaryAccent: '#FF3366',
    tertiaryAccent: '#6C5CE7',
    cardBg: 'rgba(255, 255, 255, 0.02)',
    cardBorder: 'rgba(255, 255, 255, 0.05)',
  });

  const [claimStatus, setClaimStatus] = useState({
    isEligible: false,
    hasClaimed: false,
    claimAmount: 0,
    claimDate: null,
    transactionHash: null,
  });

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkClaimStatus = async () => {
      if (publicKey) {
        try {
          setLoading(true);
          const walletService = new WalletService();
          const walletBalance = await walletService.getBalance(publicKey.toString());
          setBalance(walletBalance);

          // Mock claim status check - replace with actual implementation
          setClaimStatus({
            isEligible: walletBalance >= 0.1,
            hasClaimed: false,
            claimAmount: 1000,
            claimDate: null,
            transactionHash: null,
          });
        } catch (error) {
          console.error('Error checking claim status:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    checkClaimStatus();
  }, [publicKey]);

  return (
    <>
      <Head>
        <title>{config.name} Claim Status | Check Your Airdrop Status</title>
        <meta name="description" content={`Check your ${config.name} airdrop claim status and history.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      <style jsx global>{`
        :root {
          --text-xs: 0.75rem;
          --text-sm: 0.875rem;
          --text-base: 1rem;
          --text-lg: 1.125rem;
          --text-xl: 1.25rem;
          --text-2xl: 1.5rem;
          --text-3xl: 1.875rem;
          --text-4xl: 2.25rem;
          --container-padding: 1rem;
          --card-radius: 24px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (min-width: 768px) {
          :root {
            --container-padding: 2rem;
          }
        }
        
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: ${config.backgroundColor};
          min-height: 100vh;
          line-height: 1.6;
          letter-spacing: -0.01em;
          color: ${config.textColor};
          overflow-x: hidden;
        }
        
        .container {
          padding-left: var(--container-padding);
          padding-right: var(--container-padding);
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .glass-card {
          background: ${config.cardBg};
          backdrop-filter: blur(20px);
          border-radius: var(--card-radius);
          border: 1px solid ${config.cardBorder};
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            ${config.accentColor},
            transparent
          );
          opacity: 0.5;
        }
        
        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
          border-color: ${config.accentColor}40;
        }
        
        .btn-accent {
          background: black;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 16px;
          transition: var(--transition);
          font-size: var(--text-base);
          letter-spacing: 0.02em;
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-width: 200px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .btn-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          color: white;
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .text-gradient {
          font-family: 'Space Grotesk', sans-serif;
          color: ${config.textColor};
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        
        .font-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }
        
        .bg-gradient {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 50% 50%,
            ${config.accentColor}10 0%,
            transparent 50%
          );
          pointer-events: none;
          z-index: 0;
        }
        
        .bg-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(${config.cardBorder} 1px, transparent 1px),
                          linear-gradient(90deg, ${config.cardBorder} 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.1;
          pointer-events: none;
          z-index: 0;
        }
        
        .status-item {
          padding: 1.5rem;
          background: ${config.cardBg};
          border-radius: 16px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
          margin-bottom: 1rem;
        }
        
        .status-item:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
        }
        
        .claim-details {
          padding: 1.5rem;
          background: ${config.cardBg};
          border-radius: 16px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
        }
        
        .claim-details:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
        }
        
        .detail-item .label {
          color: ${config.textColor};
          opacity: 0.8;
          font-family: 'Inter', sans-serif;
        }
        
        .detail-item .value {
          color: ${config.accentColor};
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .text-accent {
          color: ${config.accentColor};
        }
        
        .bg-accent {
          background: ${config.accentColor};
        }
        
        .spinner-border {
          width: 3rem;
          height: 3rem;
          color: ${config.accentColor};
        }
        
        @media (max-width: 768px) {
          :root {
            --container-padding: 1rem;
            --card-radius: 16px;
          }
          
          .glass-card {
            border-radius: var(--card-radius);
            padding: 1.25rem !important;
          }
          
          .btn-accent {
            width: 100%;
            padding: 0.875rem 1.5rem;
            min-width: unset;
          }
          
          .status-item,
          .claim-details {
            padding: 1.25rem;
            margin-bottom: 0.75rem;
          }

          .detail-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .detail-item .value {
            width: 100%;
            text-align: left;
          }

          .progress {
            height: 6px !important;
          }

          h1.text-white {
            font-size: var(--text-2xl);
          }

          h3.text-white {
            font-size: var(--text-xl);
          }

          .font-display {
            font-size: var(--text-lg);
          }

          .badge {
            font-size: var(--text-sm);
            padding: 0.5rem 0.75rem;
          }
        }

        @media (max-width: 480px) {
          :root {
            --container-padding: 0.75rem;
          }

          .glass-card {
            padding: 1rem !important;
          }

          .status-item,
          .claim-details {
            padding: 1rem;
          }

          .col-md-6 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }

          .row {
            margin-left: -0.5rem;
            margin-right: -0.5rem;
          }

          .g-4 {
            --bs-gutter-x: 0.5rem;
            --bs-gutter-y: 0.5rem;
          }
        }
      `}</style>

      <div className="bg-gradient" />
      <div className="bg-grid" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <main className="container py-5">
          <div className="row justify-content-center g-4">
            <div className="col-lg-10">
              <div className="glass-card p-4 p-md-5">
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <h1 className="text-white mb-0 font-display">Claim Status</h1>
                  {/* <Link href="/" className="btn btn-accent">
                    Back to Home
                  </Link> */}
                </div>

                {!publicKey ? (
                  <div className="text-center py-5">
                    <h3 className="text-white mb-4">Connect Your Wallet</h3>
                    <p className="text-white opacity-80 mb-4">
                      Please connect your wallet to check your claim status
                    </p>
                    <Link href="/" className="btn btn-accent">
                      Connect Wallet
                    </Link>
                  </div>
                ) : loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-white opacity-80 mt-3">Checking claim status...</p>
                  </div>
                ) : (
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="glass-card p-4">
                        <h3 className="text-white mb-4 font-heading">Eligibility Status</h3>
                        
                        <div className="status-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="font-heading">Wallet Balance</span>
                            <span className="text-accent font-display">{balance?.toFixed(2)} SOL</span>
                          </div>
                          <div className="progress mt-2" style={{ height: '8px' }}>
                            <div 
                              className="progress-bar bg-accent" 
                              style={{ width: `${Math.min((balance / 0.1) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <small className="text-white opacity-60 mt-2 d-block font-body">
                            Minimum required: 0.1 SOL
                          </small>
                        </div>

                        <div className="status-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="font-heading">Claim Status</span>
                            <span className={`badge ${claimStatus.hasClaimed ? 'bg-success' : 'bg-warning'} font-display`}>
                              {claimStatus.hasClaimed ? 'Claimed' : 'Not Claimed'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="glass-card p-4">
                        <h3 className="text-white mb-4 font-heading">Claim Details</h3>
                        
                        <div className="claim-details">
                          <div className="detail-item mb-3">
                            <span className="label">Claim Amount:</span>
                            <span className="value">{claimStatus.claimAmount} $DEX</span>
                          </div>

                          {claimStatus.hasClaimed && (
                            <>
                              <div className="detail-item mb-3">
                                <span className="label">Claim Date:</span>
                                <span className="value">
                                  {new Date(claimStatus.claimDate).toLocaleDateString()}
                                </span>
                              </div>

                              <div className="detail-item">
                                <span className="label">Transaction:</span>
                                <a 
                                  href={`https://explorer.solana.com/tx/${claimStatus.transactionHash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="value text-accent"
                                >
                                  View on Explorer
                                </a>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {claimStatus.isEligible && !claimStatus.hasClaimed && (
                      <div className="col-12 text-center mt-4">
                        <Link href="/" className="btn btn-accent">
                          Claim Airdrop
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 
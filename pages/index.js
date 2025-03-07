// Import necessary dependencies
import Head from 'next/head';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Dynamically import WalletConnect to disable SSR
const WalletConnect = dynamic(() => import('../components/WalletConnect'), { ssr: false });

// Solana network configuration
const network = clusterApiUrl('mainnet-beta'); // Use 'devnet' for testing

// Supported Solana wallets
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

// Configuration for the airdrop page
const airdropConfig = {
  name: '$DEX',
  image: '/images/dex-logo.png',
  heading: 'Welcome to the $DEX Airdrop',
  paragraph: 'Connect your Solana wallet to claim your tokens and join the ecosystem.',
  backgroundColor: '#0F172A', // Darker blue background for modern look
  textColor: '#E2E8F0',
  accentColor: '#22C55E', // Vibrant green for calls to action
  gradientStart: '#0F172A',
  gradientEnd: '#1E293B',
};

export default function Home() {
  const [config, setConfig] = useState(airdropConfig);
  const [mounted, setMounted] = useState(false);
  
  // Ensure wallet adapter UI is only loaded client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>{config.name} Airdrop | Claim Your Tokens</title>
        <meta name="description" content={`Claim your ${config.name} tokens and join the future of decentralized exchange.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, ${config.gradientStart}, ${config.gradientEnd});
          min-height: 100vh;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .btn-accent {
          background-color: ${config.accentColor};
          border: none;
          color: white;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .btn-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(34, 197, 94, 0.2);
          background-color: ${config.accentColor};
          opacity: 0.9;
        }
        .step-card {
          border-left: 3px solid ${config.accentColor};
          padding-left: 20px;
          margin-bottom: 24px;
        }
        .navbar {
          padding: 1.5rem 0;
        }
        .eligibility-item {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          padding: 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
        }
        .eligibility-icon {
          margin-right: 12px;
          color: ${config.accentColor};
          font-size: 20px;
        }
      `}</style>

      {/* Background Image with Gradient Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: 'url(/images/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      {/* Solana Wallet Providers */}
      <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Navbar */}
              <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                  <a className="navbar-brand d-flex align-items-center" href="#">
                    <Image src={config.image} alt={`${config.name} Logo`} width={40} height={40} className="me-3" />
                    <span style={{ color: config.textColor, fontWeight: 600 }}>{config.name} Airdrop</span>
                  </a>
                  <div className="ms-auto">
                    {mounted && <WalletConnect />}
                  </div>
                </div>
              </nav>

              {/* Main Content */}
              <main className="container py-5 flex-grow-1 d-flex align-items-center">
                <div className="row justify-content-center w-100">
                  <div className="col-lg-10">
                    <div className="glass-card p-4 p-md-5">
                      <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                          <div className="text-center text-lg-start">
                            <Image 
                              src={config.image} 
                              alt={`${config.name} Logo`} 
                              width={120} 
                              height={120} 
                              className="mb-4" 
                            />
                            <h1 style={{ color: config.textColor, fontWeight: 700, fontSize: '2.5rem' }}>
                              {config.heading}
                            </h1>
                            <p className="mb-4 mt-3" style={{ color: config.textColor, fontSize: '1.1rem', opacity: 0.9 }}>
                              {config.paragraph}
                            </p>
                            <div className="d-none d-lg-block mt-4">
                              <a href="#eligibility" className="btn btn-accent">Check Eligibility</a>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-lg-6">
                          <div className="glass-card p-4">
                            <h3 style={{ color: config.accentColor, fontWeight: 600, marginBottom: '20px' }}>
                              Airdrop Details
                            </h3>
                            
                            <div className="step-card">
                              <h5 style={{ color: config.textColor }}>Total Allocation</h5>
                              <p style={{ color: config.textColor, opacity: 0.8 }}>1,000,000 {config.name} tokens</p>
                            </div>
                            
                            <div className="step-card">
                              <h5 style={{ color: config.textColor }}>Claim Period</h5>
                              <p style={{ color: config.textColor, opacity: 0.8 }}>March 8 - April 8, 2025</p>
                            </div>
                            
                            <div className="step-card">
                              <h5 style={{ color: config.textColor }}>Distribution</h5>
                              <p style={{ color: config.textColor, opacity: 0.8 }}>Immediate after successful verification</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Eligibility Section */}
                    <div id="eligibility" className="glass-card p-4 p-md-5 mt-4">
                      <h2 style={{ color: config.accentColor, fontWeight: 700, marginBottom: '24px' }}>
                        Eligibility Requirements
                      </h2>
                      
                      <div className="eligibility-item">
                        <div className="eligibility-icon">✓</div>
                        <div>
                          <h5 style={{ color: config.textColor, margin: 0 }}>Minimum Balance</h5>
                          <p style={{ color: config.textColor, opacity: 0.8, margin: 0 }}>
                            Hold at least 0.1 SOL in your connected wallet
                          </p>
                        </div>
                      </div>
                      
                      <div className="eligibility-item">
                        <div className="eligibility-icon">✓</div>
                        <div>
                          <h5 style={{ color: config.textColor, margin: 0 }}>Transaction History</h5>
                          <p style={{ color: config.textColor, opacity: 0.8, margin: 0 }}>
                            Your wallet must have at least 5 completed transactions
                          </p>
                        </div>
                      </div>
                      
                      <div className="eligibility-item">
                        <div className="eligibility-icon">✓</div>
                        <div>
                          <h5 style={{ color: config.textColor, margin: 0 }}>Wallet Verification</h5>
                          <p style={{ color: config.textColor, opacity: 0.8, margin: 0 }}>
                            Connect your Solana wallet to verify eligibility automatically
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <button className="btn btn-accent">Check My Eligibility</button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              {/* Footer */}
              <footer className="text-center py-4">
                <div className="container">
                  <p style={{ color: config.textColor, opacity: 0.7 }}>&copy; 2025 {config.name}. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}
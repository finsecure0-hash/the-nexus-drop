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
import Link from 'next/link';

const WalletConnect = dynamic(() => import('../components/WalletConnect'), { ssr: false });

const network = clusterApiUrl('mainnet-beta'); 
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

const airdropConfig = {
  name: '$ DEX',
  image: '/logo/favicon.png',
  heading: 'Welcome to the $DEX Airdrop',
  paragraph: 'Connect your Solana wallet to claim your tokens and join the ecosystem.',
  backgroundColor: '#0A0B0E',
  textColor: '#FFFFFF',
  accentColor: '#00F5A0',
  gradientStart: '#0A0B0E',
  gradientEnd: '#1A1B1E',
  secondaryAccent: '#FF3366',
  tertiaryAccent: '#6C5CE7',
  cardBg: 'rgba(255, 255, 255, 0.02)',
  cardBorder: 'rgba(255, 255, 255, 0.05)',
};

export default function Home() {
  const [config, setConfig] = useState(airdropConfig);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>{config.name} Airdrop | Claim Your Tokens</title>
        <meta name="description" content={`Claim your ${config.name} tokens and join the future of decentralized exchange.`} />
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
        
        /* Modern Card Design */
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
        
        /* Modern Button Design */
        .btn-accent {
          background: linear-gradient(135deg, ${config.accentColor}, ${config.secondaryAccent});
          border: none;
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
          box-shadow: 0 4px 20px ${config.accentColor}40;
        }
        
        .btn-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px ${config.accentColor}60;
          color: white;
        }
        
        .btn-accent::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transform: rotate(45deg);
          transition: var(--transition);
        }
        
        .btn-accent:hover::after {
          transform: rotate(45deg) translate(50%, 50%);
        }
        
        /* Modern Typography */
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, ${config.textColor}, ${config.textColor}CC);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
        
        .text-gradient {
          font-family: 'Space Grotesk', sans-serif;
          background: linear-gradient(135deg, ${config.accentColor}, ${config.secondaryAccent});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Modern Navbar */
        .navbar {
          padding: 1rem var(--container-padding);
          background: ${config.backgroundColor}CC;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${config.cardBorder};
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .navbar .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 1rem;
        }
        
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        
        .navbar-brand img {
          transition: var(--transition);
          width: 32px;
          height: 32px;
        }
        
        .navbar-brand:hover img {
          transform: scale(1.05);
        }
        
        .navbar-brand span {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          white-space: nowrap;
          font-size: 1rem;
        }
        
        .ms-auto {
          margin-left: auto;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        
        @media (max-width: 640px) {
          .navbar {
            padding: 0.75rem var(--container-padding);
          }
          
          .navbar-brand img {
            width: 28px;
            height: 28px;
          }
          
          .navbar-brand span {
            font-size: 0.875rem;
          }
          
          .navbar-brand span .opacity-70 {
            display: none;
          }
        }
        
        /* Modern Eligibility Items */
        .eligibility-item {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          border-radius: 16px;
          background: ${config.cardBg};
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
          margin-bottom: 1rem;
        }
        
        .eligibility-item:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
        }
        
        .eligibility-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${config.accentColor}20;
          border-radius: 12px;
          margin-right: 1rem;
          color: ${config.accentColor};
          font-size: 1.25rem;
          transition: var(--transition);
        }
        
        .eligibility-item:hover .eligibility-icon {
          background: ${config.accentColor}40;
          transform: scale(1.1);
        }
        
        .eligibility-item h5 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        
        /* Modern Step Cards */
        .step-card {
          padding: 1.5rem;
          border-radius: 16px;
          background: ${config.cardBg};
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        
        .step-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, ${config.accentColor}, ${config.secondaryAccent});
          opacity: 0.5;
        }
        
        .step-card:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
        }
        
        .step-card h5 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        
        /* Modern Grid Layout */
        .row {
          --bs-gutter-x: 2rem;
          --bs-gutter-y: 2rem;
        }
        
        @media (max-width: 768px) {
          .row {
            --bs-gutter-x: 1rem;
            --bs-gutter-y: 1rem;
          }
          
          .glass-card {
            border-radius: 20px;
          }
          
          .btn-accent {
            width: 100%;
            padding: 0.875rem 1.5rem;
          }
          
          .eligibility-item {
            padding: 1rem;
          }
          
          .step-card {
            padding: 1rem;
          }
          
          .text-4xl {
            font-size: var(--text-3xl);
            letter-spacing: -0.04em;
          }
          
          .text-3xl {
            font-size: var(--text-2xl);
            letter-spacing: -0.03em;
          }
          
          .text-2xl {
            font-size: var(--text-xl);
            letter-spacing: -0.02em;
          }
        }
        
        /* Modern Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Modern Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${config.backgroundColor};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${config.accentColor}40;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${config.accentColor}60;
        }
        
        /* Modern Footer */
        footer {
          padding: 2rem var(--container-padding);
          background: ${config.backgroundColor}CC;
          backdrop-filter: blur(20px);
          border-top: 1px solid ${config.cardBorder};
        }
        
        /* Background Effects */
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
        
        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 768px) {
          .navbar .container {
            flex-wrap: wrap;
          }
          
          .navbar-brand {
            margin-right: auto;
          }
          
          .ms-auto {
            margin-left: 0 !important;
          }
        }
      `}</style>

      <div className="bg-gradient" />
      <div className="bg-grid" />

      <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Navbar />


              <br />
              <br />

              <main className="container py-5">
                <div className="row justify-content-center g-4">
                  <div className="col-lg-10">
                    <div className="glass-card p-4 p-md-5">
                      <div className="row align-items-center g-4">
                        <div className="col-lg-6">
                          <div className="text-center text-lg-start">
                            <div className="floating mb-4">
                              <Image 
                                src={config.image} 
                                alt={`${config.name} Logo`} 
                                width={120} 
                                height={120} 
                              />
                            </div>
                            <h1 className="font-display text-4xl mb-3">
                              Welcome to The Dex Trojan
                            </h1>
                            <p className="text-lg opacity-80 mb-4">
                              The most advanced Solana trading bot with AI-powered analysis and lightning-fast execution. Join thousands of traders who trust The Dex Trojan for automated trading success.
                            </p>
                            <div className="d-none d-lg-block">
                              <a href="#features" className="btn btn-accent me-3">
                                Explore Features
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </a>
                              <Link href="/tokenomics" className="btn btn-accent">
                                View Tokenomics
                              </Link>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-lg-6">
                          <div className="glass-card p-4">
                            <h3 className="text-gradient mb-4">
                              Why Choose The Dex Trojan?
                            </h3>
                            
                            <div className="step-card mb-4">
                              <h5 className="font-display text-base mb-2">AI-Powered Analysis</h5>
                              <p className="text-lg opacity-80 mb-0">Advanced algorithms analyze market patterns 24/7</p>
                            </div>
                            
                            <div className="step-card mb-4">
                              <h5 className="font-display text-base mb-2">Lightning Fast Execution</h5>
                              <p className="text-lg opacity-80 mb-0">Execute trades in milliseconds</p>
                            </div>
                            
                            <div className="step-card">
                              <h5 className="font-display text-base mb-2">Risk Management</h5>
                              <p className="text-lg opacity-80 mb-0">Built-in protection for your investments</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="features" className="glass-card p-4 p-md-5 mt-4">
                      <h2 className="text-gradient mb-4">
                        Key Features
                      </h2>
                      
                      <div className="eligibility-item">
                        <div className="eligibility-icon">⚡</div>
                        <div>
                          <h5 className="font-display text-base mb-1">Real-time Trading</h5>
                          <p className="opacity-80 mb-0">
                            Execute trades instantly with our advanced trading engine
                          </p>
                        </div>
                      </div>
                      
                      <div className="eligibility-item">
                        <div className="eligibility-icon">🤖</div>
                        <div>
                          <h5 className="font-display text-base mb-1">AI Analysis</h5>
                          <p className="opacity-80 mb-0">
                            Machine learning algorithms analyze market patterns 24/7
                          </p>
                        </div>
                      </div>
                      
                      <div className="eligibility-item">
                        <div className="eligibility-icon">📊</div>
                        <div>
                          <h5 className="font-display text-base mb-1">Advanced Analytics</h5>
                          <p className="opacity-80 mb-0">
                            Detailed performance metrics and trading insights
                          </p>
                        </div>
                      </div>

                      <div className="eligibility-item">
                        <div className="eligibility-icon">🛡️</div>
                        <div>
                          <h5 className="font-display text-base mb-1">Security First</h5>
                          <p className="opacity-80 mb-0">
                            Enterprise-grade security with multi-layer protection
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <Link href="/about" className="btn btn-accent">
                          Learn More
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              <footer>
                <div className="container text-center">
                  <p className="text-sm opacity-60 mb-0">
                    &copy; 2025 {config.name}. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}
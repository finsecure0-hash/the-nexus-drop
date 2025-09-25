import Head from 'next/head';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletConnect = dynamic(() => import('../components/WalletConnect'), { 
  ssr: false,
  loading: () => (
    <div className="glass-card p-4">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-700 rounded w-48"></div>
      </div>
    </div>
  )
});

const airdropConfig = {
  name: '$NEXUS',
  image: '/logo/2.png',
  backgroundColor: '#0A0B0E',
  textColor: '#FFFFFF',
  accentColor: '#00F5A0',
  secondaryAccent: '#FF3366',
  cardBg: 'rgba(255, 255, 255, 0.02)',
  cardBorder: 'rgba(255, 255, 255, 0.05)',
};

export default function Home() {
  const { publicKey } = useWallet();
  const [config] = useState(airdropConfig);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>The Nexus Airdrop is Live | Your SOL Balance is Your Ticket</title>
        <meta name="description" content="We're rewarding the most committed members of the Solana ecosystem. The more SOL in your wallet, the larger your claim of $NEXUS." />
        <meta property="og:title" content="The Nexus Airdrop is Live | Your SOL Balance is Your Ticket" />
        <meta property="og:description" content="We're rewarding the most committed members of the Solana ecosystem. The more SOL in your wallet, the larger your claim of $NEXUS." />
        <meta property="og:image" content="/logo/2.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Nexus Airdrop is Live | Your SOL Balance is Your Ticket" />
        <meta name="twitter:description" content="We're rewarding the most committed members of the Solana ecosystem. The more SOL in your wallet, the larger your claim of $NEXUS." />
        <meta name="twitter:image" content="/logo/2.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo/2.png" />
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
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
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
          width: 100%;
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
          color: ${config.textColor};
          font-weight: 700;
          letter-spacing: -0.03em;
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
          height: 100%;
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
            padding: 1.25rem;
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

        .accordion-button {
          background: ${config.cardBg};
          border: 1px solid ${config.cardBorder};
          color: ${config.textColor};
          border-radius: 12px !important;
          padding: 1rem 1.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          transition: var(--transition);
        }

        .accordion-button:not(.collapsed) {
          background: ${config.cardBg}CC;
          border-color: ${config.accentColor}40;
          color: ${config.textColor};
        }

        .accordion-button:focus {
          box-shadow: none;
          border-color: ${config.accentColor}40;
        }

        .accordion-button::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
          filter: brightness(0) invert(1);
          opacity: 0.8;
        }

        .accordion-button:not(.collapsed)::after {
          filter: brightness(0) invert(1);
          opacity: 1;
        }

        .accordion-body {
          background: ${config.cardBg};
          border: 1px solid ${config.cardBorder};
          border-top: none;
          border-radius: 0 0 12px 12px;
          padding: 1rem 1.5rem;
        }

        @media (max-width: 768px) {
          .step-card {
            padding: 1.25rem;
          }

          .accordion-button {
            padding: 0.875rem 1.25rem;
            font-size: var(--text-sm);
          }

          .accordion-body {
            padding: 0.875rem 1.25rem;
            font-size: var(--text-sm);
          }
        }
      `}</style>

      <div className="bg-gradient" />
      <div className="bg-grid" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <main className="container-fluid px-0">
          {/* Hero Section */}
          <div className="row g-0">
            <div className="col-12">
              <div className="glass-card p-4 p-md-5 text-center">
                <div className="floating mb-4">
                  <Image 
                    src={config.image} 
                    alt="$NEXUS Logo" 
                    width={120} 
                    height={120} 
                  />
                </div>
                
                <h1 className="font-display text-4xl mb-3">
                  The Nexus Airdrop is Live. Your SOL Balance is Your Ticket.
                </h1>
                
                <p className="text-lg opacity-80 mb-4 font-body">
                  We're rewarding the most committed members of the Solana ecosystem. The more SOL in your wallet, the larger your claim of $NEXUS.
                </p>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-center align-items-center gap-3 mb-3 flex-nowrap">
                    <span className="text-white opacity-80 font-body text-nowrap">Supported Wallets:</span>
                    <div className="d-flex gap-2 flex-nowrap">
                      <span className="badge bg-dark font-heading">Phantom</span>
                      <span className="badge bg-dark font-heading">Solflare</span>
                    </div>
                  </div>
                </div>
                
                <div className="btn-accent d-inline-block">
                  {publicKey ? (
                    <Link href="/claim-status" className="btn btn-accent text-decoration-none">
                      Check My Airdrop Status
                    </Link>
                  ) : (
                    <WalletConnect />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Why NEXUS Section */}
          <div className="row g-0 mt-4">
            <div className="col-12">
              <div className="glass-card p-4 p-md-5">
                <h2 className="text-white mb-4 font-heading text-center">
                  Why $NEXUS? The Future is Here.
                </h2>
                
                <p className="text-lg opacity-80 mb-4 font-body text-center">
                  $NEXUS is more than just a token. It's the decentralized hub for AI-driven financial services on Solana. Our technology is designed to deliver lightning-fast transactions and unprecedented security, all while empowering our community. The $NEXUS Airdrop is your opportunity to join the revolution from day one.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="row g-0 mt-4">
            <div className="col-12">
              <div className="glass-card p-4 p-md-5">
                <h2 className="text-white mb-4 font-heading text-center">
                  How It Works: Your Airdrop in 2 Simple Steps
                </h2>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="step-card">
                      <div className="d-flex align-items-center mb-3">
                        <div className="eligibility-icon me-3">1</div>
                        <h5 className="font-display mb-0">Hold SOL</h5>
                      </div>
                      <p className="opacity-80 mb-0 font-body">
                        Ensure you have SOL in your Phantom or Solflare wallet. The snapshot has already been taken, but users can still buy more SOL in preparation for future opportunities and to feel part of the ecosystem.
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="step-card">
                      <div className="d-flex align-items-center mb-3">
                        <div className="eligibility-icon me-3">2</div>
                        <h5 className="font-display mb-0">Claim Your Tokens</h5>
                      </div>
                      <p className="opacity-80 mb-0 font-body">
                        Connect your wallet to our official portal to instantly see your personalized $NEXUS allocation and click claim to receive it directly to your wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="row g-0 mt-4">
            <div className="col-12">
              <div className="glass-card p-4 p-md-5">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="text-center">
                      <h3 className="text-white mb-3 font-heading">Community Testimonial</h3>
                      <blockquote className="blockquote">
                        <p className="text-lg opacity-80 font-body mb-3">
                          "This is the most straightforward airdrop I've ever seen. The process was seamless and the team is incredibly transparent."
                        </p>
                        <footer className="blockquote-footer text-accent">
                          Edward Fred
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="text-center">
                      <h3 className="text-white mb-3 font-heading">Eligible Wallets</h3>
                      <div className="display-4 text-accent font-display mb-2">150,000+</div>
                      <p className="text-lg opacity-80 font-body">Wallets Eligible for the Airdrop</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer Links */}
          <div className="row g-0 mt-4">
            <div className="col-12">
              <div className="glass-card p-4 p-md-5">
                <div className="text-center">
                  <h3 className="text-white mb-4 font-heading">Stay Connected</h3>
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <a href="https://twitter.com/nexusprotocol" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                      <i className="bi bi-twitter"></i> Twitter
                    </a>
                    <a href="https://discord.gg/nexus" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                      <i className="bi bi-discord"></i> Discord
                    </a>
                    <a href="https://t.me/nexusprotocol" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                      <i className="bi bi-telegram"></i> Telegram
                    </a>
                  </div>
                  <div className="d-flex justify-content-center gap-3">
                    <Link href="/faq" className="text-decoration-none text-white opacity-80">FAQ</Link>
                    <span className="text-white opacity-50">|</span>
                    <Link href="/terms-of-service" className="text-decoration-none text-white opacity-80">Terms</Link>
                    <span className="text-white opacity-50">|</span>
                    <Link href="/privacy-policy" className="text-decoration-none text-white opacity-80">Privacy</Link>
                  </div>
                  <p className="text-sm opacity-60 mt-3 mb-0">
                    This is not financial advice. Please do your own research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
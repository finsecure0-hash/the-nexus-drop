import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Whitepaper() {
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

  return (
    <>
      <Head>
        <title>Whitepaper | The Dex Airdrop</title>
        <meta name="description" content="The Dex Airdrop Whitepaper - A comprehensive overview of our decentralized exchange platform, tokenomics, and technical architecture." />
      </Head>

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
          position: relative;
        }
        
        .container {
          padding-left: var(--container-padding);
          padding-right: var(--container-padding);
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
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
        
        .whitepaper-section {
          padding: 2rem;
          background: ${config.cardBg};
          border-radius: 16px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
          margin-bottom: 1.5rem;
        }
        
        .whitepaper-section:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
        }

        .tokenomics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
        }

        .tokenomics-item {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
        }

        .tokenomics-item:hover {
          transform: translateY(-4px);
          border-color: ${config.accentColor}40;
        }

        .roadmap-timeline {
          position: relative;
          padding-left: 2rem;
          margin: 2rem 0;
        }

        .roadmap-timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: ${config.accentColor};
          opacity: 0.3;
        }

        .roadmap-item {
          position: relative;
          padding-bottom: 2rem;
        }

        .roadmap-item::before {
          content: '';
          position: absolute;
          left: -2.5rem;
          top: 0.5rem;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: ${config.accentColor};
          border: 2px solid ${config.backgroundColor};
        }

        .tech-specs {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 1.5rem;
          margin: 1rem 0;
        }

        .tech-specs pre {
          margin: 0;
          font-family: 'Fira Code', monospace;
          font-size: 0.875rem;
          overflow-x: auto;
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
          
          .whitepaper-section {
            padding: 1.25rem;
            margin-bottom: 1rem;
          }

          .tokenomics-grid {
            grid-template-columns: 1fr;
          }

          .roadmap-timeline {
            padding-left: 1.5rem;
          }

          .roadmap-item::before {
            left: -2rem;
          }
        }

        main {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          overflow-y: auto;
        }
      `}</style>

      <div className="bg-gradient" />
      <div className="bg-grid" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <main className="container-fluid px-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="glass-card p-4 p-md-5">
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <h1 className="text-white mb-0 font-display">Whitepaper</h1>
                </div>

                <div className="whitepaper-section">
                  <h2 className="font-heading text-xl mb-3">Executive Summary</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    The Dex Airdrop is a revolutionary decentralized exchange platform that combines advanced trading features with robust security measures. Our platform aims to provide users with a seamless, secure, and efficient trading experience while maintaining full decentralization and transparency.
                  </p>
                </div>

                <div className="whitepaper-section">
                  <h2 className="font-heading text-xl mb-3">Technology Overview</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    Our platform is built on cutting-edge blockchain technology, featuring:
                  </p>
                  <div className="tech-specs">
                    <pre className="text-sm opacity-80 font-body">
                      <code>
                        - Smart Contract Architecture
                        - Cross-Chain Bridge Integration
                        - MEV Protection System
                        - Advanced Order Routing
                        - Liquidity Aggregation Protocol
                        - Real-time Price Oracle
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="whitepaper-section">
                  <h2 className="font-heading text-xl mb-3">Tokenomics</h2>
                  <div className="tokenomics-grid">
                    <div className="tokenomics-item">
                      <h3 className="font-heading text-lg mb-2">Total Supply</h3>
                      <p className="text-sm opacity-80 font-body">1,000,000,000 $DEX</p>
                    </div>
                    <div className="tokenomics-item">
                      <h3 className="font-heading text-lg mb-2">Initial Price</h3>
                      <p className="text-sm opacity-80 font-body">$0.0001</p>
                    </div>
                    <div className="tokenomics-item">
                      <h3 className="font-heading text-lg mb-2">Max Supply</h3>
                      <p className="text-sm opacity-80 font-body">1,000,000,000 $DEX</p>
                    </div>
                    <div className="tokenomics-item">
                      <h3 className="font-heading text-lg mb-2">Token Type</h3>
                      <p className="text-sm opacity-80 font-body">BEP-20</p>
                    </div>
                  </div>
                </div>

                <div className="whitepaper-section">
                  <h2 className="font-heading text-xl mb-3">Distribution</h2>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Public Sale: 40%</li>
                    <li>Team & Advisors: 15% (2-year vesting)</li>
                    <li>Development Fund: 20%</li>
                    <li>Marketing: 15%</li>
                    <li>Liquidity Pool: 10%</li>
                  </ul>
                </div>

                <div className="whitepaper-section">
                  <h2 className="font-heading text-xl mb-3">Roadmap</h2>
                  <div className="roadmap-timeline">
                    <div className="roadmap-item">
                      <h3 className="font-heading text-lg mb-2">Phase 1: Foundation</h3>
                      <p className="text-sm opacity-80 font-body">
                        Platform development, smart contract deployment, and initial liquidity provision
                      </p>
                    </div>
                    <div className="roadmap-item">
                      <h3 className="font-heading text-lg mb-2">Phase 2: Growth</h3>
                      <p className="text-sm opacity-80 font-body">
                        Cross-chain integration, advanced trading features, and community expansion
                      </p>
                    </div>
                    <div className="roadmap-item">
                      <h3 className="font-heading text-lg mb-2">Phase 3: Innovation</h3>
                      <p className="text-sm opacity-80 font-body">
                        DeFi ecosystem expansion, governance implementation, and institutional partnerships
                      </p>
                    </div>
                  </div>
                </div>

                <div className="whitepaper-section">
                  <h2 className="font-heading text-xl mb-3">Security Measures</h2>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Multi-signature wallet implementation</li>
                    <li>Regular security audits by leading firms</li>
                    <li>Automated risk management systems</li>
                    <li>Insurance fund for user protection</li>
                    <li>24/7 monitoring and incident response</li>
                  </ul>
                </div>

                <div className="whitepaper-section">
                  <h2 className="font-heading text-xl mb-3">Governance</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    The Dex Airdrop implements a decentralized governance system where $DEX token holders can:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Propose and vote on platform upgrades</li>
                    <li>Participate in treasury management</li>
                    <li>Influence fee structures and parameters</li>
                    <li>Elect community representatives</li>
                  </ul>
                </div>

                <div className="whitepaper-section">
                  <h2 className="font-heading text-xl mb-3">Risk Factors</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    Users should be aware of the following risks:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Cryptocurrency market volatility</li>
                    <li>Smart contract vulnerabilities</li>
                    <li>Regulatory changes</li>
                    <li>Technical risks and network issues</li>
                    <li>Competition from other platforms</li>
                  </ul>
                </div>

                <div className="whitepaper-section">
                  <h2 className="font-heading text-xl mb-3">Legal Disclaimer</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    This whitepaper is for informational purposes only and does not constitute financial advice. Users should conduct their own research and consult with financial advisors before making any investment decisions.
                  </p>
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <Link href="/" className="btn-accent">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 
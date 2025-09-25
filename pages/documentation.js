import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Documentation() {
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
        <title>Documentation | The Nexus Airdrop</title>
        <meta name="description" content="Comprehensive documentation for The Nexus Airdrop platform - Learn about features, integration, and technical specifications." />
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
        
        .doc-section {
          padding: 1.5rem;
          background: ${config.cardBg};
          border-radius: 16px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
          margin-bottom: 1rem;
        }
        
        .doc-section:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
        }

        .code-block {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 1rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.875rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin: 1rem 0;
        }

        .feature-item {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
        }

        .feature-item:hover {
          transform: translateY(-4px);
          border-color: ${config.accentColor}40;
        }

        .nav-tabs {
          border-bottom: 1px solid ${config.cardBorder};
          margin-bottom: 1.5rem;
        }

        .nav-tabs .nav-link {
          color: ${config.textColor};
          opacity: 0.7;
          border: none;
          padding: 0.75rem 1.5rem;
          transition: var(--transition);
        }

        .nav-tabs .nav-link:hover {
          opacity: 1;
          color: ${config.accentColor};
        }

        .nav-tabs .nav-link.active {
          color: ${config.accentColor};
          opacity: 1;
          border-bottom: 2px solid ${config.accentColor};
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
          
          .doc-section {
            padding: 1.25rem;
            margin-bottom: 0.75rem;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .nav-tabs .nav-link {
            padding: 0.5rem 1rem;
          }
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
                  <h1 className="text-white mb-0 font-display">Documentation</h1>
                </div>

                <div className="doc-section">
                  <h2 className="font-heading text-xl mb-3">Getting Started</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    Welcome to The Nexus Airdrop documentation. This guide will help you understand and integrate with our platform.
                  </p>
                  <div className="code-block">
                    <pre className="text-sm opacity-80 font-body">
                      <code>
                        npm install @dextrojan/sdk
                        # or
                        yarn add @dextrojan/sdk
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="doc-section">
                  <h2 className="font-heading text-xl mb-3">Core Features</h2>
                  <div className="feature-grid">
                    <div className="feature-item">
                      <h3 className="font-heading text-lg mb-2">Smart Order Routing</h3>
                      <p className="text-sm opacity-80 font-body">
                        Advanced order routing system that finds the best prices across multiple DEXs
                      </p>
                    </div>
                    <div className="feature-item">
                      <h3 className="font-heading text-lg mb-2">Liquidity Aggregation</h3>
                      <p className="text-sm opacity-80 font-body">
                        Access to aggregated liquidity pools for better trading execution
                      </p>
                    </div>
                    <div className="feature-item">
                      <h3 className="font-heading text-lg mb-2">MEV Protection</h3>
                      <p className="text-sm opacity-80 font-body">
                        Built-in protection against front-running and sandwich attacks
                      </p>
                    </div>
                    <div className="feature-item">
                      <h3 className="font-heading text-lg mb-2">Cross-Chain Support</h3>
                      <p className="text-sm opacity-80 font-body">
                        Seamless trading across multiple blockchain networks
                      </p>
                    </div>
                  </div>
                </div>

                <div className="doc-section">
                  <h2 className="font-heading text-xl mb-3">API Reference</h2>
                  <div className="nav-tabs">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link active" href="#authentication">Authentication</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#trading">Trading</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#liquidity">Liquidity</a>
                      </li>
                    </ul>
                  </div>
                  <div className="code-block">
                    <pre className="text-sm opacity-80 font-body">
                      <code>{`
const { DexTrojan } = require('@dextrojan/sdk');

const dex = new DexTrojan({
  apiKey: 'your-api-key',
  network: 'mainnet'
});

// Initialize trading
await dex.initialize();
                      `}</code>
                    </pre>
                  </div>
                </div>

                <div className="doc-section">
                  <h2 className="font-heading text-xl mb-3">Security</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    Security is our top priority. Our platform implements multiple layers of protection:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>End-to-end encryption for all communications</li>
                    <li>Multi-signature wallet support</li>
                    <li>Rate limiting and DDoS protection</li>
                    <li>Regular security audits and penetration testing</li>
                  </ul>
                </div>

                <div className="doc-section">
                  <h2 className="font-heading text-xl mb-3">Best Practices</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    Follow these best practices to ensure optimal performance and security:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Always verify transaction details before signing</li>
                    <li>Keep your API keys secure and rotate them regularly</li>
                    <li>Implement proper error handling in your integration</li>
                    <li>Monitor your application's performance and logs</li>
                  </ul>
                </div>

                <div className="doc-section">
                  <h2 className="font-heading text-xl mb-3">Support</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    Need help? Our support team is available through:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Technical Documentation: docs.dexairdrop.com</li>
                    <li>GitHub: github.com/dextrojan</li>
                    <li>Discord: discord.gg/dextrojan</li>
                    <li>Email: support@dexairdrop.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 
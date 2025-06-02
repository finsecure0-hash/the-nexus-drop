import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function PrivacyPolicy() {
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
        <title>Privacy Policy | The Dex Trojan</title>
        <meta name="description" content="Privacy Policy for The Dex Trojan - Learn how we collect, use, and protect your personal information." />
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
        
        .policy-section {
          padding: 1.5rem;
          background: ${config.cardBg};
          border-radius: 16px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
          margin-bottom: 1rem;
        }
        
        .policy-section:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
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
          
          .policy-section {
            padding: 1.25rem;
            margin-bottom: 0.75rem;
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
                  <h1 className="text-white mb-0 font-display">Privacy Policy</h1>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">1. Introduction</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    At The Dex Trojan, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our decentralized exchange platform and related services.
                  </p>
                  <p className="text-sm opacity-80 font-body">
                    By using our services, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">2. Information We Collect</h2>
                  <h3 className="font-heading text-lg mb-2">2.1 Wallet Information</h3>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    When you connect your Solana wallet to our platform, we collect:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Public wallet address</li>
                    <li>Transaction history related to our platform</li>
                    <li>Token balances and holdings</li>
                  </ul>

                  <h3 className="font-heading text-lg mb-2">2.2 Usage Data</h3>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    We collect information about how you interact with our platform:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Transaction timestamps</li>
                    <li>Platform features used</li>
                    <li>Error logs and performance data</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">3. How We Use Your Information</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    We use the collected information for various purposes:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>To provide and maintain our services</li>
                    <li>To process your transactions</li>
                    <li>To detect and prevent fraud</li>
                    <li>To improve our platform</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">4. Data Security</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    We implement appropriate security measures to protect your information:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Encryption of sensitive data</li>
                    <li>Regular security audits</li>
                    <li>Access controls and authentication</li>
                    <li>Secure data storage practices</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">5. Your Rights</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Access your personal information</li>
                    <li>Request correction of your data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to data processing</li>
                    <li>Data portability</li>
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
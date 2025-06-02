import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function TermsOfService() {
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
        <title>Terms of Service | The Dex Trojan</title>
        <meta name="description" content="Terms of Service for The Dex Trojan - Learn about the rules and guidelines for using our decentralized exchange platform." />
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
                  <h1 className="text-white mb-0 font-display">Terms of Service</h1>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">1. Agreement to Terms</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    By accessing or using The Dex Trojan platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                  </p>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">2. Use License</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    Permission is granted to temporarily use The Dex Trojan platform for personal, non-commercial purposes. This license does not include:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Modifying or copying the platform's materials</li>
                    <li>Using the materials for commercial purposes</li>
                    <li>Attempting to reverse engineer any software</li>
                    <li>Removing any copyright or proprietary notations</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">3. User Responsibilities</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    As a user of The Dex Trojan platform, you agree to:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your wallet and credentials</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Not engage in any fraudulent or malicious activities</li>
                    <li>Not attempt to manipulate the platform or its services</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">4. Risk Disclosure</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    Trading cryptocurrencies involves significant risk. You acknowledge and agree that:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Cryptocurrency prices are highly volatile</li>
                    <li>Past performance is not indicative of future results</li>
                    <li>You are solely responsible for your trading decisions</li>
                    <li>You should never invest more than you can afford to lose</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">5. Platform Rules</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    When using our platform, you must:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Follow all trading rules and guidelines</li>
                    <li>Not engage in market manipulation</li>
                    <li>Not use automated trading bots without permission</li>
                    <li>Not attempt to exploit platform vulnerabilities</li>
                    <li>Report any suspicious activities</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">6. Limitation of Liability</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    The Dex Trojan shall not be liable for any:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Direct, indirect, or consequential losses</li>
                    <li>Loss of profits or data</li>
                    <li>Service interruptions or technical issues</li>
                    <li>Actions of third parties</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h2 className="font-heading text-xl mb-3">7. Changes to Terms</h2>
                  <p className="text-sm opacity-80 mb-3 font-body">
                    We reserve the right to modify these terms at any time. We will notify users of any material changes via:
                  </p>
                  <ul className="list-disc pl-5 mb-3 text-sm opacity-80 font-body">
                    <li>Platform announcements</li>
                    <li>Email notifications</li>
                    <li>Social media updates</li>
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
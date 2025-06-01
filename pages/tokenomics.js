import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';

export default function Tokenomics() {
  const [config] = useState({
    name: '$DEX',
    image: '/logo/favicon.png',
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
        <title>{config.name} Tokenomics | Token Distribution & Utility</title>
        <meta name="description" content={`Learn about ${config.name} token distribution, utility, and roadmap.`} />
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
          height: 100%;
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
        
        .distribution-item {
          padding: 1.5rem;
          background: ${config.cardBg};
          border-radius: 16px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
          margin-bottom: 1rem;
        }
        
        .distribution-item:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
        }
        
        .utility-item {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          background: ${config.cardBg};
          border-radius: 16px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
          margin-bottom: 1rem;
        }
        
        .utility-item:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
        }
        
        .utility-icon {
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
        
        .utility-item:hover .utility-icon {
          background: ${config.accentColor}40;
          transform: scale(1.1);
        }
        
        .vesting-timeline {
          position: relative;
          padding-left: 2rem;
        }
        
        .timeline-item {
          position: relative;
          padding-bottom: 2rem;
        }
        
        .timeline-dot {
          position: absolute;
          left: -2rem;
          width: 1rem;
          height: 1rem;
          background: ${config.accentColor};
          border-radius: 50%;
        }
        
        .timeline-item:not(:last-child)::before {
          content: '';
          position: absolute;
          left: -1.5rem;
          top: 1rem;
          bottom: 0;
          width: 2px;
          background: ${config.accentColor}40;
        }
        
        .timeline-content {
          padding: 1.5rem;
          background: ${config.cardBg};
          border-radius: 16px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
        }
        
        .timeline-content:hover {
          transform: translateX(8px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
        }
        
        .text-accent {
          color: ${config.accentColor};
        }
        
        .bg-accent {
          background: ${config.accentColor};
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
          
          .distribution-item,
          .utility-item,
          .timeline-content {
            padding: 1.25rem;
            margin-bottom: 0.75rem;
          }

          .utility-item {
            flex-direction: column;
            text-align: center;
          }

          .utility-icon {
            margin: 0 auto 1rem;
          }

          .vesting-timeline {
            padding-left: 1.5rem;
          }

          .timeline-dot {
            left: -1.5rem;
            width: 0.75rem;
            height: 0.75rem;
          }

          .timeline-item:not(:last-child)::before {
            left: -1.25rem;
          }

          .row {
            margin-left: -0.5rem;
            margin-right: -0.5rem;
          }

          .col-md-6 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }

          .g-4 {
            --bs-gutter-x: 0.5rem;
            --bs-gutter-y: 0.5rem;
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
        }

        @media (max-width: 480px) {
          :root {
            --container-padding: 0.75rem;
          }

          .glass-card {
            padding: 1rem !important;
          }

          .distribution-item,
          .utility-item,
          .timeline-content {
            padding: 1rem;
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
                  <h1 className="text-white mb-0 font-display">Tokenomics</h1>
                </div>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="glass-card p-4">
                      <h3 className="text-white mb-4 font-heading">Token Distribution</h3>
                      
                      <div className="distribution-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="font-heading">Community & Airdrop</span>
                          <span className="text-accent font-display">40%</span>
                        </div>
                        <div className="progress mt-2" style={{ height: '8px' }}>
                          <div className="progress-bar bg-accent" style={{ width: '40%' }}></div>
                        </div>
                        <p className="opacity-80 mt-2 mb-0 font-body">Initial distribution to early supporters and community members through airdrops and rewards programs</p>
                      </div>

                      <div className="distribution-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="font-heading">Development</span>
                          <span className="text-accent font-display">30%</span>
                        </div>
                        <div className="progress mt-2" style={{ height: '8px' }}>
                          <div className="progress-bar bg-accent" style={{ width: '30%' }}></div>
                        </div>
                        <p className="opacity-80 mt-2 mb-0 font-body">Funds allocated for ongoing development, protocol improvements, and technical infrastructure</p>
                      </div>

                      <div className="distribution-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="font-heading">Team</span>
                          <span className="text-accent font-display">20%</span>
                        </div>
                        <div className="progress mt-2" style={{ height: '8px' }}>
                          <div className="progress-bar bg-accent" style={{ width: '20%' }}></div>
                        </div>
                        <p className="opacity-80 mt-2 mb-0 font-body">Reserved for team members with a vesting schedule to ensure long-term alignment</p>
                      </div>

                      <div className="distribution-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="font-heading">Marketing</span>
                          <span className="text-accent font-display">10%</span>
                        </div>
                        <div className="progress mt-2" style={{ height: '8px' }}>
                          <div className="progress-bar bg-accent" style={{ width: '10%' }}></div>
                        </div>
                        <p className="opacity-80 mt-2 mb-0 font-body">Strategic marketing initiatives, partnerships, and community growth programs</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="glass-card p-4">
                      <h3 className="text-white mb-4 font-heading">Token Utility</h3>
                      
                      <div className="utility-item">
                        <div className="utility-icon">🎯</div>
                        <div>
                          <h5 className="font-display mb-2">Governance</h5>
                          <p className="opacity-80 mb-0 font-body">Vote on protocol upgrades and parameter changes</p>
                        </div>
                      </div>

                      <div className="utility-item">
                        <div className="utility-icon">💰</div>
                        <div>
                          <h5 className="font-display mb-2">Staking Rewards</h5>
                          <p className="opacity-80 mb-0 font-body">Earn rewards by staking your tokens</p>
                        </div>
                      </div>

                      <div className="utility-item">
                        <div className="utility-icon">⚡</div>
                        <div>
                          <h5 className="font-display mb-2">Platform Fees</h5>
                          <p className="opacity-80 mb-0 font-body">Pay for platform services and features</p>
                        </div>
                      </div>

                      <div className="utility-item">
                        <div className="utility-icon">🔒</div>
                        <div>
                          <h5 className="font-display mb-2">Security</h5>
                          <p className="opacity-80 mb-0 font-body">Enhanced security features and access control</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4 mt-4">
                  <h3 className="text-white mb-4 font-heading">Vesting Schedule</h3>
                  
                  <div className="vesting-timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h5 className="font-display mb-2">Token Generation Event</h5>
                        <p className="opacity-80 mb-0 font-body">Initial token distribution and airdrop</p>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h5 className="font-display mb-2">6 Months</h5>
                        <p className="opacity-80 mb-0 font-body">25% of team tokens unlock</p>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h5 className="font-display mb-2">12 Months</h5>
                        <p className="opacity-80 mb-0 font-body">50% of team tokens unlock</p>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h5 className="font-display mb-2">24 Months</h5>
                        <p className="opacity-80 mb-0 font-body">100% of team tokens unlock</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 
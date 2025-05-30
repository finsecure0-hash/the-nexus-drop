import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function About() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      title: "Lightning Fast Execution",
      description: "Our bot executes trades in milliseconds, ensuring you never miss a profitable opportunity.",
      icon: "⚡"
    },
    {
      title: "Advanced AI Analysis",
      description: "Powered by cutting-edge AI algorithms that analyze market patterns 24/7.",
      icon: "🤖"
    },
    {
      title: "Risk Management",
      description: "Built-in risk management protocols to protect your investments.",
      icon: "🛡️"
    },
    {
      title: "Real-time Monitoring",
      description: "Monitor your trades and portfolio performance in real-time.",
      icon: "📊"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Trades Executed", value: "1M+" },
    { label: "Success Rate", value: "98.5%" },
    { label: "Response Time", value: "<100ms" }
  ];

  return (
    <>
      <Head>
        <title>About The Dex Trojan | Advanced Solana Trading Bot</title>
        <meta name="description" content="Learn about The Dex Trojan - The most advanced Solana trading bot with AI-powered analysis and lightning-fast execution." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar />

      <main className="container py-5">
        <div className="row justify-content-center g-4">
          <div className="col-lg-10">
            <div className="glass-card p-4 p-md-5">
              <div className="text-center mb-5">
                <h1 className="font-display text-4xl mb-3 text-white">About The Dex Trojan</h1>
                <p className="text-lg text-white opacity-90">
                  Revolutionizing Solana trading with AI-powered automation
                </p>
              </div>

              <div className="row g-4 mb-5">
                {stats.map((stat, index) => (
                  <div key={index} className="col-6 col-md-3">
                    <div className="glass-card p-3 text-center">
                      <div className="text-gradient text-2xl mb-2">{stat.value}</div>
                      <div className="text-sm text-white opacity-90">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-4 mb-5">
                {features.map((feature, index) => (
                  <div key={index} className="col-md-6">
                    <div className="glass-card p-4 h-100">
                      <div className="text-3xl mb-3">{feature.icon}</div>
                      <h3 className="font-display text-xl mb-2 text-white">{feature.title}</h3>
                      <p className="text-white opacity-90 mb-0">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card p-4 mb-5">
                <h2 className="text-gradient mb-4">How It Works</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="step-card">
                      <div className="text-2xl mb-3 text-white">1</div>
                      <h4 className="font-display text-lg mb-2 text-white">Connect Your Wallet</h4>
                      <p className="text-white opacity-90 mb-0">
                        Securely connect your Solana wallet to get started
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="step-card">
                      <div className="text-2xl mb-3 text-white">2</div>
                      <h4 className="font-display text-lg mb-2 text-white">Set Parameters</h4>
                      <p className="text-white opacity-90 mb-0">
                        Configure your trading preferences and risk levels
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="step-card">
                      <div className="text-2xl mb-3 text-white">3</div>
                      <h4 className="font-display text-lg mb-2 text-white">Start Trading</h4>
                      <p className="text-white opacity-90 mb-0">
                        Let our AI handle the trading while you monitor
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/" className="btn btn-accent me-3 text-white font-body">
                  Back to Home
                </Link>
                <Link href="/contact" className="btn btn-accent text-white font-body">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, #00F5A0, #FF3366);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .font-body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }
      `}</style>
    </>
  );
} 
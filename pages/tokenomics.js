import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import Navbar from '../components/Navbar';
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function Tokenomics() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Trading Rewards', 'Development', 'Team', 'Marketing', 'Liquidity', 'Community'],
          datasets: [{
            data: [40, 20, 15, 10, 10, 5],
            backgroundColor: [
              '#00F5A0',
              '#FF3366',
              '#6C5CE7',
              '#00B8D9',
              '#FFB800',
              '#FF6B6B'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#FFFFFF',
                padding: 20,
                font: {
                  size: 14,
                  family: "'Space Grotesk', sans-serif"
                }
              }
            },
            tooltip: {
              titleColor: '#FFFFFF',
              bodyColor: '#FFFFFF',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderColor: '#00F5A0',
              borderWidth: 1,
              padding: 12,
              font: {
                family: "'Space Grotesk', sans-serif"
              }
            }
          },
          cutout: '70%'
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const tokenomicsData = [
    {
      title: "Total Supply",
      value: "1,000,000,000",
      description: "Fixed supply with no additional minting"
    },
    {
      title: "Initial Price",
      value: "$0.0001",
      description: "Starting price per token"
    },
    {
      title: "Market Cap",
      value: "$100,000",
      description: "Initial market capitalization"
    },
    {
      title: "Liquidity Lock",
      value: "2 Years",
      description: "Locked liquidity period"
    }
  ];

  const distributionDetails = [
    {
      category: "Trading Rewards",
      percentage: "40%",
      description: "Distributed to active traders and liquidity providers"
    },
    {
      category: "Development",
      percentage: "20%",
      description: "Funds for ongoing development and improvements"
    },
    {
      category: "Team",
      percentage: "15%",
      description: "Team allocation with 2-year vesting period"
    },
    {
      category: "Marketing",
      percentage: "10%",
      description: "Marketing and community growth initiatives"
    },
    {
      category: "Liquidity",
      percentage: "10%",
      description: "Initial liquidity pool and reserves"
    },
    {
      category: "Community",
      percentage: "5%",
      description: "Community rewards and airdrops"
    }
  ];

  return (
    <>
      <Head>
        <title>Tokenomics | The Dex Trojan</title>
        <meta name="description" content="Learn about The Dex Trojan token distribution, supply, and economic model." />
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
                <h1 className="font-display text-4xl mb-3 text-white">Tokenomics</h1>
                <p className="text-lg text-white opacity-90 font-body">
                  Understanding our token distribution and economic model
                </p>
              </div>

              <div className="row g-4 mb-5">
                {tokenomicsData.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-3">
                    <div className="glass-card p-4 text-center h-100">
                      <h3 className="font-display text-lg mb-2 text-white">{item.title}</h3>
                      <div className="text-gradient text-2xl mb-2 font-display">{item.value}</div>
                      <p className="text-white opacity-90 mb-0 font-body">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-4 mb-5">
                <div className="col-lg-6">
                  <div className="glass-card p-4">
                    <h2 className="text-gradient mb-4 font-display">Token Distribution</h2>
                    <div style={{ height: '400px' }}>
                      <canvas ref={chartRef}></canvas>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="glass-card p-4 h-100">
                    <h2 className="text-gradient mb-4 font-display">Distribution Details</h2>
                    <div className="distribution-list">
                      {distributionDetails.map((item, index) => (
                        <div key={index} className="distribution-item mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h4 className="font-display text-lg mb-0 text-white">{item.category}</h4>
                            <span className="text-gradient font-display">{item.percentage}</span>
                          </div>
                          <p className="text-white opacity-90 mb-0 font-body">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 mb-5">
                <h2 className="text-gradient mb-4 font-display">Token Utility</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="step-card">
                      <div className="text-2xl mb-3 text-white">💎</div>
                      <h4 className="font-display text-lg mb-2 text-white">Trading Fees</h4>
                      <p className="text-white opacity-90 mb-0 font-body">
                        Reduced trading fees for token holders
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="step-card">
                      <div className="text-2xl mb-3 text-white">🎯</div>
                      <h4 className="font-display text-lg mb-2 text-white">Governance</h4>
                      <p className="text-white opacity-90 mb-0 font-body">
                        Participate in platform decisions
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="step-card">
                      <div className="text-2xl mb-3 text-white">🌟</div>
                      <h4 className="font-display text-lg mb-2 text-white">Rewards</h4>
                      <p className="text-white opacity-90 mb-0 font-body">
                        Earn rewards for platform usage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/" className="btn btn-accent text-white font-body">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .distribution-item {
          padding: 1rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .distribution-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(8px);
        }

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
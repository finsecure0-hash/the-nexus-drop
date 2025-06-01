import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const WalletConnect = dynamic(() => import('./WalletConnect'), { ssr: false });

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          <Link href="/" className="navbar-brand">
            <span className="text-white font-display">The Dex Trojan</span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link text-white font-body">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/claim-status" className="nav-link text-white font-body">
                  Claim Status
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/tokenomics" className="nav-link text-white font-body">
                  Tokenomics
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link text-white font-body">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="ms-auto">
              {mounted && <WalletConnect />}
            </div>
          </div>
        </div>

        <style jsx>{`
          .navbar {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
          }

          .navbar-brand {
            font-size: 1.5rem;
            text-decoration: none;
          }

          .nav-link {
            padding: 0.75rem 1.25rem;
            transition: all 0.3s ease;
            font-size: 1.1rem;
            text-align: center;
          }

          .nav-link:hover {
            color: #00F5A0 !important;
            transform: translateY(-2px);
          }

          .navbar-toggler {
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.5rem;
          }

          .navbar-toggler:focus {
            box-shadow: none;
            border-color: #00F5A0;
          }

          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
          }

          @media (max-width: 991.98px) {
            .navbar-collapse {
              background: rgba(0, 0, 0, 0.95);
              padding: 1.5rem;
              border-radius: 12px;
              margin-top: 1rem;
              box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .navbar-nav {
              gap: 0.5rem;
            }

            .nav-item {
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .nav-item:last-child {
              border-bottom: none;
            }

            .nav-link {
              padding: 1rem;
              display: block;
              width: 100%;
            }

            .ms-auto {
              margin-top: 1rem;
              padding-top: 1rem;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
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
      </nav>
    </>
  );
} 
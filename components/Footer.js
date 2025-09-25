import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-3">
              <Image 
                src="/logo/2.png" 
                alt="DEX Logo" 
                width={40} 
                height={40}
                className="me-2"
              />
              <h5 className="font-display mb-0">The Nexus Airdrop</h5>
            </div>
            <p className="text-sm opacity-60 mb-3 font-body">
              Join the future of decentralized exchange. Claim your $DEX tokens and be part of the revolution.
            </p>
            <div className="d-flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                <i className="bi bi-twitter-x" style={{ fontSize: '1.25rem' }}></i>
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                <i className="bi bi-telegram" style={{ fontSize: '1.25rem' }}></i>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                <i className="bi bi-discord" style={{ fontSize: '1.25rem' }}></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                <i className="bi bi-github" style={{ fontSize: '1.25rem' }}></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4">
            <h6 className="font-heading mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/tokenomics" className="text-white opacity-60 hover:opacity-100 transition-opacity text-sm font-body">
                  Tokenomics
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/claim-status" className="text-white opacity-60 hover:opacity-100 transition-opacity text-sm font-body">
                  Claim Status
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-white opacity-60 hover:opacity-100 transition-opacity text-sm font-body">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-4">
            <h6 className="font-heading mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/documentation" className="text-white opacity-60 hover:opacity-100 transition-opacity text-sm font-body">
                  Documentation
                </a>
              </li>
              <li className="mb-2">
                <a href="/whitepaper" className="text-white opacity-60 hover:opacity-100 transition-opacity text-sm font-body">
                  Whitepaper
                </a>
              </li>
           
            </ul>
          </div>
   
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-sm opacity-60 mb-0 font-body">
              &copy; 2025 The Nexus Airdrop. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <Link href="/privacy-policy" className="text-white opacity-60 hover:opacity-100 transition-opacity text-sm font-body">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-white opacity-60 hover:opacity-100 transition-opacity text-sm font-body">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-white opacity-60 hover:opacity-100 transition-opacity text-sm font-body">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';

function WalletConnect() {
  const { publicKey, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    const start = address.slice(0, 4);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };

  return (
    <div className="wallet-connect-container">
      {publicKey ? (
        <div className="connected-wallet glass-card p-3 d-flex align-items-center">
          <div className="connected-indicator me-2"></div>
          <div className="wallet-info">
            <div className="d-flex align-items-center">
              <span className="font-body text-sm opacity-80 me-2">Connected:</span>
              <span 
                className="font-body text-sm wallet-address" 
                onClick={copyAddress}
                title="Click to copy full address"
              >
                {formatAddress(publicKey.toBase58())}
                {copied && <span className="copied-indicator ms-2">Copied!</span>}
              </span>
            </div>
            <button 
              onClick={disconnect} 
              className="disconnect-btn text-xs mt-1"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <WalletMultiButton className="wallet-connect-btn" />
      )}

      <style jsx>{`
        .wallet-connect-container {
          position: relative;
        }
        
        .connected-wallet {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 12px;
          cursor: default;
        }
        
        .connected-indicator {
          width: 8px;
          height: 8px;
          background-color: #22C55E;
          border-radius: 50%;
          margin-right: 8px;
          position: relative;
        }
        
        .connected-indicator::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: rgba(34, 197, 94, 0.3);
          border-radius: 50%;
          top: -2px;
          left: -2px;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        .wallet-address {
          font-family: 'Plus Jakarta Sans', monospace;
          color: #E2E8F0;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .wallet-address:hover {
          color: #ffffff;
        }
        
        .copied-indicator {
          font-size: 0.7rem;
          color: #22C55E;
          opacity: 0.9;
        }
        
        .disconnect-btn {
          background: none;
          border: none;
          color: rgba(226, 232, 240, 0.6);
          padding: 0;
          font-size: 0.75rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .disconnect-btn:hover {
          color: rgba(226, 232, 240, 0.9);
          text-decoration: underline;
        }
        
        /* Override default WalletMultiButton styles */
        :global(.wallet-connect-btn) {
          background: linear-gradient(90deg, #22C55E, #4ADE80) !important;
          border: none !important;
          border-radius: 8px !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-weight: 600 !important;
          padding: 0 16px !important;
          height: 40px !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15) !important;
        }
        
        :global(.wallet-connect-btn:hover) {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.25) !important;
        }
        
        :global(.wallet-connect-btn .wallet-adapter-button-start-icon) {
          margin-right: 8px !important;
        }
      `}</style>
    </div>
  );
}

export default WalletConnect;
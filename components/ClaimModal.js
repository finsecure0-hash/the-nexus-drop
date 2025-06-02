import { useState, useEffect } from 'react';

export default function ClaimModal({ isOpen, onClose, onClaimComplete }) {
  const [countdown, setCountdown] = useState(10);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen && !isComplete) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsComplete(true);
            onClaimComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, isComplete, onClaimComplete]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!isComplete ? (
          <>
            <h2 className="text-white mb-4 font-display">Claiming Airdrop</h2>
            <div className="countdown-container">
              <div className="countdown-circle">
                <span className="countdown-number">{countdown}</span>
              </div>
              <p className="text-white opacity-80 mt-3 font-body">Processing your claim...</p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-white mb-4 font-display">Success!</h2>
            <div className="success-container">
              <div className="success-icon">✓</div>
              <p className="text-white opacity-80 mt-3 font-body">
                1,000 $DEX tokens have been airdropped to your wallet
              </p>
              <p className="text-white opacity-80 mt-2 font-body">
                Congratulations! You are now part of the $DEX community.
              </p>
            </div>
            <button 
              className="btn btn-accent mt-4"
              onClick={onClose}
            >
              Close
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: #1A1B1E;
          border-radius: 24px;
          padding: 2rem;
          text-align: center;
          max-width: 400px;
          width: 90%;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .countdown-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .countdown-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid #00F5A0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem 0;
        }

        .countdown-number {
          font-size: 3rem;
          font-weight: 700;
          color: #00F5A0;
          font-family: 'Space Grotesk', sans-serif;
        }

        .success-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #00F5A0;
          color: #1A1B1E;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: bold;
          margin: 1rem 0;
        }

        .btn-accent {
          background: #00F5A0;
          color: #1A1B1E;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 245, 160, 0.3);
        }
      `}</style>
    </div>
  );
} 
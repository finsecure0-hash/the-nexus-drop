import Head from 'next/head';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';

export default function FAQ() {
  const config = {
    backgroundColor: '#0A0B0E',
    textColor: '#FFFFFF',
    accentColor: '#00F5A0',
    cardBg: 'rgba(255, 255, 255, 0.02)',
    cardBorder: 'rgba(255, 255, 255, 0.05)',
  };

  return (
    <>
      <Head>
        <title>FAQ | NEXUS Airdrop</title>
        <meta name="description" content="Frequently asked questions about the NEXUS airdrop. Get answers to common questions about eligibility, claiming, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo/2.png" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      <style jsx global>{`
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: ${config.backgroundColor};
          min-height: 100vh;
          color: ${config.textColor};
        }
        
        .glass-card {
          background: ${config.cardBg};
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid ${config.cardBorder};
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .accordion-button {
          background: ${config.cardBg};
          border: 1px solid ${config.cardBorder};
          color: ${config.textColor};
          border-radius: 12px !important;
          padding: 1rem 1.5rem;
          font-weight: 600;
        }
        
        .accordion-button:not(.collapsed) {
          background: ${config.cardBg};
          border-color: ${config.accentColor}40;
          color: ${config.textColor};
        }
        
        .accordion-button:focus {
          box-shadow: none;
          border-color: ${config.accentColor}40;
        }
        
        .accordion-body {
          background: ${config.cardBg};
          border: 1px solid ${config.cardBorder};
          border-top: none;
          border-radius: 0 0 12px 12px;
          padding: 1rem 1.5rem;
        }
        
        .btn-accent {
          background: ${config.accentColor};
          border: none;
          color: #000;
          font-weight: 600;
          padding: 0.75rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .btn-accent:hover {
          background: #00D48A;
          color: #000;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="glass-card p-5">
              <div className="text-center mb-5">
                <h1 className="mb-3">Frequently Asked Questions</h1>
                <p className="text-white-50">Get answers to common questions about the NEXUS airdrop</p>
              </div>

              <div className="accordion" id="faqAccordion">
                <div className="accordion-item bg-transparent border-0 mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      What is the minimum SOL requirement for the NEXUS airdrop?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-white-75">
                      You need to hold at least 0.1 SOL in your wallet to be eligible for the NEXUS airdrop. The more SOL you hold, the larger your allocation will be.
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent border-0 mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      How is my NEXUS allocation calculated?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-white-75">
                      Your NEXUS allocation is based on your SOL balance at the time of the snapshot. The formula is approximately 1000 NEXUS tokens per SOL held, with a minimum of 0.1 SOL required for eligibility.
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent border-0 mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      Which wallets are supported?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-white-75">
                      We support Phantom and Solflare wallets. Make sure you're using one of these supported wallets to connect and claim your airdrop.
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent border-0 mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                      Can I claim multiple times from different wallets?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-white-75">
                      Each eligible wallet can only claim once. If you have multiple wallets that meet the criteria, each can claim their respective allocation.
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent border-0 mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                      What are the transaction fees?
                    </button>
                  </h2>
                  <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-white-75">
                      A small Solana network fee (approximately 0.005 SOL) is required to process the claim transaction. Make sure you have sufficient SOL in your wallet to cover this fee.
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent border-0 mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">
                      What is NEXUS and what can I do with the tokens?
                    </button>
                  </h2>
                  <div id="faq6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-white-75">
                      NEXUS is the decentralized hub for AI-driven financial services on Solana. The tokens can be used for governance, accessing premium features, and participating in the ecosystem's growth.
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent border-0 mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq7">
                      I'm not eligible, what can I do?
                    </button>
                  </h2>
                  <div id="faq7" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-white-75">
                      If you're not eligible for this airdrop, consider acquiring at least 0.1 SOL for future opportunities. Stay connected with our community on Discord and Twitter for updates on future events and opportunities.
                    </div>
                  </div>
                </div>

                <div className="accordion-item bg-transparent border-0">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq8">
                      How do I get support if I have issues?
                    </button>
                  </h2>
                  <div id="faq8" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-white-75">
                      You can reach out to our support team through our Discord server or Telegram channel. Our community moderators and support team are available to help with any issues you might encounter.
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-5">
                <Link href="/" className="btn-accent me-3">
                  Back to Home
                </Link>
                <Link href="/claim-status" className="btn-accent">
                  Check Claim Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
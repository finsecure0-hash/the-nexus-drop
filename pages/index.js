import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

// Dynamically import WalletConnect to disable SSR
const WalletConnect = dynamic(() => import('../components/WalletConnect'), { ssr: false })

// Solana network configuration
const network = clusterApiUrl('mainnet-beta') // Use 'devnet' for testing

export default function Home() {
  const [name, setName] = useState('$DEX')
  const [image, setImage] = useState('/images/dex-logo.png') // Update with your logo path
  const [heading, setHeading] = useState('Welcome to the $DEX Airdrop!')
  const [paragraph, setParagraph] = useState(
    'Claim your $DEX tokens by connecting your Solana wallet and following the steps below.'
  )

  // Supported Solana wallets
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ]

  return (
    <>
      <Head>
        <title>$DEX Airdrop</title>
        <meta name="description" content="Claim your $DEX tokens today!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      {/* Solana Wallet Providers */}
      <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
              {/* Navbar */}
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                  <a className="navbar-brand" href="#">
                    <Image src={image} alt="$DEX Logo" width={40} height={40} className="d-inline-block align-text-top" />
                    <span className="ms-2">$DEX Airdrop</span>
                  </a>
                </div>
              </nav>

              {/* Main Content */}
              <main className="container py-5">
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-md-10 col-12">
                    <div className="card bg-dark text-white border border-white">
                      <div className="card-body text-center">
                        <Image src={image} alt="$DEX Logo" width={100} height={100} className="mb-4" />
                        <h1 className="card-title mb-4">{heading}</h1>
                        <p className="card-text mb-4">{paragraph}</p>

                        {/* Wallet Connect Section */}
                        <div className="my-4">
                          <WalletConnect />
                        </div>

                        {/* Eligibility Criteria */}
                        <div className="text-start mt-4">
                          <h3>Eligibility Criteria</h3>
                          <ul className="list-unstyled">
                            <li className="mb-2">✅ Hold at least 0.1 SOL in your wallet.</li>
                            <li className="mb-2">✅ Wallet must have at least 5 transactions.</li>
                            <li className="mb-2">✅ Connect your Solana wallet to verify eligibility.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              {/* Footer */}
              <footer className="bg-dark text-white text-center py-3">
                <p className="mb-0">&copy; 2023 $DEX. All rights reserved.</p>
              </footer>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}
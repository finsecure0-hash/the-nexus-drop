import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import 'bootstrap/dist/css/bootstrap.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import '../styles/globals.css'
import '../styles/global.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  const network = process.env.NEXT_PUBLIC_RPC_ENDPOINT || clusterApiUrl(WalletAdapterNetwork.Mainnet)
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ]

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div className={inter.className}>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp
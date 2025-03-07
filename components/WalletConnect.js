import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

function WalletConnect() {
  const { publicKey, disconnect } = useWallet()

  return (
    <div>
      {publicKey ? (
        <div>
          <p className="text-success">Wallet Connected: {publicKey.toBase58()}</p>
          <button onClick={disconnect} className="btn btn-danger mt-2">
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <WalletMultiButton className="btn btn-primary" />
      )}
    </div>
  )
}

export default WalletConnect
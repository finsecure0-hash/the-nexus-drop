import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

function WalletConnect() {
  const { publicKey } = useWallet()

  return (
    <div>
      {publicKey ? (
        <p className="text-success">Wallet Connected: {publicKey.toBase58()}</p>
      ) : (
        <WalletMultiButton className="btn btn-primary" />
      )}
    </div>
  )
}

export default WalletConnect
'use client'

import { useAccount } from 'wagmi'

export default function UpgradePage() {
  const { isConnected } = useAccount()

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Upgrade to Pro</h1>
      <p className="text-gray-600 mb-6">
        Unlock full access to verified uploads, PDF certificates, and private sharing.
      </p>

      {isConnected ? (
        <button className="bg-black text-white px-6 py-2 rounded-full hover:opacity-90">
          Pay Now with Wallet
        </button>
      ) : (
        <p className="text-red-500">Please connect your wallet to continue.</p>
      )}
    </div>
  )
}

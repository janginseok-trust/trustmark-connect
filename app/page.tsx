// app/page.tsx

'use client'

// 🔁 Force Vercel to redeploy homepage layout

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [error, setError] = useState<string | null>(null)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <h1 className="text-4xl font-bold mb-6">Trustmark</h1>
      <p className="text-xl mb-8 max-w-md text-center">
        Securely exchange digital assets on the blockchain.
      </p>

      {!isConnected ? (
        <>
          <button
            onClick={() => {
              setError(null)
              const connector = connectors[0]
              if (connector) connect({ connector })
              else setError('No wallet connectors available.')
            }}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => {
              setError(null)
              const connector = connectors[0]
              if (connector) connect({ connector })
              else setError('No wallet connectors available.')
            }}
            className="ml-4 px-6 py-3 border border-black rounded-md hover:bg-gray-100 transition"
          >
            Connect Wallet
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </>
      ) : (
        <>
          <p className="mb-4">Connected: {address}</p>
          <button
            onClick={() => disconnect()}
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Disconnect
          </button>
        </>
      )}
    </main>
  )
}

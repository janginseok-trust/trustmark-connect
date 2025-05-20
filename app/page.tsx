'use client'

import { useRouter } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Trustmark</h1>
      <h2 className="text-2xl font-semibold mb-2">Securely exchange digital assets on the blockchain.</h2>
      <p className="text-gray-500 mb-6">Trustless escrow service with multisignature wallet and arbitration</p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/upload')}
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Get Started
        </button>
        <ConnectButton />
      </div>
    </main>
  )
}

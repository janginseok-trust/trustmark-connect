'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const dynamic = 'force-dynamic'

function PageInner() {
  const params = useSearchParams()
  const router = useRouter()
  const ref = params.get('ref')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-4 text-center">
      <h1 className="text-4xl font-bold">Trustmark</h1>
      <p className="text-xl font-semibold">
        Securely exchange digital assets on the blockchain.
      </p>
      <p className="text-gray-500">
        Trustless escrow service with multisignature wallet and arbitration
      </p>
      {ref && (
        <p className="text-sm text-gray-500">Referral Code: {ref}</p>
      )}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => router.push('/upload')}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Get Started
        </button>
        <ConnectButton />
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <PageInner />
    </Suspense>
  )
}

// app/page.tsx
'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

function PageInner() {
  const params = useSearchParams()
  const router = useRouter()
  const ref = params.get('ref')

  const { address } = useAccount()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Trustmark</h1>
      <p className="text-xl font-semibold mb-2">
        Securely exchange digital assets on the blockchain.
      </p>
      <p className="text-gray-500 mb-2">
        Trustless escrow service with multisignature wallet and arbitration
      </p>
      {ref && (
        <p className="text-sm text-gray-500">Referral Code: {ref}</p>
      )}
      <div className="flex space-x-4 mt-6">
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

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <PageInner />
    </Suspense>
  )
}

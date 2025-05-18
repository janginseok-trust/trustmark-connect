'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const dynamic = 'force-dynamic' // ✅ Vercel에서 동적 렌더링 강제

function PageInner() {
  const params = useSearchParams()
  const ref = params.get('ref')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">✅ Trustmark Home</h1>
      {ref && <p className="text-gray-600">Referral Code: {ref}</p>}
      <ConnectButton />
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

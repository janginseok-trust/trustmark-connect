'use client'

import { useSearchParams } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import SignMessage from './components/SignMessage'
import ReferralTracker from './components/ReferralTracker'

export default function Home() {
  const searchParams = useSearchParams()
  const intent = searchParams.get('intent')

  return (
    <>
      <ReferralTracker />

      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-xl font-bold">
            {intent === 'z1'
              ? '내 작업을 증명하고 링크로 공유하세요'
              : '이 조건에 동의한 서명을 남기세요'}
          </h1>

          <ConnectButton />
          <SignMessage />
        </div>
      </main>
    </>
  )
}

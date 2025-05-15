// app/upload/page.tsx

'use client'

import { useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import { db } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export default function UploadPage() {
  const { address } = useAccount()
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  const handleMockPayment = async () => {
    if (!ref || !address) return

    try {
      await addDoc(collection(db, 'referral_rewards'), {
        ref,
        referredUser: address,
        timestamp: serverTimestamp(),
      })
      console.log('✅ Referral reward granted to', ref)
      alert('Mock 결제 성공 + 추천 리워드 지급 완료!')
    } catch (error) {
      console.error('❌ Reward error:', error)
      alert('에러 발생: 콘솔 확인')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-6 p-10">
      <h1 className="text-2xl font-bold">📤 Upload & Pro 결제 시나리오</h1>

      <p className="text-center max-w-md">
        이 페이지는 Pro 결제 성공 후 <code>ref=코드</code>가 포함되어 있다면 추천자에게 300P를 지급하는 테스트용 페이지입니다.
      </p>

      <button
        onClick={handleMockPayment}
        className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800"
      >
        [Mock] 결제 성공 & 추천 포인트 지급
      </button>
    </main>
  )
}

'use client'

import { useAccount } from 'wagmi'
import { useState } from 'react'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function BuyPage() {
  const { address } = useAccount()
  const [message, setMessage] = useState('')

  const handleUpgrade = async () => {
    if (!address) return alert('지갑을 먼저 연결해주세요')

    try {
      await setDoc(doc(db, 'pro_users', address), {
        address,
        upgradedAt: new Date().toISOString(),
      })
      alert('✅ Pro 플랜으로 전환되었습니다')
      setMessage('🎉 현재 Pro 사용자입니다.')
    } catch (e) {
      console.error(e)
      alert('❌ 오류 발생: 콘솔 확인')
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">💼 Trustmark 요금제</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">🆓 Lite</h2>
          <ul className="list-disc pl-5 text-sm mt-2">
            <li>기록 남기기</li>
            <li>기록 조회</li>
            <li className="text-gray-400 line-through">PDF 다운로드</li>
            <li className="text-gray-400 line-through">인증서 공유</li>
          </ul>
        </div>

        <div className="border p-4 rounded shadow-sm bg-yellow-50">
          <h2 className="text-xl font-semibold">⭐ Pro</h2>
          <ul className="list-disc pl-5 text-sm mt-2">
            <li>기록 남기기</li>
            <li>기록 조회</li>
            <li className="text-black">PDF 다운로드</li>
            <li className="text-black">인증서 공유 링크 발급</li>
          </ul>
          <button
            onClick={handleUpgrade}
            className="mt-4 bg-black text-white px-4 py-2 rounded w-full"
          >
            Pro 업그레이드 (Firestore 저장)
          </button>
        </div>
      </div>

      {message && (
        <div className="text-green-600 text-center font-medium mt-4">
          {message}
        </div>
      )}
    </main>
  )
}

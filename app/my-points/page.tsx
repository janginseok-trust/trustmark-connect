'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { db } from '@/lib/firebase'
import {
  doc,
  getDocs,
  query,
  where,
  collection,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

export default function BuyPage() {
  const { address } = useAccount()
  const [point, setPoint] = useState(0)
  const [usePoint, setUsePoint] = useState(true)

  // ✅ 현재 포인트 가져오기
  useEffect(() => {
    if (!address) return

    const fetch = async () => {
      const refCode = address.toLowerCase().slice(2, 10)

      const q = query(
        collection(db, 'referral_rewards'),
        where('ref', '==', refCode)
      )
      const snap = await getDocs(q)
      setPoint(snap.size * 300)
    }

    fetch()
  }, [address])

  // ✅ 결제 버튼 클릭 시 로직
  const handlePay = async () => {
    const finalPrice = usePoint && point >= 300 ? 3000 - 1200 : 3000

    alert(`💳 결제 금액: ${finalPrice.toLocaleString()}원`)

    // 실제 결제 로직 (Stripe API 연동 등) 은 여기 추가

    // ✅ 포인트 차감 처리
    if (usePoint && point >= 300 && address) {
      const refCode = address.toLowerCase().slice(2, 10)

      // 추천 리워드 문서 1개 삭제 (300P 차감 의미)
      const q = query(
        collection(db, 'referral_rewards'),
        where('ref', '==', refCode)
      )
      const snap = await getDocs(q)
      const docToDelete = snap.docs[0]
      if (docToDelete) {
        await deleteDoc(docToDelete.ref)
        alert('✅ 300P 차감 완료')
      }
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-6 p-10">
      <h1 className="text-2xl font-bold">🛍️ Pro 결제하기</h1>
      <p>내 포인트: <b>{point.toLocaleString()}P</b></p>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={usePoint}
          onChange={() => setUsePoint(!usePoint)}
        />
        <span>포인트 300P 사용하여 1,200원 할인</span>
      </label>

      <button
        onClick={handlePay}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        결제 진행
      </button>
    </main>
  )
}

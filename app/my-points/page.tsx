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

  // ✅ Fetch current points
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

  // ✅ Payment logic
  const handlePay = async () => {
    const finalPrice = usePoint && point >= 300 ? 3000 - 1200 : 3000

    alert(`💳 Final price: $${(finalPrice / 100).toFixed(2)}`)

    // Future Stripe payment integration goes here...

    // ✅ Deduct 300P
    if (usePoint && point >= 300 && address) {
      const refCode = address.toLowerCase().slice(2, 10)

      const q = query(
        collection(db, 'referral_rewards'),
        where('ref', '==', refCode)
      )
      const snap = await getDocs(q)
      const docToDelete = snap.docs[0]
      if (docToDelete) {
        await deleteDoc(docToDelete.ref)
        alert('✅ 300P has been deducted.')
      }
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-6 p-10">
      <h1 className="text-2xl font-bold">🛍️ Upgrade with Points</h1>
      <p>Your Points: <b>{point.toLocaleString()}P</b></p>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={usePoint}
          onChange={() => setUsePoint(!usePoint)}
        />
        <span>Use 300P to get $1.20 discount</span>
      </label>

      <button
        onClick={handlePay}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Proceed to Payment
      </button>
    </main>
  )
}

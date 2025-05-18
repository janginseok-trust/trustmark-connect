'use client'

import { useAccount } from 'wagmi'
import { useState } from 'react'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function BuyPage() {
  const { address } = useAccount()
  const [message, setMessage] = useState('')

  const handleUpgrade = async () => {
    if (!address) return alert('Please connect your wallet first')

    try {
      await setDoc(doc(db, 'pro_users', address), {
        address,
        upgradedAt: new Date().toISOString(),
      })
      alert('✅ Upgraded to Pro plan')
      setMessage('🎉 You are now a Pro user.')
    } catch (e) {
      console.error(e)
      alert('❌ An error occurred. Please check the console.')
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">💼 Trustmark Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">🆓 Lite</h2>
          <ul className="list-disc pl-5 text-sm mt-2">
            <li>Save records</li>
            <li>View records</li>
            <li className="text-gray-400 line-through">Download PDF</li>
            <li className="text-gray-400 line-through">Share verification link</li>
          </ul>
        </div>

        <div className="border p-4 rounded shadow-sm bg-yellow-50">
          <h2 className="text-xl font-semibold">⭐ Pro</h2>
          <ul className="list-disc pl-5 text-sm mt-2">
            <li>Save records</li>
            <li>View records</li>
            <li className="text-black">Download PDF</li>
            <li className="text-black">Generate shareable link</li>
          </ul>
          <button
            onClick={handleUpgrade}
            className="mt-4 bg-black text-white px-4 py-2 rounded w-full"
          >
            Upgrade to Pro (Save to Firestore)
          </button>
        </div>
      </div>

      {message && (
        <div className="text-green-600 text-center font-medium mt-4">
          {message}
        </div>
      )}
    </main>

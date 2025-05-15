'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useAccount } from 'wagmi'

export default function CreateReferral() {
  const { address } = useAccount()
  const [code, setCode] = useState<string | null>(null)

  const generateCode = (wallet: string) => {
    return wallet.slice(2, 8).toLowerCase() + Math.floor(Math.random() * 10000)
  }

  const createReferral = async () => {
    if (!address) return
    const newCode = generateCode(address)
    await setDoc(doc(db, 'referrals', newCode), {
      code: newCode,
      owner: address,
      createdAt: new Date(),
    })
    setCode(newCode)
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">🎁 Create Referral Code</h1>
      {address ? (
        <>
          <button
            onClick={createReferral}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Generate My Code
          </button>
          {code && (
            <p className="mt-4 text-green-600">
              ✅ Your referral code: <strong>{code}</strong>
            </p>
          )}
        </>
      ) : (
        <p>❌ Please connect your wallet</p>
      )}
    </div>
  )
}

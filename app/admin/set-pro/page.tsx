'use client'

import { useState } from 'react'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function SetProAdminPage() {
  const [uid, setUid] = useState('')
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSetPro = async () => {
    if (!uid || !email) return alert('Please enter UID and email.')

    await setDoc(
      doc(db, 'users', uid),
      {
        uid,
        email,
        isPro: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    setDone(true)
    setUid('')
    setEmail('')
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">👑 Set Pro User (Manual)</h1>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="User UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      />

      <input
        className="border p-2 mb-4 w-full"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleSetPro}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        ✅ Set as Pro
      </button>

      {done && (
        <p className="text-green-600 mt-4 text-center">
          ✅ User updated successfully!
        </p>
      )}
    </div>
  )
}

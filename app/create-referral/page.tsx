'use client'

import { useState } from 'react'

export default function CreateReferralPage() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const handleCreate = async () => {
    if (!code) {
      setMessage('Please enter a referral code.')
      return
    }
    const res = await fetch('/api/referrals', {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      setMessage('Referral code created successfully.')
      setCode('')
    } else {
      setMessage('Failed to create referral code.')
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Referral Code</h1>
      <input
        type="text"
        placeholder="Enter referral code"
        className="w-full p-2 border rounded mb-4"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </main>
  )
}

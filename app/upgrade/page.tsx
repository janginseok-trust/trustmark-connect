'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UpgradePage() {
  const { address } = useAccount()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!address) {
      alert('🦊 Wallet not connected.')
      return
    }

    try {
      setLoading(true)
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url // Redirect to Stripe Checkout
      } else {
        throw new Error('Checkout URL not found')
      }
    } catch (err) {
      console.error('❌ Failed to initiate payment:', err)
      alert('There was a problem opening the payment page.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🚀 Upgrade to Trustmark Pro</h1>
      <p className="text-gray-600 mb-6">
        Become a Pro user and unlock all features: PDF download, shareable links, record access, and more.
      </p>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded text-lg hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? 'Processing...' : '🔐 Upgrade for $9.99'}
      </button>
    </div>
  )
}

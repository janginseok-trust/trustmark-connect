'use client'

import { useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { useRouter } from 'next/navigation'

export default function UploadFormPage() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()
  const router = useRouter()

  const { signMessageAsync } = useSignMessage()

  const handleUpload = async () => {
    if (!message) return

    setLoading(true)
    try {
      const signature = await signMessageAsync({ message })

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          message,
          signature,
        }),
      })

      const data = await res.json()
      router.push(`/share/view/${data.id}`)
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Upload Proof</h1>
      <textarea
        className="w-full border rounded p-3 mb-4 text-sm"
        rows={4}
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
      >
        {loading ? 'Uploading...' : 'Sign & Upload'}
      </button>
    </div>
  )
}

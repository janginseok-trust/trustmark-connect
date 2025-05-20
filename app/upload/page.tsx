'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const { address } = useAccount()
  const router = useRouter()
  const [isPro, setIsPro] = useState<boolean | null>(null)

  useEffect(() => {
    if (!address) return

    fetch(`/api/check-pro?address=${address}`)
      .then((res) => res.json())
      .then((data) => setIsPro(data.isPro))
  }, [address])

  if (!address) {
    return <p className="text-center mt-10">Please connect your wallet.</p>
  }

  if (isPro === null) {
    return <p className="text-center mt-10">Checking Pro status...</p>
  }

  if (!isPro) {
    return (
      <div className="text-center mt-10">
        <p className="text-yellow-600 font-medium">
          Only <strong>Pro users</strong> can upload records.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-12 space-y-4">
      <h1 className="text-2xl font-bold text-center">Upload Message</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const form = e.currentTarget
          const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value

          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address, message }),
          })

          const data = await res.json()
          if (data.success) {
            router.push('/my-records')
          }
        }}
      >
        <textarea
          name="message"
          placeholder="Enter your message..."
          className="w-full border p-3 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 mt-2"
        >
          Sign & Upload
        </button>
      </form>
    </div>
  )
}

'use client'

import { useAccount, useSignMessage } from 'wagmi'
import { useEffect, useState } from 'react'
import {
  signMessageHashAndSaveToFirestore,
  saveReferralIfValid,
} from '@/lib/utils/firebaseUpload'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUserPro } from '@/lib/hooks/useUserPro'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { app } from '@/lib/firebase'

export default function UploadClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  const { isConnected, address } = useAccount()
  const { isProUser, loading } = useUserPro(address)
  const [message, setMessage] = useState('')
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    const auth = getAuth(app)
    signInAnonymously(auth).catch((err) =>
      console.error('❌ Anonymous login failed:', err)
    )
  }, [])

  useEffect(() => {
    if (address && ref) {
      saveReferralIfValid({ user: address, referrerCode: ref })
    }
  }, [address, ref])

  const handleSubmit = async () => {
    if (!message) return alert('Please enter a message')
    if (!isConnected || !address) return alert('Wallet not connected')
    if (!isProUser) return alert('Only Pro users can upload records')

    setLoadingSubmit(true)
    try {
      const signature = await signMessageAsync({ message })
      await signMessageHashAndSaveToFirestore({ message, address, signature })
      router.push('/my-records')
    } catch (err) {
      console.error(err)
      alert('Failed to upload message')
    } finally {
      setLoadingSubmit(false)
    }
  }

  if (loading) return <div className="p-4 text-center">Checking your Pro status...</div>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Message</h1>

      {!isProUser && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          Only <strong>Pro users</strong> can upload records.
        </div>
      )}

      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={6}
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={!isProUser || loadingSubmit}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loadingSubmit ? 'Submitting...' : 'Sign & Upload'}
      </button>
    </div>
  )
}

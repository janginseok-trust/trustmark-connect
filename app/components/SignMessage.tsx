'use client'

import { useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { useSearchParams, useRouter } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function SignMessage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const intent = searchParams.get('intent') || ''

  const { address, isConnected } = useAccount()

  const message = `I am proving ownership of ${address}`
  const { data, isSuccess, signMessageAsync } = useSignMessage()

  const handleSign = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first.')
      return
    }

    try {
      await signMessageAsync({ message })
    } catch (error) {
      console.error('Signature failed:', error)
    }
  }

  useEffect(() => {
    const saveToFirestore = async () => {
      if (!isSuccess || !address || !data || !intent) return

      const ref = doc(db, 'proofs', address)
      await setDoc(ref, {
        address,
        signature: data,
        intent,
        timestamp: new Date().toISOString(),
      })

      router.push(`/proof/${address}`)
    }

    saveToFirestore()
  }, [isSuccess, address, data, intent, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-xl font-bold bg-indigo-500 text-white px-3 py-1 rounded">
        Sign to agree to this condition
      </h1>
      <button
        onClick={handleSign}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
      >
        Sign & Save
      </button>
    </div>
  )
}

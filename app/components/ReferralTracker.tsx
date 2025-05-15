'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

export default function ReferralTracker() {
  const searchParams = useSearchParams()
  const { address } = useAccount()

  useEffect(() => {
    const ref = searchParams.get('ref')
    const saveReferral = async () => {
      if (ref && address) {
        try {
          await addDoc(collection(db, 'referral_uses'), {
            ref,
            user: address,
            createdAt: new Date(),
          })
          console.log('✅ Referral tracked:', ref)
        } catch (err) {
          console.error('❌ Failed to track referral:', err)
        }
      }
    }
    saveReferral()
  }, [searchParams, address])

  return null
}

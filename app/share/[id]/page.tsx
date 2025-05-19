'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export default function ShareRecordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { isConnected, address } = useAccount()

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    } else {
      const checkProStatus = async () => {
        const res = await fetch(`/api/check-pro?address=${address}`)
        const data = await res.json()
        if (data.isPro) {
          router.push(`/share/view/${id}`)
        } else {
          router.push('/pro-required')
        }
      }

      checkProStatus()
    }
  }, [isConnected, address, id, router])

  return null
}

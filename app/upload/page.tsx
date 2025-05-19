'use client'

import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    } else {
      // Firestore에서 Pro 여부 확인 후 업로드 페이지 or 제한 페이지로 이동
      const checkProStatus = async () => {
        const res = await fetch(`/api/check-pro?address=${address}`)
        const data = await res.json()
        if (data.isPro) {
          router.push('/upload/form')
        } else {
          router.push('/pro-required')
        }
      }

      checkProStatus()
    }
  }, [isConnected, address, router])

  return null
}

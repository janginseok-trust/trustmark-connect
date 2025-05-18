// app/upgrade/page.tsx
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
      alert('🦊 지갑이 연결되지 않았습니다.')
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
        window.location.href = data.url // Stripe 결제 페이지로 리디렉션
      } else {
        throw new Error('Checkout URL 없음')
      }
    } catch (err) {
      console.error('❌ 결제 시작 실패:', err)
      alert('결제 페이지를 여는 데 문제가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🚀 Upgrade to Trustmark Pro</h1>
      <p className="text-gray-600 mb-6">Pro 사용자가 되어 PDF 다운로드, 공유 링크, 기록 열람 등 모든 기능을 이용하세요.</p>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded text-lg hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? '처리 중...' : '🔐 $9.99 결제하고 업그레이드'}
      </button>
    </div>
  )
}

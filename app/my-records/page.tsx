'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'

export default function MyRecords() {
  const { address } = useAccount()
  const router = useRouter()
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!address) return

    const fetchRecords = async () => {
      const res = await fetch("/api/get-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      })

      const data = await res.json()
      setRecords(data.records || [])
      setLoading(false)

      // 🔒 열람 제한 (3개 초과시 업그레이드로 리디렉션)
      if ((data.records || []).length > 3) {
        router.push("/pro-required")
      }
    }

    fetchRecords()
  }, [address, router])

  if (!address) return <p className="p-4">Please connect your wallet.</p>
  if (loading) return <p className="p-4">Loading records...</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Records</h1>
      <ul className="space-y-2">
        {records.map((r, i) => (
          <li key={i} className="border p-2 rounded text-sm">
            <div><b>{r.message}</b></div>
            <div className="text-xs text-gray-500">{r.createdAt}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

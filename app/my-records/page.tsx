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
      const res = await fetch('/api/get-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })

      const data = await res.json()
      setRecords(data.records || [])
      setLoading(false)

      if ((data.records || []).length > 3) {
        router.push('/pro-required')
      }
    }

    fetchRecords()
  }, [address, router])

  if (!address) return <p className="text-center mt-10">Please connect your wallet.</p>
  if (loading) return <p className="text-center mt-10">Loading records...</p>
  if (records.length === 0) return <p className="text-center mt-10">No records found.</p>

  return (
    <div className="max-w-2xl mx-auto mt-12 space-y-6">
      <h1 className="text-2xl font-bold text-center">My Records</h1>
      {records.map((record, idx) => (
        <div key={idx} className="p-4 border rounded shadow">
          <p className="text-sm text-gray-500">#{idx + 1}</p>
          <p>{record.message}</p>
        </div>
      ))}
    </div>
  )
}

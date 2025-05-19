'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type RecordData = {
  message: string
  createdAt: string
  signature: string
}

export default function ViewRecordPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [record, setRecord] = useState<RecordData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await fetch(`/api/get-record?id=${id}`)
        const data = await res.json()
        setRecord(data)
      } catch (err) {
        setRecord(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchRecord()
  }, [id])

  if (loading) return <div className="p-4">Loading...</div>
  if (!record) return <div className="p-4 text-red-500">Record not found.</div>

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Verified Record</h1>
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-1">Message:</p>
        <p className="border px-4 py-2 rounded bg-gray-100">{record.message}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-500 text-sm mb-1">Signature:</p>
        <p className="break-all text-sm border px-4 py-2 rounded bg-gray-100">{record.signature}</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">Created At:</p>
        <p className="text-sm">{new Date(record.createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}

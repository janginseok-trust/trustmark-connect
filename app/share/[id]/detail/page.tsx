'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function DetailPage() {
  const params = useParams()
  const id = decodeURIComponent(params.id as string)

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      const ref = doc(db, 'proofs', id)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        setData(snap.data())
      }
    }

    fetchData()
  }, [id])

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No data found.
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">📄 Proof Details</h1>
      <div className="bg-white rounded-md shadow-md p-6 w-full max-w-md border">
        <p><strong>Address:</strong> {data.address}</p>
        <p><strong>Intent:</strong> {data.intent}</p>
        <p><strong>Signature:</strong> {data.signature}</p>
        <p><strong>Timestamp:</strong> {data.timestamp}</p>
      </div>
    </div>
  )
}

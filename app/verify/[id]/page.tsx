'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { doc, getDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function VerifyRecordPage() {
  const { id } = useParams()
  const [record, setRecord] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const loadRecord = async () => {
      try {
        const ref = doc(db, 'proofs', id as string)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setRecord(snap.data())
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    loadRecord()
  }, [id])

  if (loading) return <div className="p-6">📦 Loading shared record...</div>
  if (!record) return <div className="p-6 text-red-500">❌ Record not found.</div>

  const createdAt =
    record.createdAt instanceof Timestamp
      ? record.createdAt.toDate().toLocaleString()
      : 'No date available'

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 Verified Shared Record</h1>
      <div className="border p-4 rounded space-y-2">
        <p><strong>🧾 Message:</strong> {record.message || 'No content available'}</p>
        <p><strong>🕒 Created At:</strong> {createdAt}</p>
        <p><strong>🧑‍💼 Signer:</strong> {record.owner || 'Unknown'}</p>
        <div className="mt-4 text-green-600 font-medium">
          ✅ This record is verified and trusted by Trustmark.
        </div>
      </div>

      <div className="mt-8 border-t pt-4 text-sm text-center text-gray-600">
        Want to create and share trusted records like this?
        <a href="/buy" className="ml-1 text-blue-600 underline hover:text-blue-800">
          Upgrade to Pro →
        </a>
      </div>
    </main>
  )
}

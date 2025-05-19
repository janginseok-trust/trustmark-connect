'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore'

export default function AdminDashboard() {
  const [uploads, setUploads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const q = query(
          collection(db, 'proofs'),
          orderBy('createdAt', 'desc'),
          limit(20)
        )
        const snap = await getDocs(q)
        const docs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setUploads(docs)
      } catch (e) {
        console.error('❌ Failed to load uploads:', e)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛠 Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">📄 Latest Uploads</h2>

      {loading ? (
        <p className="text-gray-500">Loading uploads...</p>
      ) : (
        <ul className="space-y-2">
          {uploads.map((u) => (
            <li key={u.id} className="border p-3 rounded">
              <p>
                <strong>ID:</strong> {u.id}
              </p>
              <p>
                <strong>Owner:</strong> {u.owner}
              </p>
              <p>
                <strong>Message:</strong>{' '}
                {u.message?.slice(0, 30) || '(no content)'}...
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

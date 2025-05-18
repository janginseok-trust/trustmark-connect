'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Loader2 } from 'lucide-react'

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'proofs'))
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setLogs(data)
      } catch (err) {
        console.error('❌ Failed to fetch logs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Upload Logs</h1>
      {loading ? (
        <div className="text-center animate-pulse">
          <Loader2 className="mx-auto h-5 w-5 animate-spin" />
          Loading logs...
        </div>
      ) : logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log.id} className="p-4 border rounded shadow">
              <p><strong>Message:</strong> {log.message || 'undefined'}</p>
              <p><strong>Address:</strong> {log.address}</p>
              <p><strong>Created:</strong> {log.createdAt?.seconds ? new Date(log.createdAt.seconds * 1000).toLocaleString() : 'Unknown'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

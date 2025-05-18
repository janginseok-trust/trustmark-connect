'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useUserPro } from '@/lib/hooks/useUserPro'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import jsPDF from 'jspdf'
import { Loader2, FolderSearch } from 'lucide-react'

export default function MyRecordsPage() {
  const { address, isConnected } = useAccount()
  const { isProUser, loading } = useUserPro(address)
  const [records, setRecords] = useState<any[]>([])
  const [loadingRecords, setLoadingRecords] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      if (!isConnected || !address || !isProUser) return

      try {
        const q = query(collection(db, 'proofs'), where('address', '==', address))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setRecords(data)
      } catch (err) {
        console.error('❌ Failed to load records:', err)
      } finally {
        setLoadingRecords(false)
      }
    }

    fetchRecords()
  }, [address, isConnected, isProUser])

  const downloadPDF = (record: any) => {
    try {
      const doc = new jsPDF()
      doc.text(`Trust Record`, 10, 10)
      doc.text(`Message: ${record.message || 'undefined'}`, 10, 20)
      doc.text(`Signer: ${record.address}`, 10, 30)
      doc.text(`Signature: ${record.signature}`, 10, 40)
      doc.text(
        `Created At: ${record.createdAt?.seconds
          ? new Date(record.createdAt.seconds * 1000).toLocaleString()
          : 'Unknown'}`,
        10,
        50
      )
      doc.save(`trustmark-proof-${record.id}.pdf`)
    } catch (e) {
      console.error('❌ Failed to generate PDF:', e)
      alert('Failed to generate PDF')
    }
  }

  if (loading) {
    return (
      <div className="p-4 text-center animate-pulse">
        <Loader2 className="mx-auto h-5 w-5 animate-spin" />
        Checking Pro user status...
      </div>
    )
  }

  if (!isProUser) {
    return (
      <div className="p-4 text-center text-red-600">
        🔒 Only <strong>Pro users</strong> can access this page.
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">📄 My Signed Records</h1>

      {loadingRecords ? (
        <p className="text-center">Loading your records...</p>
      ) : records.length === 0 ? (
        <div className="p-4 text-center text-gray-600">
          <FolderSearch className="mx-auto h-6 w-6 mb-2" />
          No records found.
        </div>
      ) : (
        <ul className="space-y-4">
          {records.map((record) => (
            <li key={record.id} className="p-4 border rounded shadow">
              <p className="mb-1 break-words">
                <strong>Message:</strong> {record.message || 'undefined'}
              </p>
              <p className="mb-2 text-sm text-gray-500">
                <strong>Created At:</strong>{' '}
                {record.createdAt?.seconds
                  ? new Date(record.createdAt.seconds * 1000).toLocaleString()
                  : 'Unknown'}
              </p>
              <button
                onClick={() => downloadPDF(record)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Download PDF
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

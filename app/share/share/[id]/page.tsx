'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Proof {
  message: string
  signature: string
  address: string
  createdAt?: { seconds: number }
}

export default function SharedRecordPage() {
  const { id } = useParams()
  const [record, setRecord] = useState<Proof | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchRecord = async () => {
      try {
        const docRef = doc(db, 'proofs', id as string)
        const snap = await getDoc(docRef)

        if (!snap.exists()) {
          setError(true)
          return
        }

        const data = snap.data() as Proof
        setRecord(data)
      } catch (e) {
        console.error('❌ Failed to load shared record:', e)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchRecord()
  }, [id])

  const handleDownload = async () => {
    if (!record) return
    try {
      setDownloading(true)
      const html2pdf = (await import('html2pdf.js')).default

      const element = document.createElement('div')
      element.innerHTML = `
        <h1>🧾 Trust Record</h1>
        <p><strong>Message:</strong> ${record.message}</p>
        <p><strong>Signer:</strong> ${record.address}</p>
        <p><strong>Signature:</strong> ${record.signature}</p>
        <p><strong>Created At:</strong> ${
          record.createdAt
            ? new Date(record.createdAt.seconds * 1000).toLocaleString()
            : 'Unknown'
        }</p>
      `

      await html2pdf().set({
        filename: `trustmark-share-${id}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(element).save()
    } catch (e) {
      alert('❌ Failed to download PDF')
      console.error(e)
    } finally {
      setDownloading(false)
    }
  }

  if (loading) return <p className="p-4 animate-pulse">🔍 Loading record...</p>
  if (error || !record) return <p className="p-4 text-red-500">⚠️ This record is invalid or has been deleted.</p>

  const createdAt = record.createdAt
    ? new Date(record.createdAt.seconds * 1000).toLocaleString()
    : 'Unknown'

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🔗 Shared Trust Record</h1>
      <div className="border p-4 rounded bg-white shadow mb-4">
        <p className="mb-2"><strong>🕒 Created At:</strong> {createdAt}</p>
        <p className="mb-2 break-words"><strong>✉️ Message:</strong> {record.message}</p>
        <p className="mb-2 break-all text-sm text-gray-500"><strong>👤 Signer:</strong> {record.address}</p>
        <p className="break-all text-sm text-gray-400"><strong>🖋️ Signature:</strong> {record.signature}</p>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {downloading ? 'Downloading...' : '📄 Download PDF'}
      </button>
    </div>
  )
}

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
        console.error('❌ 공유 열람 실패:', e)
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
        <p><strong>메시지:</strong> ${record.message}</p>
        <p><strong>서명자:</strong> ${record.address}</p>
        <p><strong>서명값:</strong> ${record.signature}</p>
        <p><strong>생성 시각:</strong> ${
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
      alert('❌ 다운로드 실패')
      console.error(e)
    } finally {
      setDownloading(false)
    }
  }

  if (loading) return <p className="p-4 animate-pulse">🔍 기록을 불러오는 중입니다...</p>
  if (error || !record) return <p className="p-4 text-red-500">⚠️ 유효하지 않거나 삭제된 기록입니다.</p>

  const createdAt = record.createdAt
    ? new Date(record.createdAt.seconds * 1000).toLocaleString()
    : 'Unknown'

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🔗 공유된 Trust 기록</h1>
      <div className="border p-4 rounded bg-white shadow mb-4">
        <p className="mb-2"><strong>🕒 생성 시각:</strong> {createdAt}</p>
        <p className="mb-2 break-words"><strong>✉️ 메시지:</strong> {record.message}</p>
        <p className="mb-2 break-all text-sm text-gray-500"><strong>👤 서명자:</strong> {record.address}</p>
        <p className="break-all text-sm text-gray-400"><strong>🖋️ 서명값:</strong> {record.signature}</p>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {downloading ? '다운로드 중...' : '📄 PDF 다운로드'}
      </button>
    </div>
  )
}

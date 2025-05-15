'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import html2pdf from 'html2pdf.js'

interface Proof {
  id: string
  message: string
  createdAt: string
}

export default function MyRecordsPage() {
  const { address } = useAccount()
  const [records, setRecords] = useState<Proof[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (!address) return

    const loadRecords = async () => {
      try {
        const q = query(
          collection(db, 'proofs'),
          where('owner', '==', address),
          orderBy('createdAt', 'desc')
        )
        const snap = await getDocs(q)
        const items: Proof[] = snap.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            message: data.message || '(내용 없음)',
            createdAt: new Date(data.createdAt?.seconds * 1000).toLocaleString()
          }
        })
        setRecords(items)
      } catch (e) {
        console.error('❌ 기록 불러오기 실패:', e)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadRecords()
  }, [address])

  const handleDownload = async (record: Proof) => {
    try {
      setDownloading(record.id)

      const element = document.createElement('div')
      element.innerHTML = `
        <h1>🧾 Trust Record</h1>
        <p><strong>메시지:</strong> ${record.message}</p>
        <p><strong>생성 시각:</strong> ${record.createdAt}</p>
        <p><strong>소유자:</strong> ${address}</p>
      `

      await html2pdf().set({
        filename: `trustmark-record-${record.id}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save()
    } catch (e) {
      alert('❌ 다운로드에 실패했습니다.')
      console.error(e)
    } finally {
      setDownloading(null)
    }
  }

  const handleCopyLink = async (recordId: string) => {
    const url = `${window.location.origin}/verify/${recordId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(recordId)
      setTimeout(() => setCopied(null), 2000)
    } catch (e) {
      alert('❌ 링크 복사 실패')
      console.error(e)
    }
  }

  if (!address) return <p className="p-4">🦊 먼저 지갑을 연결해주세요.</p>
  if (loading) return <p className="p-4 animate-pulse">📦 기록을 불러오는 중입니다...</p>
  if (error) return <p className="p-4 text-red-500">⚠️ 기록을 불러오는데 문제가 발생했습니다. 다시 시도해주세요.</p>
  if (records.length === 0) return <p className="p-4">📭 아직 저장된 기록이 없습니다.</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📄 내 기록 목록</h1>
      <ul className="space-y-4">
        {records.map(record => (
          <li key={record.id} className="border p-4 rounded hover:shadow">
            <div className="text-sm text-gray-500">🕒 {record.createdAt}</div>
            <div className="text-base mb-2">{record.message}</div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDownload(record)}
                disabled={!!downloading}
                className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {downloading === record.id ? '다운로드 중...' : '📄 PDF 다운로드'}
              </button>
              <button
                onClick={() => handleCopyLink(record.id)}
                className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
              >
                {copied === record.id ? '✅ 링크 복사됨' : '🔗 공유 링크 복사'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

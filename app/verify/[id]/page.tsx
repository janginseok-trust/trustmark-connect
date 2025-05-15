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

  if (loading) return <div className="p-6">📦 공유된 기록을 불러오는 중입니다...</div>
  if (!record) return <div className="p-6 text-red-500">❌ 해당 기록을 찾을 수 없습니다.</div>

  const createdAt =
    record.createdAt instanceof Timestamp
      ? record.createdAt.toDate().toLocaleString()
      : '날짜 없음'

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 공유된 기록</h1>
      <div className="border p-4 rounded space-y-2">
        <p><strong>🧾 메시지:</strong> {record.message || '내용 없음'}</p>
        <p><strong>🕒 생성 시각:</strong> {createdAt}</p>
        <p><strong>🧑‍💼 서명자:</strong> {record.owner || '미확인'}</p>
        <div className="mt-4 text-green-600 font-medium">✅ 이 기록은 Trustmark에서 인증된 데이터입니다.</div>
      </div>

      <div className="mt-8 border-t pt-4 text-sm text-center text-gray-600">
        이와 같은 기록을 남기고 공유하려면
        <a href="/buy" className="ml-1 text-blue-600 underline hover:text-blue-800">
          Pro로 업그레이드하세요 →
        </a>
      </div>
    </main>
  )
}

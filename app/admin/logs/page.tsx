'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Log {
  type: 'earn' | 'use'
  point: number
  from: string
  to: string
  createdAt: string
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const snapshot = await getDocs(collection(db, 'point_logs'))
      const data = snapshot.docs.map(doc => doc.data() as Log)
      const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setLogs(sorted)
    }

    fetchLogs()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛠 전체 포인트 로그 (운영자 전용)</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">📌 타입</th>
            <th className="p-2 border">🪙 포인트</th>
            <th className="p-2 border">🎯 추천자</th>
            <th className="p-2 border">🙋‍♂️ 유입자</th>
            <th className="p-2 border">🕒 시간</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td className="p-2 border">{log.type === 'earn' ? '적립' : '차감'}</td>
              <td className="p-2 border">{log.point}</td>
              <td className="p-2 border">{log.from.slice(0, 8)}...</td>
              <td className="p-2 border">{log.to.slice(0, 8)}...</td>
              <td className="p-2 border">{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

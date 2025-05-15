'use client'

import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import html2pdf from 'html2pdf.js'

export default function MyRecords() {
  const { address } = useAccount()
  const [records, setRecords] = useState<any[]>([])
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    if (!address) return

    const checkPro = async () => {
      const res = await fetch(`/api/check-pro?address=${address}`)
      const data = await res.json()
      setIsPro(data.isPro)
    }

    const fetchRecords = async () => {
      const q = query(collection(db, 'proofs'), where('user', '==', address))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => doc.data())
      setRecords(data)
    }

    checkPro()
    fetchRecords()
  }, [address])

  const handleDownload = (record: any) => {
    if (!isPro) {
      alert('Pro 사용자만 PDF 저장이 가능합니다.')
      return
    }

    const element = document.createElement('div')
    element.innerHTML = `
      <h1>🧾 Trust Record</h1>
      <p><strong>Hash:</strong> ${record.hash}</p>
      <p><strong>Signed by:</strong> ${record.user}</p>
      <p><strong>Timestamp:</strong> ${new Date(record.timestamp).toLocaleString()}</p>
    `
    html2pdf().from(element).save(`trustmark-${record.hash}.pdf`)
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">📁 My Trust Records</h1>
      {records.map((record, idx) => (
        <div key={idx} className="border p-4 mb-4 rounded">
          <p><strong>Hash:</strong> {record.hash}</p>
          <p><strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString()}</p>
          <Button className="mt-2" onClick={() => handleDownload(record)}>
            Download PDF
          </Button>
        </div>
      ))}
    </main>
  )
}

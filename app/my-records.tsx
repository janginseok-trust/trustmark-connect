'use client'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import html2pdf from 'html2pdf.js'

export default function MyRecords() {
  const handleDownload = async () => {
    const userAddress = localStorage.getItem('trustmark:address')
    if (!userAddress) return alert('No wallet address found.')

    const q = query(collection(db, 'proofs'), where('address', '==', userAddress))
    const snapshot = await getDocs(q)

    let html = `<h1>My Signed Proofs</h1>`
    snapshot.forEach((doc) => {
      const d = doc.data()
      html += `<div style="margin-bottom:20px"><strong>Intent:</strong> ${d.intent}<br><strong>Timestamp:</strong> ${d.timestamp}<br><strong>Signature:</strong> ${d.signature}</div>`
    })

    const opt = {
      margin: 0.5,
      filename: 'proofs.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }

    html2pdf().set(opt).from(html).save()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">📜 My Signed Records</h1>
      <Button onClick={handleDownload}>Download PDF</Button>
    </div>
  )
}

// ✅ 버튼 컴포넌트 내부 정의
function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
    >
      {children}
    </button>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useParams } from 'next/navigation'
import { FaFileAlt, FaLink } from 'react-icons/fa'
import Link from 'next/link'

export default function SharePage() {
  const params = useParams()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, 'proofs', params.id as string)
      const snap = await getDoc(ref)
      if (snap.exists()) setData(snap.data())
    }
    fetchData()
  }, [params.id])

  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('proof-box')
    if (!element) return
    html2pdf().from(element).save()
  }

  if (!data) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div
        id="proof-box"
        className="border p-6 rounded-lg shadow-md text-center max-w-xl"
      >
        <h1 className="text-2xl font-bold mb-2">🪪 This proof is valid.</h1>
        <p>This signature has been verified and saved on Trustmark.</p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleDownload}
          className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaFileAlt />
          Download PDF
        </button>

        <button
          onClick={() => navigator.clipboard.writeText(location.href)}
          className="bg-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaLink />
          Copy Share Link
        </button>

        <Link
          href={`/share/${params.id}/detail`}
          className="bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaFileAlt />
          View Proof Detail
        </Link>
      </div>
    </div>
  )
}

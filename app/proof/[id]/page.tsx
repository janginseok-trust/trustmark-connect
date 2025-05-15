import { notFound } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default async function ProofPage({
  params,
}: {
  params: { id: string }
}) {
  const ref = doc(db, 'proofs', params.id)
  const snap = await getDoc(ref)

  if (!snap.exists()) return notFound()

  const { address, signature, intent, timestamp } = snap.data()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-3">
      <h1 className="text-xl font-bold">✅ Signature Verified</h1>
      <p><strong>Wallet:</strong> {address}</p>
      <p><strong>Intent:</strong> {intent}</p>
      <p><strong>Timestamp:</strong> {timestamp}</p>
      <p><strong>Signature:</strong></p>
      <code className="break-words text-sm bg-gray-100 p-2 rounded max-w-xl text-left">
        {signature}
      </code>
    </div>
  )
}

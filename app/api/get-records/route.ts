import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import app from '@/lib/firebase/firebase-admin'
import { getAddressFromHeaders } from '@/lib/firebase/getUser'

const db = getFirestore(app)

export async function GET(req: Request) {
  const address = getAddressFromHeaders(req.headers)
  if (!address) return NextResponse.json({ records: [] })

  const recordsRef = db.collection('records').where('address', '==', address.toLowerCase())
  const snapshot = await recordsRef.get()

  const records = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))

  return NextResponse.json({ records })
}

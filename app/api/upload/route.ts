import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import app from '@/lib/firebase/firebase-admin'
import { getAddressFromHeaders } from '@/lib/firebase/getUser'

const db = getFirestore(app)

export async function POST(req: Request) {
  const address = getAddressFromHeaders(req.headers)
  if (!address) return NextResponse.json({ success: false, error: 'No address' })

  const { data } = await req.json()
  if (!data) return NextResponse.json({ success: false, error: 'No data' })

  const recordRef = db.collection('records').doc()
  await recordRef.set({
    address: address.toLowerCase(),
    ...data,
    createdAt: Date.now(),
  })

  return NextResponse.json({ success: true, id: recordRef.id })
}

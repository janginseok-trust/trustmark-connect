import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import app from '@/lib/firebase/firebase-admin'
import { getAddressFromHeaders } from '@/lib/firebase/getUser'

const db = getFirestore(app)

export async function POST(req: Request) {
  const address = getAddressFromHeaders(req.headers)
  if (!address) return NextResponse.json({ success: false, error: 'No address' })

  const userRef = db.collection('users').doc(address.toLowerCase())
  const userSnap = await userRef.get()
  if (!userSnap.exists) {
    return NextResponse.json({ success: false, error: 'User not found' })
  }

  const credits = userSnap.data()?.credits ?? 0
  if (credits < 1) {
    return NextResponse.json({ success: false, error: 'Not enough credits' })
  }

  await userRef.update({ credits: credits - 1 })

  return NextResponse.json({ success: true, credits: credits - 1 })
}

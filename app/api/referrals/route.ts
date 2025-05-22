import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import app from '@/lib/firebase/firebase-admin'
import { getAddressFromHeaders } from '@/lib/firebase/getUser'

const db = getFirestore(app)

export async function POST(req: Request) {
  const address = getAddressFromHeaders(req.headers)
  if (!address) return NextResponse.json({ success: false, error: 'No address' })

  const { referralCode } = await req.json()
  if (!referralCode) return NextResponse.json({ success: false, error: 'No code' })

  const userRef = db.collection('users').doc(address.toLowerCase())
  await userRef.set({ referralCode }, { merge: true })

  return NextResponse.json({ success: true })
}

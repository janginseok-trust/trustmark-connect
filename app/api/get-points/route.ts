import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import app from '@/lib/firebase/firebase-admin'
import { getAddressFromHeaders } from '@/lib/firebase/getUser'

const db = getFirestore(app)

export async function GET(req: Request) {
  const address = getAddressFromHeaders(req.headers)
  if (!address) return NextResponse.json({ points: 0 })

  const userRef = db.collection('users').doc(address.toLowerCase())
  const userSnap = await userRef.get()

  if (!userSnap.exists) {
    await userRef.set({ isPro: false, credits: 0, points: 0 }, { merge: true })
    return NextResponse.json({ points: 0 })
  }

  const points = userSnap.data()?.points ?? 0
  return NextResponse.json({ points })
}

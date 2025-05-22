import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import app from '@/lib/firebase/firebase-admin'
import { getAddressFromHeaders } from '@/lib/firebase/getUser'

const db = getFirestore(app)

export async function GET(req: Request) {
  const address = getAddressFromHeaders(req.headers)
  if (!address) return NextResponse.json({ isPro: false })

  const userRef = db.collection('users').doc(address.toLowerCase())
  const userSnap = await userRef.get()

  // Create doc if not exists
  if (!userSnap.exists) {
    await userRef.set({ isPro: false, credits: 0, points: 0 }, { merge: true })
    return NextResponse.json({ isPro: false })
  }

  const isPro = userSnap.data()?.isPro === true
  return NextResponse.json({ isPro })
}

import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import credentials from '@/lib/firebase-admin-creds.json'

if (getApps().length === 0) {
  initializeApp({
    credential: cert(credentials),
  })
}

const db = getFirestore()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ isPro: false })
  }

  const userRef = db.collection('users').doc(address.toLowerCase())
  const userSnap = await userRef.get()

  const isPro = userSnap.exists && userSnap.data()?.isPro === true
  return NextResponse.json({ isPro })
}

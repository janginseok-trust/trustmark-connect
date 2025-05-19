import { NextResponse } from 'next/server'
import { cert, getApps, getApp, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
}

const app = getApps().length === 0
  ? initializeApp({ credential: cert(firebaseAdminConfig) })
  : getApp()

const db = getFirestore(app)

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

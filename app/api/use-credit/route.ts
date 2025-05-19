// 1. Firestore 구조: users/{address}/credits: number

// 2. API: /api/use-credit/route.ts

import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import credentials from '@/lib/firebase-admin-creds.json'

if (getApps().length === 0) {
  initializeApp({ credential: cert(credentials) })
}

const db = getFirestore()

export async function POST(req: Request) {
  const { address } = await req.json()
  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 })
  }

  const userRef = db.collection('users').doc(address.toLowerCase())
  const userSnap = await userRef.get()

  if (!userSnap.exists || typeof userSnap.data()?.credits !== 'number') {
    return NextResponse.json({ error: 'No credits' }, { status: 403 })
  }

  const credits = userSnap.data()!.credits
  if (credits < 1) {
    return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 })
  }

  await userRef.update({ credits: credits - 1 })
  return NextResponse.json({ success: true, remaining: credits - 1 })
}

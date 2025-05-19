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

export async function POST(req: Request) {
  const { address, message, signature } = await req.json()

  if (!address || !message || !signature) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const createdAt = new Date().toISOString()
  const doc = await db.collection('records').add({
    address: address.toLowerCase(),
    message,
    signature,
    createdAt,
  })

  return NextResponse.json({ id: doc.id })
}

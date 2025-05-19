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
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  const doc = await db.collection('records').doc(id).get()

  if (!doc.exists) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(doc.data())
}

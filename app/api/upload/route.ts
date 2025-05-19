import { NextResponse } from "next/server"
import { cert, getApps, getApp, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
}

const app = getApps().length === 0
  ? initializeApp({ credential: cert(firebaseAdminConfig) })
  : getApp()

const db = getFirestore(app)

export async function POST(req: Request) {
  const { message, address, signature, referralCode } = await req.json()

  if (!message || !address || !signature) {
    return NextResponse.json({ success: false })
  }

  await db.collection("records").add({
    message,
    address: address.toLowerCase(),
    signature,
    referralCode: referralCode || null,
    createdAt: Date.now(),
  })

  return NextResponse.json({ success: true })
}

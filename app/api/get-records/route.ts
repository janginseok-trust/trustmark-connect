import { cert, getApps, getApp, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

// 🔐 base64로 저장된 환경변수를 디코딩하여 firebase config로 사용
const base64Config = process.env.FIREBASE_ADMIN_CONFIG_BASE64 || "";
const firebaseConfig = JSON.parse(Buffer.from(base64Config, "base64").toString("utf-8"));

const app = getApps().length === 0
  ? initializeApp({ credential: cert(firebaseConfig) })
  : getApp();

const db = getFirestore(app);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  const snapshot = await db
    .collection("proofs")
    .where("address", "==", address)
    .get();

  const records = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json({ records });
}

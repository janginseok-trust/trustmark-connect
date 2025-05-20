import { NextResponse } from "next/server";
import { cert, getApps, getApp, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// 🔐 base64 인코딩된 Firebase 환경변수 디코딩
const base64 = process.env.FIREBASE_ADMIN_KEY_BASE64 || "";
const jsonString = Buffer.from(base64, "base64").toString("utf-8");
const firebaseAdminConfig = JSON.parse(jsonString);

// 🔧 Firebase 초기화
const app =
  getApps().length === 0
    ? initializeApp({ credential: cert(firebaseAdminConfig) })
    : getApp();

const db = getFirestore(app);

// ✅ GET 요청 처리
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  const snapshot = await db
    .collection("proofs")
    .where("address", "==", address)
    .orderBy("createdAt", "desc")
    .get();

  const records = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json({ records });
}

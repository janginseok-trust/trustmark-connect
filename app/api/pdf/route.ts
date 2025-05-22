import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase-admin/firestore'
import app from '@/lib/firebase/firebase-admin'
import { getAddressFromHeaders } from '@/lib/firebase/getUser'

const db = getFirestore(app)

export async function POST(req: Request) {
  const address = getAddressFromHeaders(req.headers)
  if (!address) return NextResponse.json({ success: false, error: 'No address found' })

  const recordsRef = db.collection('records').where('address', '==', address.toLowerCase())
  const snapshot = await recordsRef.get()
  const records = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))

  // PDF 생성 관련 비즈니스 로직 (여기에 실제 PDF 생성 함수 호출 등)
  // const pdfBuffer = await generatePdf(records)   // 예시

  // 실제로는 PDF 파일을 반환하거나, 다운로드 링크를 제공해야 함
  // 여기서는 예시로 기록 데이터만 반환
  return NextResponse.json({ success: true, records })
}

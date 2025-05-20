import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { auth } from '@clerk/nextjs/server'  // 여기서 server import 확인

export async function POST(req: NextRequest) {
  const authData = await auth()
  const userId = authData.userId
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  const code = data.code // 추천코드 (사용자 생성 or 임의 코드)
  
  const referralsRef = collection(db, 'referrals')
  const newReferral = {
    owner: userId,
    code,
    createdAt: new Date(),
  }
  await addDoc(referralsRef, newReferral)
  return NextResponse.json({ success: true })
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 })

  const referralsRef = collection(db, 'referrals')
  const q = query(referralsRef, where('code', '==', code))
  const querySnapshot = await getDocs(q)
  const referrals = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  return NextResponse.json(referrals)
}

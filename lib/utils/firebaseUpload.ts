// /lib/utils/firebaseUpload.ts

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { app } from '@/lib/firebase'

const db = getFirestore(app)

interface UploadParams {
  message: string
  address: string
  signature: string
}

// ✅ 업로드 함수 (기존 그대로 유지)
export async function signMessageHashAndSaveToFirestore({
  message,
  address,
  signature,
}: UploadParams) {
  const ref = collection(db, 'proofs')

  await addDoc(ref, {
    message,
    address,
    signature,
    createdAt: serverTimestamp(),
    public: true,
  })
}

// ✅ NEW: 리퍼럴 기록 보완 함수 (소문자 통일 적용)
export async function saveReferralIfValid({
  user,
  referrerCode,
}: {
  user: string
  referrerCode?: string
}) {
  if (!user || !referrerCode) return

  const referrer = referrerCode.toLowerCase()
  const normalizedUser = user.toLowerCase()

  // 1. 유효한 코드인지 확인
  const refDoc = doc(db, 'referrals', referrer)
  const exists = (await getDoc(refDoc)).exists()
  if (!exists) {
    console.warn('❌ Invalid referral code:', referrer)
    return
  }

  // 2. 이미 같은 user + referrer 조합이 있는지 확인
  const q = query(
    collection(db, 'referral_uses'),
    where('user', '==', normalizedUser),
    where('referrer', '==', referrer)
  )
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    console.warn('⚠️ Referral already recorded for this user/code.')
    return
  }

  // 3. 저장
  await addDoc(collection(db, 'referral_uses'), {
    referrer,
    user: normalizedUser,
    createdAt: serverTimestamp(),
  })

  console.log('✅ Referral recorded:', normalizedUser, '→', referrer)
}

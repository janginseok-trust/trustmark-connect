// lib/firebase/getUser.ts

import { doc, getDoc } from "firebase/firestore";
import { db } from "./server";

export async function getFirestoreUser(userId: string) {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export function getAddressFromHeaders(headers: Headers) {
  const address =
    headers.get('x-address') ||
    headers.get('X-ADDRESS') ||
    headers.get('address') ||
    headers.get('ADDRESS');
  return address ? String(address) : '';
}

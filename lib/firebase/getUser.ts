// lib/firebase/getUser.ts

import { doc, getDoc } from "firebase/firestore";
import { db } from "./server";

export async function getFirestoreUser(userId: string) {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

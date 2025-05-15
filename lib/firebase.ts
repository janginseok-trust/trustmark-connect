// lib/firebase.ts

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCj4kQDQRJsOCAUgPEhmeJJGM0DmcQO3f8",
  authDomain: "trustmark-b6188.firebaseapp.com",
  projectId: "trustmark-b6188",
  storageBucket: "trustmark-b6188.firebasestorage.app",
  messagingSenderId: "727698336183",
  appId: "1:727698336183:web:73b9869f403ac324c9e032"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const db = getFirestore(app)

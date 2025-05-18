'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

export default function AdminDashboard() {
  const [uploads, setUploads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const q = query(collection(db, 'proofs'), orderBy('createdAt', 'desc'), limit(20))
        const snap = await getDocs(q)
        const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setUploads(docs)
      } catch

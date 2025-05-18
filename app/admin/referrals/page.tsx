// /app/admin/referrals/page.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  Firestore,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminReferralStatsPage() {
  const [referralStats, setReferralStats] = useState<
    { referrer: string; count: number }[]
  >([])

  useEffect(() => {
    const fetchReferralStats = async () => {
      const snapshot = await getDocs(collection(db, 'referral_uses'))
      const counts: Record<string, number> = {}

      snapshot.forEach((doc) => {
        const data = doc.data()
        const ref = data.referrer?.toLowerCase()
        if (ref) {
          counts[ref] = (counts[ref] || 0) + 1
        }
      })

      const sorted = Object.entries(counts)
        .map(([referrer, count]) => ({ referrer, count }))
        .sort((a, b) => b.count - a.count)

      setReferralStats(sorted)
    }

    fetchReferralStats()
  }, [])

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BarChart3 className="w-6 h-6" />
        Referral Stats
      </h1>

      {referralStats.length === 0 ? (
        <p className="text-gray-500">No referral stats available.</p>
      ) : (
        <div className="space-y-2">
          {referralStats.map((item) => (
            <Card key={item.referrer}>
              <div className="p-4">
                <p>
                  <strong>Referrer:</strong> {item.referrer}
                </p>
                <p>
                  <strong>Joined:</strong> {item.count}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

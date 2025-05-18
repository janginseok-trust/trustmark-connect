import { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { app } from '@/lib/firebase'

export function useUserPro(address?: string) {
  const [isProUser, setIsProUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkProStatus = async () => {
      if (!address) {
        setIsProUser(false)
        setLoading(false)
        return
      }

      try {
        const db = getFirestore(app)
        const userDoc = await getDoc(doc(db, 'users', address))
        const data = userDoc.data()
        setIsProUser(!!data?.isPro)
      } catch (err) {
        console.error('Failed to check Pro status:', err)
        setIsProUser(false)
      } finally {
        setLoading(false)
      }
    }

    checkProStatus()
  }, [address])

  return { isProUser, loading }
}

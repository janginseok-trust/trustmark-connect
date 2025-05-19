// app/pro-required/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProRequired() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/upgrade")
    }, 2000)
    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">🚫 Pro access required</h1>
      <p className="text-sm text-gray-600">You’ve reached the free limit. Redirecting to upgrade...</p>
    </div>
  )
}
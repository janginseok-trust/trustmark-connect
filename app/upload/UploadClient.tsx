"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

export default function UploadClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { address } = useAccount()
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    const ref = searchParams.get("ref")
    if (ref) setReferralCode(ref)
  }, [searchParams])

  const handleSubmit = async () => {
    if (!address) {
      setStatus("❌ Wallet not connected")
      return
    }

    // 🔑 크레딧 차감 시도
    const creditRes = await fetch("/api/use-credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    })

    if (!creditRes.ok) {
      const data = await creditRes.json()
      if (data?.error === "Insufficient credits") {
        router.push("/upgrade")
        return
      }
      setStatus("❌ Failed to use credit")
      return
    }

    // ✅ 정상 크레딧 → 업로드
    setStatus("Uploading...")
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, referralCode }),
    })

    if (res.ok) {
      setStatus("✅ Uploaded successfully")
      setMessage("")
    } else {
      setStatus("❌ Upload failed")
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-lg font-bold mb-2">Upload Page</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  )
}

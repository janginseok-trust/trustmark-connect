'use client'

import { useAccount, useBalance } from 'wagmi'
import { useEffect, useState } from 'react'

export default function WalletPage() {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: balanceData } = useBalance({
    address,
  })

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Wallet</h1>
      {!mounted ? (
        <p>Loading...</p>
      ) : isConnected ? (
        <div>
          <p className="mb-1">Address: {address}</p>
          <p className="mb-4">
            Balance: {balanceData?.formatted} {balanceData?.symbol}
          </p>
        </div>
      ) : (
        <p>No wallet connected</p>
      )}
    </div>
  )
}

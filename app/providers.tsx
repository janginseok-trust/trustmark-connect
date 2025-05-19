'use client'

import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wallet/config'
import { queryClient } from '@/lib/wallet/queryClient'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{ appName: '' }} // ❌ 도움말 제거
          showRecentTransactions={false}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

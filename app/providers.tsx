'use client'

import { ReactNode } from 'react'
import { WagmiProvider, http } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  getDefaultConfig,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit'

const config = getDefaultConfig({
  appName: 'Trustmark',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, polygon, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{ appName: 'Trustmark' }}
          locale="en-US"
          showRecentTransactions={false}
          modalSize="compact" // 👈 이 줄이 하단 안내 + 이미지 제거
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

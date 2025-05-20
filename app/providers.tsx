'use client'

import { ReactNode } from 'react'
import { WagmiProvider, http } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  getDefaultConfig,
  RainbowKitProvider,
  Theme,
  darkTheme,
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
          showRecentTransactions={false}
          locale="en" // 영어 고정
          appInfo={{
            appName: 'Trustmark',
            // 👇 이 부분이 'What is a Wallet?' 박스 제거 핵심
            learnMoreUrl: undefined,
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

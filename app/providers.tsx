'use client'

import { ReactNode, useEffect, useState } from 'react'
import { WagmiProvider, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme
} from '@rainbow-me/rainbowkit'
import { mainnet } from 'wagmi/chains'

const config = getDefaultConfig({
  appName: 'Trustmark Connect',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  }
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.getElementById('modal-root')
      if (root) setModalRoot(root)
    }
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          modalMountPoint={modalRoot ?? undefined}
          appInfo={{ appName: 'Trustmark' }}
          theme={lightTheme({
            accentColor: '#6366f1',
            borderRadius: 'medium'
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

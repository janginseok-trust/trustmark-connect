'use client';

import { ReactNode } from 'react';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    appName: 'Trustmark',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [mainnet],
    transports: {
      [mainnet.id]: http('https://cloudflare-eth.com'),
    },
  })
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

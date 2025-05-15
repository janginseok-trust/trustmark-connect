// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trustmark',
  description: 'Web3 Proof Protocol',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`relative min-h-screen ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

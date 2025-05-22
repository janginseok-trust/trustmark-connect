import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'Trustmark',
  description: 'Leave proof with a wallet signature.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        <Header />
        <main className="pt-20 max-w-3xl mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}

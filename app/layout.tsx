import './globals.css';
import { Providers } from './providers';
import Link from 'next/link';

export const metadata = {
  title: 'Trustmark',
  description: 'Web3 Proof Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Providers>
          <header className="flex justify-between items-center px-6 py-4 shadow">
            <Link href="/" className="font-bold text-xl">Trustmark</Link>
            <nav className="space-x-4 text-sm">
              <Link href="/upload">Upload</Link>
              <Link href="/my-records">My Records</Link>
              <Link href="/points">Points</Link>
              <Link href="/referrals">Referrals</Link>
              <Link href="/upgrade" className="text-blue-600 font-semibold">Upgrade</Link>
            </nav>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

'use client';

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-lg font-semibold hover:underline">Trustmark</Link>
          <Link href="/upload" className="text-base text-gray-700 hover:underline">Upload</Link>
          <Link href="/my-records" className="text-base text-gray-700 hover:underline">My Records</Link>
          <Link href="/points" className="text-base text-gray-700 hover:underline">Points</Link>
          <Link href="/referrals" className="text-base text-gray-700 hover:underline">Referrals</Link>
        </div>
        <Link
          href="/upgrade"
          className="px-4 py-2 rounded-xl bg-black text-white font-semibold shadow hover:bg-gray-900 transition"
        >
          Upgrade
        </Link>
      </div>
    </header>
  );
}

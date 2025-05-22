'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Upgrade Banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 flex justify-between items-center rounded-lg shadow">
        <span className="font-semibold text-lg">
          Upgrade to PRO for unlimited access to all features! ($9.99/month)
        </span>
        <Link href="/upgrade">
          <span className="ml-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer">
            Upgrade →
          </span>
        </Link>
      </div>

      {/* Description */}
      <h1 className="text-3xl font-bold mb-4">Welcome to Trustmark</h1>
      <p className="mb-2">
        Leave proof with a simple wallet signature.<br />
        All records are permanently stored on blockchain.
      </p>

      <div className="mt-8 mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">🤔 Why go PRO?</h2>
        <ul className="list-disc ml-6 text-base">
          <li><b>Unlimited</b> uploads, sharing, and PDF downloads</li>
          <li>Permanent storage, no ads</li>
          <li>Upgrade or cancel anytime, instantly</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <div className="flex-1 bg-white p-4 rounded shadow text-center border border-gray-200">
          <h3 className="font-bold text-lg mb-2">FREE</h3>
          <p className="mb-2">Limited uploads/sharing</p>
          <p className="text-gray-400">Upload & PDF restricted</p>
        </div>
        <div className="flex-1 bg-black text-white p-4 rounded shadow text-center border-4 border-yellow-400">
          <h3 className="font-bold text-lg mb-2">PRO ($9.99/mo)</h3>
          <p className="mb-2">Unlimited uploads, sharing, PDF</p>
          <p className="font-semibold text-yellow-300">1-click payment, cancel anytime</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/upgrade">
          <span className="inline-block px-8 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition">
            Upgrade to PRO now
          </span>
        </Link>
      </div>
    </div>
  );
}

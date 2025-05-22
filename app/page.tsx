'use client';

import { ConnectKitButton } from 'connectkit';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <h1 className="text-4xl font-bold mb-6 text-black">Welcome to Trustmark</h1>
      <p className="text-lg text-gray-700 text-center max-w-xl">
        Leave proof with a simple wallet signature.<br />
        All records are permanently stored on blockchain.
      </p>

      <div className="mt-6">
        <ConnectKitButton />
      </div>

      <img
        src="/main-visual.png"
        alt="Why Trustmark is needed and how it works"
        className="mt-12 w-full max-w-2xl rounded-2xl shadow-2xl"
        loading="lazy"
      />
    </main>
  );
}

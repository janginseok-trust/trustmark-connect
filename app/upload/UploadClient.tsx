'use client';

import { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { useRouter } from 'next/navigation';

export default function UploadClient() {
  const { address } = useAccount();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { signMessageAsync } = useSignMessage();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      const res = await fetch('/api/get-credit');
      const data = await res.json();
      setCredits(data.credits ?? 0);
    };
    fetchCredits();
  }, []);

  const handleUpload = async () => {
    if (!message || !address) return;
    try {
      const signature = await signMessageAsync({ message });

      await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ message, address, signature }),
      });

      router.push('/my-records');
    } catch (e) {
      alert('Upload failed.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Upload a Proof</h2>
      <p className="text-sm text-gray-500">
        💰 This action costs <span className="font-semibold">1 credit</span>.
      </p>
      <p className="text-sm text-gray-500">
        🪙 Your current credits: {credits !== null ? `${credits}` : 'Loading...'}
      </p>
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows={4}
        placeholder="Enter message to sign"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        onClick={handleUpload}
      >
        Sign & Upload
      </button>
    </div>
  );
}

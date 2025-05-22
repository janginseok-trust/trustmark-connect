'use client';

import { useState } from "react";

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    // 필요한 값 있으면 여기에 추가
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // priceId, successUrl, cancelUrl, customerEmail 등 필요시
      })
    });

    if (!res.ok) {
      setLoading(false);
      alert('결제 페이지 이동 실패');
      return;
    }

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upgrade to PRO</h2>
      <p className="text-gray-700 mb-4">
        Get unlimited access to uploads, sharing, and PDF downloads for just <strong>$9.99/month</strong>.
      </p>
      <button
        onClick={handleUpgrade}
        className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Upgrade Now"}
      </button>
    </div>
  );
}

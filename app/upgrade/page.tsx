'use client';

export default function UpgradePage() {
  return (
    <div className="p-6 max-w-xl mx-auto text-center bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upgrade to PRO</h2>
      <p className="text-gray-700 mb-4">
        Get unlimited access to uploads, sharing, and PDF downloads for just <strong>$9.99/month</strong>.
      </p>
      <a
        href="/api/stripe/checkout"
        className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
      >
        Upgrade Now
      </a>
    </div>
  );
}

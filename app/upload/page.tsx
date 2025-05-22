// app/upload/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadClient from './UploadClient';

export default function UploadPage() {
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkPro() {
      const res = await fetch('/api/check-pro');
      const data = await res.json();

      if (!data.isPro) {
        router.replace('/pro-required');
      } else {
        setIsPro(true);
      }

      setLoading(false);
    }

    checkPro();
  }, [router]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!isPro) return null;

  return <UploadClient />;
}

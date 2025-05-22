'use client';

import { useEffect, useState } from 'react';

export default function PointsPage() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch('/api/get-points')
      .then((res) => res.json())
      .then((data) => setPoints(data.points ?? 0));
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto text-center bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">My Referral Points</h2>
      <p className="text-lg mt-4">
        🔗 You have <span className="font-semibold">{points}</span> points.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Every 10 points automatically convert to 1 credit.
      </p>
    </div>
  );
}

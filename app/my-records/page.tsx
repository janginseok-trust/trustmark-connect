'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function MyRecordsPage() {
  const { address } = useAccount();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!address) return;

      try {
        const res = await fetch(`/api/get-records?address=${address}`);
        if (!res.ok) {
          console.error('Failed to fetch records:', res.statusText);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setRecords(data.records || []);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [address]);

  if (loading) return <div>Loading records...</div>;
  if (!records.length) return <div>No records found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">My Records</h1>
      <ul className="space-y-2">
        {records.map((record) => (
          <li key={record.id} className="border p-4 rounded bg-white shadow">
            <div><strong>Hash:</strong> {record.hash}</div>
            <div><strong>Time:</strong> {new Date(record.createdAt._seconds * 1000).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

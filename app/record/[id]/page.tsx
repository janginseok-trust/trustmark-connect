'use client';

import { useParams } from 'next/navigation';

export default function RecordDetailPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Record 상세</h1>
      <div>id: {id}</div>
    </div>
  );
}

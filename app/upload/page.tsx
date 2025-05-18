import { Suspense } from 'react';
import UploadClient from './UploadClient';

export default function UploadPage() {
  return (
    <Suspense fallback={<div>Loading Upload Page...</div>}>
      <UploadClient />
    </Suspense>
  );
}

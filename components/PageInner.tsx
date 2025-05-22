// components/PageInner.tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function PageInner() {
  const searchParams = useSearchParams()
  const value = searchParams.get('value')

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Query: {value ?? 'None'}</h1>
    </div>
  )
}

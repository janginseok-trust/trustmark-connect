// components/PageClientWrapper.tsx
'use client'

import { useSearchParams } from 'next/navigation'

export function PageClientWrapper() {
  const searchParams = useSearchParams()
  const value = searchParams.get('value')

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Search Param: {value ?? 'None'}</h1>
    </div>
  )
}

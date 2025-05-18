// /components/ui/card.tsx

import React from 'react'
import { cn } from '@/lib/utils'

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-900 dark:border-gray-700',
        className
      )}
      {...props}
    />
  )
}

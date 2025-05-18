// app/support/page.tsx
import { Suspense } from 'react'
import SupportClient from './SupportClient'

export default function SupportPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🤖 Trustmark AI Support</h1>
      <Suspense fallback={<div>Loading chat...</div>}>
        <SupportClient />
      </Suspense>
    </main>
  )
}

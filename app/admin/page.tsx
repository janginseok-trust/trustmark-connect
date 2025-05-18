'use client'

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛠️ Admin Dashboard</h1>
      <ul className="list-disc list-inside space-y-2 text-blue-600">
        <li>
          <a href="/admin/logs" className="hover:underline">📜 View Upload Logs</a>
        </li>
        <li>
          <a href="/admin/referrals" className="hover:underline">🔗 Referral Stats</a>
        </li>
        <li>
          <a href="/upgrade" className="hover:underline">💳 Upgrade Page</a>
        </li>
      </ul>
    </div>
  )
}

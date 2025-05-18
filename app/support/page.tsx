'use client'

import { useState } from 'react'

export default function SupportPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hi! How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/support-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    })

    const data = await res.json()
    setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">🤖 AI Support Chat</h1>
      <div className="flex-1 space-y-3 overflow-y-auto border p-4 rounded mb-4 bg-white shadow-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p className="text-gray-500 text-sm">Thinking...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  )
}

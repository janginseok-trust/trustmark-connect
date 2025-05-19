'use client'

import { useState } from 'react'

export default function SupportPage() {
  const [input, setInput] = useState('')
  const [chat, setChat] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!input.trim()) return
    setLoading(true)

    const userMessage = `You: ${input}`
    setChat((prev) => [...prev, userMessage])

    try {
      const res = await fetch('/api/support-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()
      setChat((prev) => [...prev, `AI: ${data.reply}`])
    } catch (err) {
      console.error(err)
      setChat((prev) => [...prev, 'AI: Sorry, something went wrong.'])
    } finally {
      setInput('')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">💬 AI Support Chat</h1>

      <div className="border rounded p-4 mb-4 h-80 overflow-y-auto bg-white text-sm space-y-2">
        {chat.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
        {loading && <p className="text-gray-400 italic">AI is typing...</p>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Send
        </button>
      </div>
    </div>
  )
}

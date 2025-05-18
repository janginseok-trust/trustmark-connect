import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const messages = body.messages || []

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
    }),
  })

  const data = await res.json()
  const reply = data?.choices?.[0]?.message?.content || 'Sorry, something went wrong.'
  return NextResponse.json({ reply })
}

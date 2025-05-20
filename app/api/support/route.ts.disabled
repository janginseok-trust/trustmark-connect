import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    })

    const reply = chatCompletion.choices[0]?.message?.content ?? 'No response'
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('❌ AI API error:', err)
    return new NextResponse('Error calling OpenAI', { status: 500 })
  }
}

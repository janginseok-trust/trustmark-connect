import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages || [],
    })

    const reply = chatCompletion.choices[0]?.message?.content ?? 'No response'
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('❌ OpenAI error:', err)
    return new NextResponse('Error calling OpenAI API', { status: 500 })
  }
}

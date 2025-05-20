import { OpenAI } from 'openai'

export const dynamic = 'force-dynamic'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function POST(req: Request) {
  const body = await req.json()
  const messages = body.messages || []

  const chat = await openai.chat.completions.create({
    model: 'gpt-4o', // 또는 gpt-3.5-turbo
    messages,
    temperature: 0.7,
  })

  const assistant = chat.choices[0].message

  return Response.json({ assistant })
}

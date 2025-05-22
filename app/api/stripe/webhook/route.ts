import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-08-16' })

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!
  const body = await req.text()

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // 필요한 Stripe 이벤트 처리
  if (event.type === 'checkout.session.completed') {
    // 예: 유저 Pro 업그레이드, DB update 등
    // const session = event.data.object;
    // ... 
  }

  return NextResponse.json({ received: true })
}

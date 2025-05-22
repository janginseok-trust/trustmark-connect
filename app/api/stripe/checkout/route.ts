import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })

export async function POST(req: Request) {
  const { priceId, successUrl, cancelUrl, customerEmail } = await req.json()

  if (!priceId || !successUrl || !cancelUrl) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: customerEmail,
  })

  return NextResponse.json({ url: session.url })
}

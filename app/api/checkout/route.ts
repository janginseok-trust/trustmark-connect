import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST() {
  try {
    const headerList = await headers()
    const protocol = headerList.get('x-forwarded-proto') || 'http'
    const host = headerList.get('host') || 'localhost:3000'
    const origin = `${protocol}://${host}`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Trustmark Pro',
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/my-records?status=success`,
      cancel_url: `${origin}/upgrade?status=cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('❌ Stripe checkout error:', err)
    return new NextResponse('Stripe checkout failed', { status: 500 })
  }
}

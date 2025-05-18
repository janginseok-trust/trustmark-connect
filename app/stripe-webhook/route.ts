vimport { NextRequest } from 'next/server'
import { buffer } from 'micro'
import Stripe from 'stripe'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { app } from '@/lib/firebase'

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const rawBody = await req.arrayBuffer()
  const sig = req.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret)
  } catch (err) {
    console.error('❌ Webhook signature verification failed.', err)
    return new Response('Webhook Error', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const wallet = session.metadata?.walletAddress

    if (wallet) {
      const db = getFirestore(app)
      await setDoc(doc(db, 'users', wallet), { isPro: true }, { merge: true })
      console.log(`✅ Pro access granted to ${wallet}`)
    }
  }

  return new Response('Success', { status: 200 })
}

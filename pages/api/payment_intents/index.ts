import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01'
})

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  const {
    amount,
  }: { amount: number } = req.body

  try {
    const params: Stripe.PaymentIntentCreateParams = {
      amount,
      // payment_method_types: ['card'],
      currency: 'USD',
      automatic_payment_methods: {
        enabled: true
      }
    }

    const payment_intent: Stripe.PaymentIntent = 
      await stripe.paymentIntents.create(params)

    res.status(200).json(payment_intent)
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}
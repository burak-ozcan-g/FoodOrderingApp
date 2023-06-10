import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  console.log("girdi")
  console.log(req.body)
  if (req.method === 'POST') { 
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.lineItems,
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
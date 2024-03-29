import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  console.log(req.body)
  if (req.method === 'POST') { 
    console.log("postg")
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.lineItems,
        mode: 'payment',
        payment_method_types: ["card"],
        success_url: `https://food-ordering-app-fawn.vercel.app/success`,
        cancel_url: `https://food-ordering-app-fawn.vercel.app/`,
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
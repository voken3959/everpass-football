import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const sessionId = req.query.session;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.status(200).json({ valid: session.payment_status === "paid" });
}

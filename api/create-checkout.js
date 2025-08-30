import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "gbp",
        product_data: { name: "Gameweek 6 Pass" },
        unit_amount: 50, // 50p
      },
      quantity: 1,
    }],
    mode: "payment",
    success_url: "https://yourusername.github.io/football-streams/gameweek.html?session={CHECKOUT_SESSION_ID}",
    cancel_url: "https://yourusername.github.io/football-streams/index.html"
  });
  res.status(200).json({ url: session.url });
}

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Gameweek 6 Pass",
            },
            unit_amount: 50, // 50p in pennies
          },
          quantity: 1,
        },
      ],
      success_url: "https://yourusername.github.io/football-streams/frontend/gameweek.html?session={CHECKOUT_SESSION_ID}",
      cancel_url: "https://yourusername.github.io/football-streams/frontend/index.html",
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

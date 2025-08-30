import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: "Missing session_id" });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // ✅ User has paid → return your football stream links
      return res.status(200).json({
        unlocked: true,
        message: "Payment verified. Here are your gameweek links:",
        links: [
          "https://streamed.pk/embed/match1",
          "https://streamed.pk/embed/match2",
          "https://streamed.pk/embed/match3",
          "https://streamed.pk/embed/match4",
          "https://streamed.pk/embed/match5",
          "https://streamed.pk/embed/match6",
          "https://streamed.pk/embed/match7",
          "https://streamed.pk/embed/match8",
          "https://streamed.pk/embed/match9",
          "https://streamed.pk/embed/match10",
        ],
      });
    } else {
      // ❌ Not paid yet
      return res.status(200).json({ unlocked: false, message: "Payment not completed." });
    }
  } catch (err) {
    console.error("Verify session error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

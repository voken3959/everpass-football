"use client"; // if you’re using Next.js 13+ App Router

import { useState } from "react";

export default function BuyButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Error starting checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#635BFF",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {loading ? "Redirecting..." : "Buy Gameweek Pass (50p)"}
    </button>
  );
}

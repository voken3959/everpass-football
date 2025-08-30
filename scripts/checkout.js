// scripts/checkout.js
document.getElementById("buy").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/create-checkout", { method: "POST" });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe checkout
    } else {
      alert("Something went wrong");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Error starting checkout");
  }
});

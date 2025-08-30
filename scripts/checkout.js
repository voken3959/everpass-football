// Buy button (already exists)
document.getElementById("buy").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/create-checkout", { method: "POST" });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // Stripe checkout
    } else {
      alert("Something went wrong");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Error starting checkout");
  }
});

// Skip Payment button
document.getElementById("skip").addEventListener("click", () => {
  // Redirect directly to the success page in its folder
  window.location.href = "/success?session_id=skip-test";
});


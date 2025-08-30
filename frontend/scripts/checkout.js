document.getElementById("buy").addEventListener("click", async () => {
  const res = await fetch("https://your-vercel-app.vercel.app/api/create-checkout");
  const data = await res.json();
  window.location.href = data.url; // Stripe checkout link
});

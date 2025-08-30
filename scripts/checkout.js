document.getElementById("buy").addEventListener("click", async () => {
  const res = await fetch("https://everpass-football-4dua2vasb-voken3959s-projects.vercel.app/api/create-checkout");
  const data = await res.json();
  window.location.href = data.url;
});

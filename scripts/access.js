(async () => {
  const params = new URLSearchParams(window.location.search);
  const session = params.get("session");

  const res = await fetch(`https://everpass-football-4dua2vasb-voken3959s-projects.vercel.app/api/verify-session?session=${session}`);
  const data = await res.json();

  if (data.valid) {
    document.getElementById("streams").innerHTML = `
      <iframe src="YOUR_STREAM_LINK_1" width="640" height="360"></iframe>
      <iframe src="YOUR_STREAM_LINK_2" width="640" height="360"></iframe>
      <!-- Add more matches here -->
    `;
  } else {
    document.getElementById("streams").innerText = "Access Denied – Please buy a pass.";
  }
})();

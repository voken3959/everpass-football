(async () => {
  const params = new URLSearchParams(window.location.search);
  const session = params.get("session");

  const res = await fetch(`https://your-vercel-app.vercel.app/api/verify-session?session=${session}`);
  const data = await res.json();

  if (data.valid) {
    document.getElementById("streams").innerHTML = `
      <iframe src="https://embedsports.top/embed/alpha/manchester-united-vs-burnley/1"></iframe>
      <iframe src="https://your-secure-host/match2"></iframe>
      <iframe src="https://your-secure-host/match3"></iframe>
    `;
  } else {
    document.getElementById("streams").innerText = "Access Denied – Please buy a pass.";
  }
})();

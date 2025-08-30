import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: "Token required" });

  const email = Buffer.from(token, "base64").toString("ascii");

  const { data: user, error } = await supabase
    .from("users")
    .select("bought")
    .eq("email", email)
    .single();

  if (error || !user) return res.status(400).json({ error: "Invalid token" });

  res.status(200).json({ bought: user.bought });
}

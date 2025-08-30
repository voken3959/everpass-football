import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Generate a random token
  const token = crypto.randomBytes(16).toString("hex");

  // Store token in Supabase
  const { error } = await supabase.from("tokens").insert([{ token }]);
  if (error) return res.status(500).json({ error: error.message });

  // Return full URL to redirect user
  const url = `${process.env.SITE_URL}/dashboard?token=${token}`;
  res.status(200).json({ url });
}

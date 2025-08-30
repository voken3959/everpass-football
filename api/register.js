import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  // Check if user exists
  const { data: existing } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existing) return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const { error } = await supabase.from("users").insert([{ email, password: hashed }]);
  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: "User registered successfully" });
}

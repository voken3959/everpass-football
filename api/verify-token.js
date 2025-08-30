import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: "Token required" });

  const { data: record, error } = await supabase
    .from("tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !record || record.used) {
    return res.status(200).json({ valid: false });
  }

  // Optional: mark token as used if single-use
  await supabase.from("tokens").update({ used: true }).eq("token", token);

  res.status(200).json({ valid: true });
}

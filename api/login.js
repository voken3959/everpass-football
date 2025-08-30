const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const filePath = path.join(__dirname, "..", "users.json");
  let users = JSON.parse(fs.readFileSync(filePath));

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = Buffer.from(email).toString("base64");
  res.status(200).json({ message: "Login successful", token });
};

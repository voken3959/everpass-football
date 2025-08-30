const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const filePath = path.join(__dirname, "..", "users.json");
  let users = JSON.parse(fs.readFileSync(filePath));

  if (users.find(u => u.email === email)) return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed, bought: false });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.status(200).json({ message: "User registered successfully" });
};

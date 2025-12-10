const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { hashPassword, comparePassword, signToken } = require("../utils/auth");

const router = express.Router();

// POST /api/auth/register
router.post("/register", [
  body("name").isLength({ min: 1 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });
    const token = signToken({ userId: user._id });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", [
  body("email").isEmail(), body("password").exists()
], async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ userId: user._id });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email }});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

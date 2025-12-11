const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

// GET /api/user/me
router.get("/me", auth, async (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/user/preferences
router.put("/preferences", auth, async (req, res) => {
  const { goal, experience, equipment } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      "preferences.goal": goal,
      "preferences.experience": experience,
      "preferences.equipment": equipment,
    }, { new: true }).select("-password");

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/user/plans (save generated plan)
router.post("/plans", auth, async (req, res) => {
  const { title = "Untitled Plan", workouts = [] } = req.body;
  try {
    const user = await User.findById(req.user._id);
    user.savedPlans.unshift({ title, workouts, createdAt: Date.now() });
    await user.save();
    res.json({ savedPlans: user.savedPlans });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/user/plans
router.get("/plans", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("savedPlans");
    res.json({ savedPlans: user.savedPlans });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

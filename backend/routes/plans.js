// routes/plans.js
const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const User = require("../models/User"); // used to keep savedPlanIds in user document
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

// ---------------------------------------
// CREATE PLAN
// POST /api/plans
// ---------------------------------------
router.post(
  "/",
  auth,
  body("days").isArray({ min: 1 }).withMessage("At least one day is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, days, meta } = req.body;

      const plan = await Plan.create({
        userId: req.user._id,
        title: title || "Untitled Plan",
        description: description || "",
        days,
        meta: meta || {},
      });

      // keep the plan id in user's savedPlanIds for quick lookup
      try {
        await User.updateOne(
          { _id: req.user._id },
          { $addToSet: { savedPlanIds: plan._id } }
        );
      } catch (e) {
        console.warn("Failed to push plan id to user.savedPlanIds", e);
        // don't fail the request because of this, plan was created successfully
      }

      return res.status(201).json({ plan });
    } catch (err) {
      console.error("Create Plan Error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// ---------------------------------------
// GET ALL PLANS (Paginated)
// GET /api/plans?page=1&limit=10
// ---------------------------------------
router.get("/", auth, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1"), 1);
    const limit = Math.min(parseInt(req.query.limit || "10"), 50);
    const skip = (page - 1) * limit;

    const [plans, total] = await Promise.all([
      Plan.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Plan.countDocuments({ userId: req.user._id }),
    ]);

    return res.json({
      plans,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Get Plans Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------------------
// GET SINGLE PLAN
// GET /api/plans/:id
// ---------------------------------------
router.get("/:id", auth, async (req, res) => {
  try {
    const plan = await Plan.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    return res.json({ plan });
  } catch (err) {
    console.error("Get Plan Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------------------
// UPDATE PLAN (title, description, meta)
// PATCH /api/plans/:id
// ---------------------------------------
router.patch("/:id", auth, async (req, res) => {
  try {
    const updates = {};
    const { title, description, meta } = req.body;

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (meta !== undefined) updates.meta = meta;
    updates.updatedAt = new Date();

    const plan = await Plan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: updates },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    return res.json({ plan });
  } catch (err) {
    console.error("Update Plan Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------------------
// DELETE PLAN
// DELETE /api/plans/:id
// ---------------------------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Plan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Plan not found" });
    }

    return res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    console.error("Delete Plan Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------------------------------------
// MARK / UNMARK A DAY COMPLETED
// PATCH /api/plans/:id/day/:index/complete
// ---------------------------------------
router.patch("/:id/day/:index/complete", auth, async (req, res) => {
  try {
    const { id, index } = req.params;
    const { completed = true } = req.body;

    const plan = await Plan.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const idx = parseInt(index);
    if (isNaN(idx) || idx < 0 || idx >= plan.days.length) {
      return res.status(400).json({ message: "Invalid day index" });
    }

    // Update the day
    const day = plan.days[idx];
    day.completed = completed;
    day.completedAt = completed ? new Date() : null;

    await plan.save();

    return res.json({ plan });
  } catch (err) {
    console.error("Complete Day Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

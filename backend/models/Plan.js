// models/Plan.js
const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
  sets: Number,
  reps: Number,
});

const DaySchema = new mongoose.Schema({
  dateLabel: String,
  exercises: [ExerciseSchema],
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
});

const PlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: { type: String, default: "Untitled Plan" },
  description: String,
  days: [DaySchema],
  meta: {
    goal: String,
    difficulty: String,
    equipment: [String],
  },
}, { timestamps: true });

// ensure updatedAt changes on save
PlanSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

PlanSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Plan", PlanSchema);

const mongoose = require("mongoose");

const SavedExerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
  sets: Number,
  reps: Number,
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // hashed
  preferences: {
    goal: { type: String, default: "maintenance" }, // e.g., strength, fat-loss
    experience: { type: String, default: "beginner" }, // beginner/intermediate/expert
    equipment: { type: [String], default: [] }, // e.g., ['dumbbell','barbell']
  },
  savedPlans: [
    {
      title: String,
      createdAt: { type: Date, default: Date.now },
      workouts: [SavedExerciseSchema],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);

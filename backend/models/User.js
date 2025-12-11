const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },

  password: { type: String, required: true }, // hashed password

  preferences: {
    goal: { type: String, default: "maintenance" },
    experience: { type: String, default: "beginner" },
    equipment: { type: [String], default: [] },
  },

  // NEW: Only store references to plans, not full plans
  savedPlanIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Plan" }
  ],

  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Add useful index for login and lookups
UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);

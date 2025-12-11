require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workoutRoutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB if URI provided
const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
} else {
  console.warn("⚠️  No MONGO_URI found in environment; skipping DB connection.");
}

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("🏋️‍♂️ Workout API is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

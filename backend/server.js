require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Ensure JWT secret is present in production, provide a clear dev fallback otherwise
if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    console.error("FATAL: JWT_SECRET is not set. Set JWT_SECRET in your environment or .env file.");
    process.exit(1);
  } else {
    console.warn("⚠️  JWT_SECRET is not set. Using temporary development secret. Set JWT_SECRET in .env for real deployments.");
    process.env.JWT_SECRET = "dev-secret";
  }
}

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

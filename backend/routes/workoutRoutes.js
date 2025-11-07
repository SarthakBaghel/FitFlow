const express = require("express");

require("dotenv").config();

const router = express.Router();

// 🔑 API Ninjas key from .env
const API_KEY = process.env.X_API_KEY;

// Map workout “types” to muscle groups
const typeToMuscleMap = {
  push: ["chest", "shoulders", "triceps"],
  pull: ["back", "biceps"],
  legs: ["quadriceps", "hamstrings", "glutes", "calves"],
  core: ["abdominals", "lower_back"],
  fullbody: ["chest", "back", "legs", "shoulders", "arms"],
};

// ✅ GET /api/exercises?type=push&difficulty=beginner&equipment=dumbbell&limit=5
router.get("/", async (req, res) => {
  const type = req.query.type?.toLowerCase() || "push";
  const difficulty = req.query.difficulty?.toLowerCase() || "";
  const equipment = req.query.equipment?.toLowerCase() || "";
  const limit = parseInt(req.query.limit) || 10;

  // Resolve to relevant muscle groups
  const muscles = typeToMuscleMap[type] || ["chest"];

  try {
    // 1️⃣ Fetch exercises for each muscle
    const allData = await Promise.all(
      muscles.map(async (muscle) => {
        const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
        const resp = await fetch(url, {
          headers: { "X-Api-Key": API_KEY },
        });

        if (!resp.ok) {
          console.error(`❌ API Ninjas error for muscle=${muscle}: ${resp.status}`);
          return [];
        }

        const data = await resp.json();
        return Array.isArray(data) ? data : [];
      })
    );

    // 2️⃣ Flatten results
    let merged = allData.flat();

    // 3️⃣ Locally filter by difficulty and equipment
    if (difficulty)
      merged = merged.filter((ex) => ex.difficulty?.toLowerCase() === difficulty);
    if (equipment)
      merged = merged.filter((ex) => ex.equipment?.toLowerCase() === equipment);

    if (merged.length === 0) {
      return res.status(404).json({
        message: "No exercises found after applying filters.",
        filters_used: { type, difficulty, equipment },
      });
    }

    // 4️⃣ Randomize and limit
    const selected = merged.sort(() => 0.5 - Math.random()).slice(0, limit);

    // 5️⃣ Clean results (only real API fields)
    const cleanResults = selected.map((ex) => ({
      name: ex.name,
      type: ex.type,
      muscle: ex.muscle,
      equipment: ex.equipment,
      difficulty: ex.difficulty,
      instructions: ex.instructions,
    }));

    // 6️⃣ Send structured response
    res.json({
      filters_used: { type, difficulty, equipment },
      total_results: cleanResults.length,
      exercises: cleanResults,
    });
  } catch (error) {
    console.error("❌ Error fetching from API Ninjas:", error);
    res.status(500).json({ error: "Failed to fetch exercises from API Ninjas." });
  }
});

module.exports = router;

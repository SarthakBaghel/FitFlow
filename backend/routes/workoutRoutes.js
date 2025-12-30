const express = require("express");
require("dotenv").config();

const router = express.Router();
const API_KEY = process.env.X_API_KEY;

// ✅ GET /api/exercises?muscle=biceps&type=strength&difficulty=beginner&name=press&limit=10
router.get("/", async (req, res) => {
  try {
    // Extract query params
    const muscle = req.query.muscle?.toLowerCase() || "";
    const difficulty = req.query.difficulty?.toLowerCase() || "";
    const exerciseType = req.query.type?.toLowerCase() || ""; // exercise type (e.g. strength, cardio)
    const name = req.query.name?.toLowerCase() || ""; // search by name substring
    const equipment = req.query.equipment?.toLowerCase() || "";
    const limit = parseInt(req.query.limit) || 10;

    // 🔧 Build dynamic URL
    const params = new URLSearchParams();
    if (muscle) params.append("muscle", muscle);
    if (difficulty) params.append("difficulty", difficulty);
    if (exerciseType) params.append("type", exerciseType);
    if (name) params.append("name", name);
    if (equipment) params.append("equipment", equipment);

    const apiUrl = `https://api.api-ninjas.com/v1/exercises?${params.toString()}`;
    console.log(`🔍 Fetching: ${apiUrl}`);

    // 🌐 Fetch from API Ninjas
    const response = await fetch(apiUrl, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) {
      const bodyText = await response.text();
      let providerMsg = null;
      try {
        const parsed = JSON.parse(bodyText);
        providerMsg = parsed.error || parsed.message || null;
      } catch (e) {
        providerMsg = bodyText;
      }
      console.error(`❌ API Ninjas error: ${response.status}`, providerMsg);
      return res.status(response.status).json({
        error: `API error: ${response.statusText}`,
        provider_message: providerMsg,
        raw: bodyText,
      });
    }

    const data = await response.json();

    // 🧠 Apply local fallback filtering
    let filtered = Array.isArray(data) ? data : [];
    if (equipment)
      filtered = filtered.filter(
        (ex) => ex.equipment?.toLowerCase() === equipment
      );

    // 🌀 Shuffle and limit
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, limit);

    // 🧹 Clean results
    const cleanResults = shuffled.map((ex) => ({
      name: ex.name,
      type: ex.type,
      muscle: ex.muscle,
      // equipment: ex.equipment,
      difficulty: ex.difficulty,
      instructions: ex.instructions,
    }));

    // ✅ Send structured response
    res.json({
      filters_used: { muscle, difficulty, type: exerciseType, name },
      total_results: cleanResults.length,
      exercises: cleanResults,
    });
  } catch (error) {
    console.error("❌ Error fetching from API Ninjas:", error);
    res.status(500).json({
      error: "Failed to fetch exercises from API Ninjas.",
      details: error.message,
    });
  }
});

module.exports = router;

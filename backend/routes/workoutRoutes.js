const express = require("express");

const router = express.Router();

const categoryMap = {
  push: [10, 8, 12],
  pull: [9, 11],
  legs: [7],
  core: [14],
  fullbody: [7, 8, 9, 10, 11, 12, 14],
};

router.get("/", async (req, res) => {
  const type = req.query.type || "push";
  const categories = categoryMap[type] || [10];

  try {
    const response = await fetch("https://wger.de/api/v2/exercise/?language=2&limit=200");
    const data = await response.json();

    console.log(data);

    const filtered = data.results.filter(ex => categories.includes(ex.category));

    // Shuffle for random selection
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const withImages = await Promise.all(
      selected.map(async (ex) => {
        const imgResp = await fetch(`https://wger.de/api/v2/exerciseimage/?exercise=${ex.id}`);
        const imgData = await imgResp.json();
        return {
          id: ex.id,
          name: ex.name,
          description: ex.description,
          image: imgData.results[0]?.image || "https://via.placeholder.com/300x300?text=No+Image",
        };
      })
    );

    res.json(withImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});

module.exports = router;

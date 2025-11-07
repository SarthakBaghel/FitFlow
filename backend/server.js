const express = require('express');
const app = express();
const cors = require('cors');
const workoutRoutes = require("./routes/workoutRoutes");


app.use(cors());
app.use(express.json());
app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.send("🏋️‍♂️ Workout API is running");
});

PORT = 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

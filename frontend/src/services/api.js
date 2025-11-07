import axios from "axios";

const API_URL = "http://localhost:8000/api";

// ✅ Flexible Fetch Function for All Filters
export const fetchWorkouts = async ({
  muscle = "chest",
  difficulty = "beginner",
  exerciseType = "strength",
  equipment = "",
  limit = 10,
}) => {
  try {
    // Build the query string dynamically
    const params = new URLSearchParams();

    if (muscle) params.append("muscle", muscle);
    if (difficulty) params.append("difficulty", difficulty);
    if (exerciseType) params.append("type", exerciseType);
    if (equipment) params.append("equipment", equipment);
    if (limit) params.append("limit", limit);

    const res = await axios.get(`${API_URL}/workouts?${params.toString()}`);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching workouts:", error.message);
    return { exercises: [] };
  }
};

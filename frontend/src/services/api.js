import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";


const api = axios.create({ baseURL: `${API_URL}/api` });

// Add JWT token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------------------------------------------
// ✅ Fetch workouts with dynamic filters
// ---------------------------------------------
export const fetchWorkouts = async ({
  muscle = "",
  difficulty = "",
  exerciseType = "",
  // equipment = "",
  limit = 10,
}) => {
  try {
    const params = new URLSearchParams();

    if (muscle) params.append("muscle", muscle);
    if (difficulty) params.append("difficulty", difficulty);
    if (exerciseType) params.append("type", exerciseType);
    // if (equipment) params.append("equipment", equipment);
    if (limit) params.append("limit", limit);

    const res = await api.get(`/workouts?${params.toString()}`);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching workouts:", error.message);
    return { exercises: [] };
  }
};

export default api;

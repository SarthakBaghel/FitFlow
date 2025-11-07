import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const fetchWorkouts = async (type = "push") => {
  try {
    const res = await axios.get(`${API_URL}/workouts?type=${type}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
};

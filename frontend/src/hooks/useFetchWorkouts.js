import { useState, useEffect } from "react";
import { fetchWorkouts } from "../services/api";

export default function useFetchWorkouts(type) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchWorkouts(type)
      .then(data => setWorkouts(data))
      .finally(() => setLoading(false));
  }, [type]);

  return { workouts, loading };
}

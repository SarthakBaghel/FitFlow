import { useState, useEffect } from "react";
import { fetchWorkouts } from "../services/api";
import WorkoutCard from "../components/WorkoutCard";
import Loader from "../components/Loader";

export default function WorkoutGenerator() {
  const [type, setType] = useState("push");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadWorkouts = async () => {
    setLoading(true);
    const data = await fetchWorkouts(type);
    setWorkouts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWorkouts();
  }, [type]);

  return (
    <div className="workout-page">
      <h1>Generate Your Workout Plan</h1>

      <div className="controls">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="push">Push</option>
          <option value="pull">Pull</option>
          <option value="legs">Legs</option>
          <option value="core">Core</option>
          <option value="fullbody">Full Body</option>
        </select>
        <button onClick={loadWorkouts}>Generate New Plan 🔁</button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="workout-grid">
          {workouts.map((ex) => (
            <WorkoutCard
              key={ex.id}
              name={ex.name}
              image={ex.image}
              description={ex.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}

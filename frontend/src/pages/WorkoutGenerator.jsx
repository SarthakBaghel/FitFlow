import { useState, useEffect } from "react";
import { fetchWorkouts } from "../services/api";
import Loader from "../components/Loader";

export default function WorkoutGenerator() {
  const [type, setType] = useState("push");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to generate random reps/sets
  const getRandomPlan = () => {
    const sets = Math.floor(Math.random() * 3) + 3; // 3–5 sets
    const reps = Math.floor(Math.random() * 6) + 8; // 8–14 reps
    return { sets, reps };
  };

  const loadWorkouts = async () => {
    setLoading(true);
    const data = await fetchWorkouts(type);
    const enriched = data.map((ex) => ({
      ...ex,
      plan: getRandomPlan(),
    }));
    setWorkouts(enriched);
    setLoading(false);
  };

  useEffect(() => {
    loadWorkouts();
  }, [type]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white py-12 px-6">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
        🏋️ Your {type.charAt(0).toUpperCase() + type.slice(1)} Workout Plan
      </h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition"
        >
          <option value="push">Push</option>
          <option value="pull">Pull</option>
          <option value="legs">Legs</option>
          <option value="core">Core</option>
          <option value="fullbody">Full Body</option>
        </select>

        <button
          onClick={loadWorkouts}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
        >
          Generate New Plan 🔁
        </button>
      </div>

      {/* Results Section */}
      {loading ? (
        <Loader />
      ) : workouts.length > 0 ? (
        <div className="max-w-3xl mx-auto bg-gray-900 bg-opacity-60 rounded-xl shadow-lg p-6 divide-y divide-gray-700">
          {workouts.map((ex, idx) => (
            <div
              key={ex.id}
              className="flex flex-col sm:flex-row items-center gap-6 py-6 hover:bg-gray-800 rounded-lg transition"
            >
              {/* Exercise Image */}
              <img
                src={ex.image || "https://via.placeholder.com/100x100?text=No+Image"}
                alt={ex.name}
                className="w-24 h-24 object-cover rounded-lg border border-gray-700"
              />

              {/* Exercise Info */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-blue-400 mb-1">
                  {idx + 1}. {ex.name}
                </h3>
                <p
                  className="text-gray-300 text-sm mb-2"
                  dangerouslySetInnerHTML={{
                    __html: ex.description
                      ? ex.description.slice(0, 120) + "..."
                      : "No description available",
                  }}
                />
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                  <p>
                    🔁 <span className="font-semibold text-gray-200">{ex.plan.sets}</span> sets
                  </p>
                  <p>
                    💪 <span className="font-semibold text-gray-200">{ex.plan.reps}</span> reps
                  </p>
                  <p>🏋️ Type: {type.toUpperCase()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg mt-10">
          No workouts found for this type. Try another plan!
        </p>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { fetchWorkouts } from "../services/api";
import Loader from "../components/Loader";

export default function WorkoutGenerator() {
  const [type, setType] = useState("push");
  const [difficulty, setDifficulty] = useState("beginner");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadWorkouts = async () => {
    setLoading(true);
    try {
      const data = await fetchWorkouts(type, difficulty); // API call from /services/api.js
      setWorkouts(data?.exercises || []);
    } catch (err) {
      console.error("Failed to load workouts:", err);
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, [type, difficulty]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white py-12 px-6">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
        🏋️ {type.charAt(0).toUpperCase() + type.slice(1)} Workout Plan
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

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
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
        <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-60 rounded-xl shadow-lg p-6 divide-y divide-gray-700">
          {workouts.map((ex, idx) => (
            <div
              key={`${ex.name}-${idx}`}
              className="flex flex-col sm:flex-row items-start gap-6 py-6 hover:bg-gray-800 rounded-lg transition"
            >
              {/* Placeholder Image (API Ninjas has no images) */}
              <img
                src={`https://via.placeholder.com/100x100.png?text=${encodeURIComponent(
                  ex.muscle || "Workout"
                )}`}
                alt={ex.name}
                className="w-24 h-24 object-cover rounded-lg border border-gray-700"
              />

              {/* Exercise Info */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-blue-400 mb-1">
                  {idx + 1}. {ex.name}
                </h3>

                <p className="text-gray-300 text-sm mb-2">
                  {ex.instructions
                    ? ex.instructions.slice(0, 150) + "..."
                    : "No instructions available."}
                </p>

                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                  <p>🏋️ Type: {ex.type || "N/A"}</p>
                  <p>💪 Muscle: {ex.muscle || "N/A"}</p>
                  <p>🎯 Difficulty: {ex.difficulty || "N/A"}</p>
                  <p>🧰 Equipment: {ex.equipment || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg mt-10">
          No workouts found for this combination. Try different options!
        </p>
      )}
    </div>
  );
}

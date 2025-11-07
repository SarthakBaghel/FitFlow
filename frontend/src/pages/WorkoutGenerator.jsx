import { useState, useEffect } from "react";
import { fetchWorkouts } from "../services/api";
import WorkoutCard from "../components/WorkoutCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

export default function WorkoutGenerator() {
  const [type, setType] = useState("push");
  const [difficulty, setDifficulty] = useState("beginner");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadWorkouts = async () => {
    setLoading(true);
    try {
      const data = await fetchWorkouts(type, difficulty);
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
      <h1 className="text-5xl font-extrabold text-center mb-10 tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        🏋️ Personalized Workout Planner
      </h1>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
        {/* LEFT: Filter Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/3 h-fit self-start bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/60 rounded-2xl p-8 shadow-xl backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">
            ⚙️ Workout Filters
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <label className="block mb-2 text-gray-300 font-semibold">
                Workout Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              >
                <option value="push">Push</option>
                <option value="pull">Pull</option>
                <option value="legs">Legs</option>
                <option value="core">Core</option>
                <option value="fullbody">Full Body</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-300 font-semibold">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <button
              onClick={loadWorkouts}
              className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              Generate New Plan 🔁
            </button>
          </div>
        </motion.div>

        {/* RIGHT: Workout Cards */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : workouts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="flex flex-col gap-6"
            >
              {workouts.map((ex, idx) => (
                <WorkoutCard
                  key={`${ex.name}-${idx}`}
                  index={idx}
                  name={ex.name}
                  type={ex.type}
                  muscle={ex.muscle}
                  equipment={ex.equipment}
                  difficulty={ex.difficulty}
                  instructions={ex.instructions}
                />
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-400 text-lg mt-10">
              No workouts found for this combination. Try different filters!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

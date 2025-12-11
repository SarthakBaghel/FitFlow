import { useState, useEffect } from "react";
import { fetchWorkouts } from "../services/api";
import WorkoutCard from "../components/WorkoutCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

export default function WorkoutGenerator() {
  const [muscle, setMuscle] = useState("chest");
  const [difficulty, setDifficulty] = useState("beginner");
  const [exerciseType, setExerciseType] = useState("strength");
  const [equipment, setEquipment] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWorkouts = async () => {
    setLoading(true);
    setError("");
    try {
      // ✅ Ensure we pass all filter params to backend
      const data = await fetchWorkouts({ muscle, difficulty, exerciseType, equipment });
      if (data?.exercises?.length > 0) {
        setWorkouts(data.exercises);
      } else {
        setWorkouts([]);
        setError("No workouts found for this combination.");
      }
    } catch (err) {
      console.error("❌ Failed to load workouts:", err);
      setError("Error fetching workouts. Please try again.");
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, [muscle, difficulty, exerciseType, equipment]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white py-12 px-6">
      <h1 className="text-5xl font-extrabold text-center mb-10 tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        🏋️ AI-Powered Workout Generator
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
            {/* Exercise Type */}
            <div>
              <label className="block mb-2 text-gray-300 font-semibold">
                Exercise Type
              </label>
              <select
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              >
                <option value="">Any</option>
                <option value="cardio">Cardio</option>
                <option value="olympic_weightlifting">Olympic Weightlifting</option>
                <option value="plyometrics">Plyometrics</option>
                <option value="powerlifting">Powerlifting</option>
                <option value="strength">Strength</option>
                <option value="stretching">Stretching</option>
                <option value="strongman">Strongman</option>
              </select>
            </div>

            {/* Target Muscle */}
            <div>
              <label className="block mb-2 text-gray-300 font-semibold">
                Target Muscle
              </label>
              <select
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              >
                <option value="">Any</option>
                <option value="abdominals">Abdominals</option>
                <option value="abductors">Abductors</option>
                <option value="adductors">Adductors</option>
                <option value="biceps">Biceps</option>
                <option value="calves">Calves</option>
                <option value="chest">Chest</option>
                <option value="forearms">Forearms</option>
                <option value="glutes">Glutes</option>
                <option value="hamstrings">Hamstrings</option>
                <option value="lats">Lats</option>
                <option value="lower_back">Lower Back</option>
                <option value="middle_back">Middle Back</option>
                <option value="neck">Neck</option>
                <option value="quadriceps">Quadriceps</option>
                <option value="shoulder">Shoulder</option>
                <option value="traps">Traps</option>
                <option value="triceps">Triceps</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block mb-2 text-gray-300 font-semibold">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              >
                <option value="">Any</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Equipment */}
            {/* <div>
              <label className="block mb-2 text-gray-300 font-semibold">
                Equipment
              </label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              >
                <option value="">Any</option>
                <option value="body_only">Bodyweight</option>
                <option value="dumbbell">Dumbbell</option>
                <option value="barbell">Barbell</option>
                <option value="e-z_curl_bar">EZ Curl Bar</option>
                <option value="machine">Machine</option>
                <option value="kettlebell">Kettlebell</option>
                <option value="cable">Cable</option>
                <option value="bands">Resistance Bands</option>
                <option value="medicine_ball">Medicine Ball</option>
                <option value="foam_roll">Foam Roller</option>
                <option value="exercise_ball">Exercise Ball</option>
                <option value="other">Other</option>
              </select>
            </div> */}

            {/* Generate Button */}
            <button
              onClick={loadWorkouts}
              className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              Generate New Plan 🔁
            </button>
          </div>
        </motion.div>

        {/* RIGHT: Workout Results */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : error ? (
            <p className="text-center text-red-400 text-lg mt-10">{error}</p>
          ) : workouts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
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
              No workouts found. Try adjusting your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

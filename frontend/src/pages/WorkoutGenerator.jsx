import { useState, useEffect } from "react";
import { fetchWorkouts } from "../services/api";
import { createPlan } from "../services/plans";
import WorkoutCard from "../components/WorkoutCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PreWorkoutSetup from "../components/PreWorkoutSetup";

export default function WorkoutGenerator() {
  const navigate = useNavigate();

  const [muscle, setMuscle] = useState("chest");
  const [difficulty, setDifficulty] = useState("beginner");
  const [exerciseType, setExerciseType] = useState("strength");
  const [equipment, setEquipment] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showSetup, setShowSetup] = useState(false);

  // Save plan state
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // -----------------------
  // Load workouts
  // -----------------------
  const loadWorkouts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchWorkouts({
        muscle,
        difficulty,
        exerciseType,
        equipment,
      });

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

  // -----------------------
  // Save plan
  // -----------------------
  const handleSavePlan = async () => {
    if (!workouts.length) {
      setSaveMessage("No workouts to save.");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    setSaving(true);
    setSaveMessage("");

    const todayLabel = new Date().toLocaleDateString();

    const payload = {
      title: `${muscle ? muscle.charAt(0).toUpperCase() + muscle.slice(1) : "Workout"} - ${todayLabel}`,
      description: `Generated workout plan`,
      days: [
        {
          dateLabel: todayLabel,
          exercises: workouts,
          completed: false,
          completedAt: null,
        },
      ],
    };

    try {
      await createPlan(payload);
      setSaveMessage("Plan saved successfully.");
    } catch (err) {
      setSaveMessage("Failed to save plan.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(""), 3500);
    }
  };

  // -----------------------
  // Render
  // -----------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white py-12 px-6">
      <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        🏋️ AI-Powered Workout Generator
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/3 bg-gray-900/90 rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">
            ⚙️ Workout Filters
          </h2>

          <div className="flex flex-col gap-6">
            {/* Exercise Type */}
            <select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              className="p-3 bg-gray-800 rounded"
            >
              <option value="">Any Type</option>
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
            </select>

            {/* Muscle */}
            <select
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
              className="p-3 bg-gray-800 rounded"
            >
              <option value="">Any Muscle</option>
              <option value="chest">Chest</option>
              <option value="biceps">Biceps</option>
              <option value="triceps">Triceps</option>
              <option value="shoulder">Shoulder</option>
              <option value="legs">Legs</option>
            </select>

            {/* Difficulty */}
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="p-3 bg-gray-800 rounded"
            >
              <option value="">Any Difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>

            {/* Buttons */}
            <button
              onClick={loadWorkouts}
              className="py-3 bg-blue-600 rounded hover:bg-blue-700"
            >
              Generate New Plan 🔁
            </button>

            <button
              onClick={handleSavePlan}
              disabled={saving || !workouts.length}
              className="py-3 bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-600"
            >
              {saving ? "Saving..." : "Save Plan"}
            </button>

            <button
              onClick={() => setShowSetup(true)}
              disabled={!workouts.length}
              className="py-3 bg-orange-600 rounded hover:bg-orange-700 disabled:bg-gray-600"
            >
              ▶ Start Workout
            </button>

            {saveMessage && (
              <p className="text-center text-sm text-gray-300">
                {saveMessage}
              </p>
            )}
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : (
            workouts.map((ex, idx) => (
              <WorkoutCard key={idx} {...ex} index={idx} />
            ))
          )}
        </div>
      </div>

      {/* PRE-WORKOUT SETUP MODAL */}
      {showSetup && (
        <PreWorkoutSetup
          onClose={() => setShowSetup(false)}
          onStart={(settings) => {
            setShowSetup(false);
            navigate("/workout-session", {
              state: {
                workouts,
                settings,
              },
            });
          }}
        />
      )}
    </div>
  );
}

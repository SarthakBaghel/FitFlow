import { useState, useEffect } from "react";
import { fetchWorkouts } from "../services/api";
import { createPlan } from "../services/plans";
import WorkoutCard from "../components/WorkoutCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PreWorkoutSetup from "../components/PreWorkoutSetup";
import SparklesBackground from "@/components/SparklesBackground";

export default function WorkoutGenerator() {
  const navigate = useNavigate();

  const [muscle, setMuscle] = useState("chest");
  const [difficulty, setDifficulty] = useState("beginner");
  const [exerciseType, setExerciseType] = useState("strength");

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showSetup, setShowSetup] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const loadWorkouts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchWorkouts({ muscle, difficulty, exerciseType });
      if (data?.exercises?.length) {
        setWorkouts(data.exercises);
      } else {
        setWorkouts([]);
        setError("No workouts found for this combination.");
      }
    } catch {
      setError("Failed to fetch workouts.");
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, [muscle, difficulty, exerciseType]);

  const handleSavePlan = async () => {
    if (!workouts.length) return;

    setSaving(true);
    setSaveMessage("");

    const payload = {
      title: `${muscle} workout`,
      description: "Generated workout plan",
      days: [
        {
          date: new Date().toISOString(),
          exercises: workouts,
          completed: false,
        },
      ],
      meta: { difficulty },
    };

    try {
      await createPlan(payload);
      setSaveMessage("Plan saved");
    } catch {
      setSaveMessage("Save failed");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* 🔹 Background */}
      <SparklesBackground />

      {/* 🔹 Content */}
      <div className="relative z-10 px-6 pt-28 pb-12 text-white">
        <h1 className="text-4xl font-semibold text-center mb-12 tracking-tight">
          Generate Workout
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="self-start rounded-2xl bg-white/5 border border-white/10
                       backdrop-blur-xl p-6 space-y-5"
          >
            <h2 className="text-lg font-medium text-gray-200">
              Filters
            </h2>

            <select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10"
            >
              <option value="">Any type</option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="plyometrics">Plyometrics</option>
              <option value="stretching">Stretching</option>
            </select>

            <select
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10"
            >
              <option value="">Any muscle</option>
              <option value="chest">Chest</option>
              <option value="biceps">Biceps</option>
              <option value="triceps">Triceps</option>
              <option value="shoulder">Shoulder</option>
              <option value="quadriceps">Quadriceps</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10"
            >
              <option value="">Any level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>

            <div className="pt-2 space-y-3">
              <button
                onClick={loadWorkouts}
                className="w-full py-3 rounded-md bg-white text-black text-sm
                           hover:opacity-90 transition"
              >
                Generate
              </button>

              <button
                onClick={handleSavePlan}
                disabled={saving || !workouts.length}
                className="w-full py-3 rounded-md bg-white/10 text-white text-sm
                           hover:bg-white/20 transition disabled:opacity-40"
              >
                {saving ? "Saving..." : "Save plan"}
              </button>

              <button
                onClick={() => setShowSetup(true)}
                disabled={!workouts.length}
                className="w-full py-3 rounded-md border border-white/20
                           hover:bg-white/10 transition disabled:opacity-40"
              >
                Start workout
              </button>

              {saveMessage && (
                <p className="text-center text-xs text-gray-400">
                  {saveMessage}
                </p>
              )}
            </div>
          </motion.div>

          {/* Results */}
          <div className="space-y-6">
            {loading ? (
              <Loader />
            ) : error ? (
              <p className="text-center text-red-400">{error}</p>
            ) : workouts.length ? (
              workouts.map((ex, idx) => (
                <WorkoutCard key={`${ex.name}-${idx}`} {...ex} index={idx} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Adjust filters to generate workouts
              </p>
            )}
          </div>
        </div>
      </div>

      {showSetup && (
        <PreWorkoutSetup
          onClose={() => setShowSetup(false)}
          onStart={(settings) => {
            setShowSetup(false);
            navigate("/workout-session", {
              state: { workouts, settings },
            });
          }}
        />
      )}
    </div>
  );
}

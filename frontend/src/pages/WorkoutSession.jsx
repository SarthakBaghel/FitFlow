import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";

export default function WorkoutSession() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const workouts = state?.workouts || [];
  const settings = state?.settings || null;

  // -----------------------
  // Safety redirect
  // -----------------------
  useEffect(() => {
    if (!workouts.length || !settings) {
      navigate("/");
    }
  }, [workouts, settings, navigate]);

  // -----------------------
  // Build timeline
  // -----------------------
  const timeline = useMemo(() => {
    if (!workouts.length || !settings) return [];

    const totalSeconds = settings.sessionLength * 60;
    const restTime = settings.rest;

    const totalRestTime = restTime * workouts.length;
    const usableExerciseTime = Math.max(
      totalSeconds - totalRestTime,
      workouts.length * 20
    );

    const exerciseDuration = Math.floor(
      usableExerciseTime / workouts.length
    );

    const steps = [];

    workouts.forEach((w, idx) => {
      steps.push({
        type: "exercise",
        name: w.name,
        muscle: w.muscle,
        instructions: w.instructions,
        duration: exerciseDuration,
        reps: settings.reps,
      });

      if (idx < workouts.length - 1) {
        steps.push({
          type: "rest",
          name: "Rest",
          duration: restTime,
        });
      }
    });

    return steps;
  }, [workouts, settings]);

  // -----------------------
  // Workout state
  // -----------------------
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = timeline[stepIndex];

  // -----------------------
  // Timer hook
  // -----------------------
  const { time, setTime, running, setRunning } = useTimer(
    currentStep?.duration || 0,
    handleStepComplete
  );

  useEffect(() => {
    if (currentStep) {
      setTime(currentStep.duration);
      setRunning(true);
      playCue();
    }
  }, [stepIndex]);

  function handleStepComplete() {
    playCue();
    if (stepIndex + 1 < timeline.length) {
      setStepIndex((i) => i + 1);
    } else {
      setRunning(false);
    }
  }

  function playCue() {
    try {
      new Audio("/beep.mp3").play();
    } catch {}
    if (navigator.vibrate) navigator.vibrate(200);
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  const isFinished = stepIndex >= timeline.length;

  // -----------------------
  // Render
  // -----------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        🏋️ Workout Session
      </h1>

      {!isFinished ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT: TIMER */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl text-center">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide">
              {currentStep.type === "exercise" ? "Exercise" : "Rest"}
            </p>

            <h2 className="text-3xl font-semibold mb-2">
              {currentStep.name}
            </h2>

            {currentStep.type === "exercise" && (
              <p className="text-gray-400 mb-4">
                {currentStep.reps} reps • {currentStep.muscle}
              </p>
            )}

            <div className="text-6xl font-bold mb-8">
              {formatTime(time)}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setRunning((r) => !r)}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                {running ? "Pause" : "Resume"}
              </button>

              <button
                onClick={handleStepComplete}
                className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700"
              >
                Skip
              </button>
            </div>

            <p className="mt-6 text-gray-400 text-sm">
              Step {stepIndex + 1} / {timeline.length}
            </p>
          </div>

          {/* RIGHT: WORKOUT DETAILS */}
          {currentStep.type === "exercise" && (
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                {currentStep.name}
              </h3>

              <p className="text-sm text-gray-400 mb-4 capitalize">
                Target Muscle: {currentStep.muscle}
              </p>

              <div className="max-h-[300px] overflow-y-auto pr-2 text-gray-300 text-sm leading-relaxed">
                {currentStep.instructions || "No instructions available."}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            🎉 Workout Complete!
          </h2>
          <p className="text-gray-400 mb-6">
            Session Length: {settings.sessionLength} min
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700"
          >
            Back to Generator
          </button>
        </div>
      )}
    </div>
  );
}

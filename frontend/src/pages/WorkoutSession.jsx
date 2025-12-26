import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";
import SparklesBackground from "@/components/SparklesBackground";

export default function WorkoutSession() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const workouts = state?.workouts || [];
  const settings = state?.settings || null;

  const [showEndModal, setShowEndModal] = useState(false);

  useEffect(() => {
    if (!workouts.length || !settings) navigate("/");
  }, [workouts, settings, navigate]);

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

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = timeline[stepIndex];

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

  const formatTime = (sec) =>
    `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

  const isFinished = stepIndex >= timeline.length;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <SparklesBackground />

      <div className="relative z-10 px-6 pt-48 pb-16 text-white">
        {!isFinished ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT — TIMER */}
            <div className="rounded-3xl p-10 bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl text-center">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {currentStep.type === "exercise" ? "Exercise" : "Rest"}
              </p>

              <h2 className="text-2xl font-semibold mb-1">
                {currentStep.name}
              </h2>

              {currentStep.type === "exercise" && (
                <p className="text-sm text-gray-400 mb-6">
                  {currentStep.reps} reps • {currentStep.muscle}
                </p>
              )}

              <div className="text-7xl font-bold tracking-tight mb-10">
                {formatTime(time)}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setRunning((r) => !r)}
                  className="px-6 py-2 rounded-md bg-white text-black font-medium hover:opacity-90 transition"
                >
                  {running ? "Pause" : "Resume"}
                </button>

                <button
                  onClick={handleStepComplete}
                  className="px-6 py-2 rounded-md border border-white/20 text-gray-300 hover:bg-white/10 transition"
                >
                  Skip
                </button>
              </div>

              <button
                onClick={() => {
                  setRunning(false);
                  setShowEndModal(true);
                }}
                className="mt-6 text-sm text-red-400 hover:text-red-300 transition"
              >
                End session
              </button>

              <p className="mt-6 text-xs text-gray-400">
                Step {stepIndex + 1} / {timeline.length}
              </p>
            </div>

            {/* RIGHT — INFO */}
            <div className="rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
              <h3 className="text-lg font-semibold mb-4">
                Exercise details
              </h3>

              {currentStep.type === "exercise" ? (
                <>
                  <p className="text-sm text-gray-400 mb-4 capitalize">
                    Target muscle · {currentStep.muscle}
                  </p>

                  <div className="text-sm text-gray-300 leading-relaxed max-h-[360px] overflow-y-auto pr-2">
                    {currentStep.instructions || "No instructions available."}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400">
                  Take a short break and prepare for the next exercise.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-3">
              Workout complete
            </h2>
            <p className="text-gray-400 mb-6">
              {settings.sessionLength} minute session
            </p>
            <button
              onClick={() => navigate("/workouts")}
              className="px-6 py-3 rounded-md bg-white text-black font-medium hover:opacity-90 transition"
            >
              Back to generator
            </button>
          </div>
        )}
      </div>

      {/* END SESSION MODAL */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 text-center text-white shadow-xl">
            <h3 className="text-lg font-semibold mb-2">
              End workout?
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Your current progress will be lost.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEndModal(false);
                  setRunning(true);
                }}
                className="flex-1 py-2 rounded-md border border-white/20 text-gray-300 hover:bg-white/10 transition"
              >
                Continue
              </button>

              <button
                onClick={() => navigate("/workouts")}
                className="flex-1 py-2 rounded-md bg-red-500/90 text-white hover:bg-red-500 transition"
              >
                End
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

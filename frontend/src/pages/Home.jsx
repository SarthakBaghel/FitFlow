import { Link } from "react-router-dom";
import SparklesBackground from "@/components/SparklesBackground";
import { useEffect, useRef } from "react";

export default function Home() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.setProperty("--x", `${e.clientX}px`);
      glowRef.current.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 bg-black overflow-hidden
                 [--x:50%] [--y:50%]"
    >
      {/* Background */}
      <SparklesBackground />

      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0
                   bg-[radial-gradient(600px_at_var(--x)_var(--y),rgba(255,255,255,0.08),transparent_40%)]"
      />

      {/* ===== HERO CONTENT ===== */}
      <div className="relative z-10 max-w-6xl mx-auto h-full px-6 flex flex-col justify-center text-white">
        <p className="text-xs tracking-widest text-gray-400 mb-4">
          STAY IN SHAPE
        </p>

        <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
          Train Smarter <br />
          With <span className="text-red-500">Fit</span>Flow

        </h1>

        <p className="max-w-xl text-gray-400 text-sm leading-relaxed mb-8">
          Build personalized workout plans, follow guided exercise sessions,
          and track your fitness progress — all in one minimal and focused
          platform designed to keep you consistent.
        </p>

        <div className="flex gap-4 mb-16">
          {/* Primary CTA */}
          <Link
            to="/signup"
            className="
              px-7 py-3 rounded-md
              bg-red-600 text-white text-sm font-medium
              shadow-[0_0_25px_rgba(239,68,68,0.35)]
              transition-all duration-300
              hover:bg-red-500
              hover:shadow-[0_0_35px_rgba(239,68,68,0.6)]
              active:scale-95
            "
          >
            Get Started
          </Link>

          {/* Secondary CTA */}
          <Link
            to="/login"
            className="
              px-7 py-3 rounded-md
              border border-white/30
              text-white text-sm font-medium
              transition-all duration-300
              hover:bg-white/10
              active:scale-95
            "
          >
            Login
          </Link>
        </div>


        {/* ===== FEATURE CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="rounded-xl p-6
                       bg-white/5 border border-white/10
                       backdrop-blur-xl"
          >
            <h3 className="text-sm font-semibold mb-2">
              Smart Workout Plans
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Generate workouts based on goals, available time, and
              muscle groups — no guesswork required.
            </p>
          </div>

          <div
            className="rounded-xl p-6
                       bg-white/5 border border-white/10
                       backdrop-blur-xl"
          >
            <h3 className="text-sm font-semibold mb-2">
              Guided Sessions
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Follow real-time workout sessions with timers,
              rest intervals, and clear exercise instructions.
            </p>
          </div>

          <div
            className="rounded-xl p-6
                       bg-white/5 border border-white/10
                       backdrop-blur-xl"
          >
            <h3 className="text-sm font-semibold mb-2">
              Progress Tracking
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Save plans, revisit past workouts, and stay consistent
              with a clean personal dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Background */}
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={100}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />

      {/* Center Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {/* Title with subtle glow */}
        <h1
          className="text-5xl md:text-6xl font-semibold tracking-tight mb-10
                     drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
        >
          FitFlow
        </h1>

        {/* Buttons */}
        <div className="flex gap-5">
          {/* Login */}
          <Link
            to="/login"
            className="px-7 py-2.5 rounded-md bg-white text-black text-sm font-medium
                       transition-all duration-300
                       hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]
                       active:scale-95"
          >
            Login
          </Link>

          {/* Register */}
          <Link
            to="/signup"
            className="px-7 py-2.5 rounded-md border border-white/30 text-white text-sm font-medium
                       transition-all duration-300
                       hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
                       active:scale-95"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";
import { useEffect, useRef } from "react";

export default function Home() {
  const glowRef = useRef(null);

  // Mouse-reactive glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      const { clientX, clientY } = e;
      glowRef.current.style.setProperty("--x", `${clientX}px`);
      glowRef.current.style.setProperty("--y", `${clientY}px`);
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
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={100}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />

      {/* Reactive glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0
                   bg-[radial-gradient(600px_at_var(--x)_var(--y),rgba(255,255,255,0.08),transparent_40%)]"
      />

      {/* Center Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {/* Shimmer Title */}
        <h1
          className="relative text-5xl md:text-6xl font-semibold tracking-tight mb-10
                     text-transparent bg-clip-text
                     bg-[linear-gradient(110deg,#ffffff,45%,#bfbfbf,55%,#ffffff)]
                     bg-[length:200%_100%]
                     animate-shimmer"
        >
          FitFlow
        </h1>

        {/* Buttons */}
        <div className="flex gap-5">
          <Link
            to="/login"
            className="px-7 py-2.5 rounded-md bg-white text-black text-sm font-medium
                       transition-all duration-300
                       animate-float
                       hover:scale-105
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.45)]
                       active:scale-95"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-7 py-2.5 rounded-md border border-white/30 text-white text-sm font-medium
                       transition-all duration-300
                       animate-float-delayed
                       hover:scale-105 hover:bg-white/10
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]
                       active:scale-95"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

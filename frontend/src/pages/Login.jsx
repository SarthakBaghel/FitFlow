import { useState, useEffect, useRef } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import SparklesBackground from "@/components/SparklesBackground";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/workouts";
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const glowRef = useRef(null);

  // mouse reactive glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.setProperty("--x", `${e.clientX}px`);
      glowRef.current.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const data = await loginUser(form);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate(from, { replace: true }), 600);
      } else {
        setMsg({ type: "error", text: "Invalid login response." });
      }
    } catch (err) {
      setMsg({
        type: "error",
        text:
          err?.response?.data?.message ||
          err?.message ||
          "Login failed.",
      });
    }

    setLoading(false);
  };

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 bg-black overflow-hidden
                 [--x:50%] [--y:50%]"
    >
      {/* Background (memoized, no re-render) */}
      <SparklesBackground />

      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0
                   bg-[radial-gradient(600px_at_var(--x)_var(--y),rgba(255,255,255,0.08),transparent_40%)]"
      />

      {/* Login Card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div
          className="w-full max-w-sm rounded-2xl p-8
                     bg-white/5 border border-white/10
                     backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)]"
        >
          {/* Title */}
          <h2
            className="text-3xl font-semibold text-center mb-6
                       text-transparent bg-clip-text
                       bg-[linear-gradient(110deg,#ffffff,45%,#bfbfbf,55%,#ffffff)]
                       bg-[length:200%_100%]
                       animate-shimmer"
          >
            Welcome Back!
          </h2>

          {msg && (
            <div
              className={`mb-4 text-sm px-4 py-2 rounded-md text-center
                ${
                  msg.type === "error"
                    ? "bg-red-500/10 text-red-300"
                    : "bg-green-500/10 text-green-300"
                }`}
            >
              {msg.text}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-md
                         bg-black/40 border border-white/10
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-white/20"
            />

            <input
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-md
                         bg-black/40 border border-white/10
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-white/20"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 rounded-md
                         bg-white text-black text-sm font-medium
                         transition-all duration-300
                         hover:scale-[1.03]
                         hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]
                         active:scale-95"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-400 text-center">
            New here?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-white underline hover:opacity-80"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

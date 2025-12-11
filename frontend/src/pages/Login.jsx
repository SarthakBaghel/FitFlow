import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setMsg({ type: "success", text: "Login successful!" });

        setTimeout(() => navigate(from, { replace: true }), 800);
      } else {
        setMsg({ type: "error", text: "Invalid login response." });
      }
    } catch (err) {
      const text =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed.";

      setMsg({ type: "error", text });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900/80 to-gray-800/80 
      border border-gray-700/60 rounded-2xl p-8 shadow-xl backdrop-blur-md">

        <h2 className="text-3xl font-extrabold mb-4 text-center 
        bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Welcome back
        </h2>

        {msg && (
          <div
            className={`mb-4 text-sm p-3 rounded ${
              msg.type === "error" ? "bg-red-800 text-red-200" : "bg-green-900 text-green-200"
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
            className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            type="password"
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg 
            text-lg font-semibold hover:scale-105 transition shadow"
          >
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-400 text-center">
          New here?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-300 underline hover:text-blue-100"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

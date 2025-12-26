import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/authService";
import SparklesBackground from "@/components/SparklesBackground";

export default function About() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchCurrentUser();
        setUser(data.user || data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <SparklesBackground />

      {/* Content */}
      <div className="relative z-10 px-6 pt-28 pb-16 text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-10 tracking-tight">
            Account
          </h1>

          {loading && (
            <p className="text-center text-gray-400">
              Loading profile…
            </p>
          )}

          {!loading && user && (
            <div
              className="rounded-2xl bg-white/5 border border-white/10
                         backdrop-blur-xl p-8 text-center space-y-4"
            >
              {/* Avatar */}
              <div
                className="mx-auto w-20 h-20 rounded-full
                           bg-white/10 flex items-center justify-center
                           text-2xl font-medium"
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* Name */}
              <h2 className="text-xl font-medium">
                {user.name}
              </h2>

              {/* Email */}
              <p className="text-sm text-gray-400">
                {user.email}
              </p>

              {/* Joined */}
              {user.createdAt && (
                <p className="text-xs text-gray-500 pt-2">
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          {!loading && !user && (
            <p className="text-center text-red-400 mt-10">
              Unable to load profile. Please log in again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

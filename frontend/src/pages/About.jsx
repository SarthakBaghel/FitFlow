// src/pages/About.jsx
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/authService";
import { Link } from "react-router-dom";

export default function About() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchCurrentUser();
        setUser(data.user || data); // backend may use { user: {...} }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 tracking-wide 
        bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          About You
        </h1>

        {loading && (
          <p className="text-center text-gray-300 text-xl">Loading profile...</p>
        )}

        {!loading && user && (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90
              border border-gray-700/60 rounded-2xl p-10 shadow-xl backdrop-blur-md">

            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
                flex items-center justify-center text-4xl font-bold mb-6 shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <h2 className="text-3xl font-bold text-blue-300">{user.name}</h2>
              <p className="text-gray-300 text-lg mt-1">{user.email}</p>

              {user.createdAt && (
                <p className="text-gray-400 text-sm mt-2">
                  Joined on{" "}
                  <span className="text-gray-200">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </p>
              )}

              <div className="w-full h-px bg-gray-700/60 my-8"></div>

              <div className="space-y-4 text-left w-full px-4">
                <p className="text-gray-300 text-lg">👋 Welcome to your personalized fitness companion!</p>

                <p className="text-gray-400">
                  This page gives you a quick overview of your account details.
                </p>

                <ul className="text-gray-300 mt-2 space-y-1 list-disc ml-4">
                  <li>Your generated workouts</li>
                  <li>Your weekly fitness progress</li>
                  <li>Favorites & saved routines</li>
                  <li>Achievement badges & streaks</li>
                </ul>

                {/* NEW: View My Plans button */}
                <div className="mt-6 flex justify-center">
                  <Link
                    to="/myplans"
                    className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow"
                  >
                    View My Plans
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

        {!loading && !user && (
          <p className="text-center text-red-400 text-xl mt-10">
            Unable to load your profile. Please log in again.
          </p>
        )}
      </div>
    </div>
  );
}

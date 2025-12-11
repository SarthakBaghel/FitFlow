// export default function About() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black flex items-center justify-center px-6 py-16 text-white">
//       <div className="max-w-3xl w-full bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl p-10 text-center animate-fadeIn">
//         {/* Title */}
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
//           💪 About This App
//         </h1>

//         {/* Description */}
//         <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
//           <span className="font-semibold text-blue-400">Workout Planner</span> is a
//           full-stack web app built with{" "}
//           <span className="font-medium text-purple-400">React</span> and{" "}
//           <span className="font-medium text-purple-400">Express</span>, powered by
//           the{" "}
//           <span className="font-medium text-blue-400">
//             API Ninjas Exercise API
//           </span>
//           . It helps you instantly generate{" "}
//           <span className="font-semibold text-blue-300">
//             personalized workout routines
//           </span>{" "}
//           tailored to your fitness goals, equipment, and experience level.
//         </p>

//         {/* Developer credit */}
//         <p className="text-lg text-gray-400">
//           Designed and developed by{" "}
//           <span className="font-semibold text-purple-400 hover:text-purple-300 transition">
//             Sarthak Baghel
//           </span>
//           .
//         </p>

//         {/* Accent line */}
//         <div className="mt-8 h-1 w-1/2 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-70"></div>
//       </div>
//     </div>
//   );
// }

// src/pages/About.jsx
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/authService";

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

        {/* Loading UI */}
        {loading && (
          <p className="text-center text-gray-300 text-xl">Loading profile...</p>
        )}

        {/* User Profile Card */}
        {!loading && user && (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90
              border border-gray-700/60 rounded-2xl p-10 shadow-xl backdrop-blur-md">

            <div className="flex flex-col items-center text-center">
              
              {/* Avatar */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
                flex items-center justify-center text-4xl font-bold mb-6 shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* Name */}
              <h2 className="text-3xl font-bold text-blue-300">
                {user.name}
              </h2>

              {/* Email */}
              <p className="text-gray-300 text-lg mt-1">{user.email}</p>

              {/* Joined Date */}
              {user.createdAt && (
                <p className="text-gray-400 text-sm mt-2">
                  Joined on{" "}
                  <span className="text-gray-200">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </p>
              )}

              {/* Divider */}
              <div className="w-full h-px bg-gray-700/60 my-8"></div>

              {/* Extra Info */}
              <div className="space-y-4 text-left w-full px-4">
                <p className="text-gray-300 text-lg">
                  👋 Welcome to your personalized fitness companion!  
                </p>

                <p className="text-gray-400">
                  This page gives you a quick overview of your account details.
                  As we expand this platform, you’ll soon be able to track:
                </p>

                <ul className="text-gray-300 mt-2 space-y-1 list-disc ml-4">
                  <li>Your generated workouts</li>
                  <li>Your weekly fitness progress</li>
                  <li>Favorites & saved routines</li>
                  <li>Achievement badges & streaks</li>
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* If no user found (token expired or logged out) */}
        {!loading && !user && (
          <p className="text-center text-red-400 text-xl mt-10">
            Unable to load your profile. Please log in again.
          </p>
        )}

      </div>
    </div>
  );
}

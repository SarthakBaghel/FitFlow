import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-800 text-white px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
        Welcome to <span className="text-blue-400">Workout Planner</span> 💥
      </h1>

      <p className="text-lg md:text-xl text-gray-200 mb-8 text-center max-w-xl">
        Generate personalized daily or weekly workout plans powered by the{" "}
        <span className="text-blue-400 font-semibold">Wger API</span>.
      </p>

      <Link
        to="/workouts"
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Start Generating 💪
      </Link>

      <p className="mt-10 text-sm text-gray-400">
        Made with ❤️ by <span className="font-semibold text-gray-200">Sarthak Baghel</span>
      </p>
    </div>
  );
}

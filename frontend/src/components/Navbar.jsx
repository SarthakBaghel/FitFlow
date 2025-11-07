import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
          🏋️ <span className="text-blue-400">Workout Planner</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-400 transition ${
                isActive ? "text-blue-400 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/workouts"
            className={({ isActive }) =>
              `hover:text-blue-400 transition ${
                isActive ? "text-blue-400 font-semibold" : ""
              }`
            }
          >
            Generate Plan
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-blue-400 transition ${
                isActive ? "text-blue-400 font-semibold" : ""
              }`
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  const navLinkClasses = ({ isActive }) =>
    `hover:text-blue-400 transition ${
      isActive ? "text-blue-400 font-semibold" : ""
    }`;

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
          🏋️ <span className="text-blue-400">Workout Planner</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-lg items-center">

          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>

          <NavLink to="/workouts" className={navLinkClasses}>
            Generate Plan
          </NavLink>

          {/* Only show About if logged in */}
          {loggedIn && (
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
          )}

          {/* Auth Buttons */}
          {!loggedIn ? (
            <>
              <NavLink to="/login" className={navLinkClasses}>
                Login
              </NavLink>
              <NavLink to="/signup" className={navLinkClasses}>
                Signup
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-4 text-lg">

          <NavLink to="/" className={navLinkClasses} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/workouts" className={navLinkClasses} onClick={() => setIsOpen(false)}>
            Generate Plan
          </NavLink>

          {loggedIn && (
            <NavLink to="/about" className={navLinkClasses} onClick={() => setIsOpen(false)}>
              About
            </NavLink>
          )}

          {!loggedIn ? (
            <>
              <NavLink to="/login" className={navLinkClasses} onClick={() => setIsOpen(false)}>
                Login
              </NavLink>

              <NavLink to="/signup" className={navLinkClasses} onClick={() => setIsOpen(false)}>
                Signup
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout as logoutUser } from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuth = () => setLoggedIn(!!localStorage.getItem("token"));
    syncAuth();
    window.addEventListener("authChange", syncAuth);
    return () => window.removeEventListener("authChange", syncAuth);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    navigate("/");
  };

  const navLinkClasses = ({ isActive }) =>
    `text-sm transition ${
      isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
    }`;

  return (
    <nav className="fixed top-0 inset-x-0 z-50
                backdrop-blur-xl bg-black/40
                border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/workouts"
          className="text-lg font-medium tracking-tight text-white"
        >
          FitFlow
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/workouts" className={navLinkClasses}>
            Generate
          </NavLink>

          {loggedIn && (
            <NavLink to="/myplans" className={navLinkClasses}>
              My Plans
            </NavLink>
          )}

          {loggedIn && (
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
          )}

          {!loggedIn ? (
            <>
              <NavLink to="/login" className={navLinkClasses}>
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-3 py-1.5 rounded-md bg-white text-black text-sm hover:opacity-90 transition"
              >
                Sign up
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-red-400 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 space-y-4 border-t border-white/10 bg-black/80 backdrop-blur-xl">
          <NavLink
            to="/workouts"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            Generate
          </NavLink>

          {loggedIn && (
            <NavLink
              to="/myplans"
              className={navLinkClasses}
              onClick={() => setIsOpen(false)}
            >
              My Plans
            </NavLink>
          )}

          {loggedIn && (
            <NavLink
              to="/about"
              className={navLinkClasses}
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          )}

          {!loggedIn ? (
            <>
              <NavLink
                to="/login"
                className={navLinkClasses}
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-2 rounded-md bg-white text-black text-sm"
              >
                Sign up
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-left text-sm text-red-400"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

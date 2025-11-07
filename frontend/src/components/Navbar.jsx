import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">🏋️ Workout Planner</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/workouts">Generate Plan</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to Workout Planner 💥</h1>
      <p>Generate daily or weekly workout plans powered by the Wger API.</p>
      <Link to="/workouts" className="btn">
        Start Generating
      </Link>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function PlanCard({ plan, onDelete, deleting }) {
  const day = plan?.days?.[0] || {};
  const exercises = day?.exercises || [];

  const primaryMuscle =
    exercises.find((e) => e?.muscle)?.muscle ||
    exercises[0]?.type ||
    plan?.meta?.goal ||
    "Workout";

  const dateISO = day?.date || plan?.createdAt || null;
  const dateObj = dateISO ? new Date(dateISO) : null;

  const label =
    dateObj && !isNaN(dateObj)
      ? `${dateObj.toLocaleDateString("en-US", {
          weekday: "short",
        })} · ${dateObj.toLocaleDateString()}`
      : "—";

  return (
    <div
      className="
        flex items-center justify-between gap-4
        rounded-xl px-5 py-4
        bg-white/5 border border-white/10
        backdrop-blur-xl
        hover:bg-white/10 transition
      "
    >
      {/* Left */}
      <div>
        <h3 className="text-sm font-medium capitalize tracking-tight">
          {String(primaryMuscle).replace("_", " ")}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {label}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Start Workout */}
        <Link
          to="/workout-session"
          state={{
            workouts: exercises,
            settings: {
              sessionLength: 30,
              reps: 12,
              rest: 45,
            },
          }}
          className="
            text-xs px-3 py-1.5 rounded-md
            bg-green-500/90 text-black
            hover:bg-green-500 transition
          "
        >
          Start
        </Link>

        {/* View */}
        <Link
          to={`/plans/${plan._id}`}
          className="
            text-xs px-3 py-1.5 rounded-md
            bg-white text-black
            hover:opacity-90 transition
          "
        >
          View
        </Link>

        {/* Delete */}
        <button
          onClick={() => onDelete(plan._id)}
          disabled={deleting}
          className="
            text-xs px-3 py-1.5 rounded-md
            border border-white/20
            text-gray-300
            hover:bg-red-500/10 hover:text-red-400
            transition disabled:opacity-40
          "
        >
          {deleting ? "…" : "Delete"}
        </button>
      </div>
    </div>
  );
}

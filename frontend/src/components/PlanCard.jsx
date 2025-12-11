import { Link } from "react-router-dom";

export default function PlanCard({ plan, onDelete, deleting }) {
  const day = plan.days?.[0];
  const exercises = day?.exercises || [];

  // Get unique muscles targeted (first 3 for display)
  const targetMuscles = [...new Set(exercises.map((ex) => ex.muscle))].slice(0, 3);

  return (
    <div
      className="p-6 rounded-2xl bg-gray-900/80 border border-gray-700/50 shadow-lg 
                 hover:shadow-xl transition-shadow duration-300"
    >

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-blue-300">{plan.title}</h2>
          <p className="text-xs text-gray-400">
            Created: {new Date(plan.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col items-end gap-2">
          <Link
            to={`/plans/${plan._id}`}
            className="px-3 py-1 bg-blue-600/80 hover:bg-blue-600 text-white rounded-md text-sm"
          >
            Open
          </Link>

          <button
            onClick={() => onDelete(plan._id)}
            disabled={deleting}
            className={`px-3 py-1 rounded-md text-sm ${
              deleting
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-red-600/80 hover:bg-red-600 text-white"
            }`}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* TARGET MUSCLES */}
      <div className="mb-4">
        <h3 className="text-sm text-gray-400 uppercase tracking-wide">Target Muscles</h3>
        {targetMuscles.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-1">
            {targetMuscles.map((m, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-800 rounded-full text-gray-200 text-xs border border-gray-700"
              >
                {m.replace("_", " ")}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-1">No target info</p>
        )}
      </div>

      {/* DAY INFO */}
      {day && (
        <div className="mb-4">
          <h3 className="text-sm text-gray-400 uppercase tracking-wide">Day</h3>
          <p className="text-gray-200 mt-1">{day.dateLabel || "Day 1"}</p>
        </div>
      )}

      {/* EXERCISES LIST */}
      <div>
        <h3 className="text-sm text-gray-400 uppercase tracking-wide">Exercises</h3>

        {exercises.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {exercises.slice(0, 6).map((ex, i) => (
              <li
                key={i}
                className="flex items-center gap-2 bg-gray-800/70 px-3 py-2 rounded-lg text-gray-200 text-sm border border-gray-700/40"
              >
                <span className="text-blue-400 font-medium">{i + 1}.</span>
                <span>{ex.name}</span>
              </li>
            ))}

            {exercises.length > 6 && (
              <p className="text-xs text-gray-400 mt-1">
                + {exercises.length - 6} more exercises…
              </p>
            )}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm mt-1">No exercises added</p>
        )}
      </div>
    </div>
  );
}

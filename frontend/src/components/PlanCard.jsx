import { Link } from "react-router-dom";

export default function PlanCard({ plan, onDelete, deleting }) {
  const day = plan?.days?.[0] || {};
  const exercises = day?.exercises || [];

  // Primary target muscle
  const primaryMuscle =
    exercises.find((e) => e?.muscle)?.muscle ||
    exercises[0]?.type ||
    plan?.meta?.goal ||
    "Unspecified";

  // ✅ SAFE DATE HANDLING
  const dateISO = day?.date || plan?.createdAt || null;
  const dateObj = dateISO ? new Date(dateISO) : null;

  const weekday =
    dateObj && !isNaN(dateObj)
      ? dateObj.toLocaleDateString("en-US", { weekday: "long" })
      : "—";

  const friendlyDate =
    dateObj && !isNaN(dateObj)
      ? dateObj.toLocaleDateString()
      : day?.dateLabel || "—";

  return (
    <div className="relative p-6 rounded-2xl bg-gradient-to-b from-gray-900/85 to-gray-800/70 border border-gray-700/40 shadow-md hover:shadow-xl transition-shadow duration-200">
      
      {/* PRIMARY MUSCLE */}
      <div className="mt-6 text-center">
        <div className="text-5xl md:text-3xl font-extrabold text-white tracking-tight mb-2 capitalize">
          {String(primaryMuscle).replace("_", " ")}
        </div>
      </div>

      {/* DATE */}
      <div className="mt-6 pb-6 text-center">
        <div className="text-xl font-semibold text-gray-300">
          {weekday}
        </div>
        <div className="text-lg text-gray-500 mt-1">
          {friendlyDate}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-center gap-2">
        <Link
          to={`/plans/${plan._id}`}
          className="text-xs px-3 py-1 rounded-md bg-blue-600/90 text-white hover:bg-blue-600"
        >
          More
        </Link>

        <button
          onClick={() => onDelete(plan._id)}
          disabled={deleting}
          className={`text-xs px-3 py-1 rounded-md ${
            deleting
              ? "bg-gray-700 text-gray-400"
              : "bg-red-600/90 text-white hover:bg-red-600"
          }`}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

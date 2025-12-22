import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlan, deletePlan } from "../services/plans";
import Loader from "../components/Loader";

export default function PlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPlan(id);
        setPlan(data.plan || data);
      } catch (err) {
        console.error("Failed to load plan:", err);
        navigate("/my-plans");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <Loader />
      </div>
    );
  }

  if (!plan) {
    return <p className="text-center text-red-400 mt-10">Plan not found.</p>;
  }

  const day = plan.days?.[0] || {};
  const exercises = day.exercises || [];
  const targetMuscles = [...new Set(exercises.map((ex) => ex.muscle).filter(Boolean))];

  // ✅ SAFE DATE HANDLING
  const dateISO = day.date || plan.createdAt || null;
  const dateObj = dateISO ? new Date(dateISO) : null;

  const weekday =
    dateObj && !isNaN(dateObj)
      ? dateObj.toLocaleDateString("en-US", { weekday: "long" })
      : "—";

  const friendlyDate =
    dateObj && !isNaN(dateObj)
      ? dateObj.toLocaleDateString()
      : day.dateLabel || "—";

  const handleDelete = async () => {
    if (!window.confirm("Delete this plan?")) return;
    setDeleting(true);
    try {
      await deletePlan(id);
      navigate("/my-plans");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Could not delete plan.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-300">{plan.title}</h1>
        <p className="text-gray-400 text-sm mt-1">
          Created:{" "}
          {dateObj && !isNaN(dateObj)
            ? dateObj.toLocaleDateString()
            : "—"}
        </p>

        <div className="h-px bg-gray-700/50 my-6"></div>

        {/* TARGET MUSCLES */}
        <div className="mb-8">
          <h2 className="text-lg text-gray-300 font-semibold">
            Target Muscles
          </h2>

          {targetMuscles.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
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
            <p className="text-gray-500 mt-2">No target muscle data</p>
          )}
        </div>

        {/* DAY INFO */}
        <div className="mb-8">
          <h2 className="text-lg text-gray-300 font-semibold">Day</h2>

          <p className="text-gray-200 mt-1 text-2xl font-bold">
            {weekday}
          </p>

          <p className="text-gray-500 text-sm mt-1">
            {friendlyDate}
          </p>
        </div>

        {/* EXERCISES LIST */}
        <div className="mb-10">
          <h2 className="text-lg text-gray-300 font-semibold mb-3">
            Exercises
          </h2>

          {exercises.length > 0 ? (
            <ul className="space-y-3">
              {exercises.map((ex, index) => (
                <li
                  key={index}
                  className="p-4 rounded-xl bg-gray-800/70 border border-gray-700 text-gray-200"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{ex.name}</span>
                    <span className="text-xs text-gray-400">
                      {ex.muscle}
                    </span>
                  </div>
                  <p className="text-xs mt-1 text-gray-400">
                    {ex.instructions?.slice(0, 120) || "No instructions"}...
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No exercises found.</p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between mt-10">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`px-5 py-2 rounded-lg ${
              deleting
                ? "bg-gray-700 text-gray-400"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {deleting ? "Deleting..." : "Delete Plan"}
          </button>

          <button
            onClick={() => navigate("/my-plans")}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            View All Plans
          </button>
        </div>
      </div>
    </div>
  );
}

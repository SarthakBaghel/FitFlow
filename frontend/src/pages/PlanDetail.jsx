import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlan, deletePlan } from "../services/plans";
import Loader from "../components/Loader";
import SparklesBackground from "@/components/SparklesBackground";

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
        navigate("/myplans");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!plan) {
    return (
      <p className="text-center text-red-400 mt-20">
        Plan not found.
      </p>
    );
  }

  const day = plan.days?.[0] || {};
  const exercises = day.exercises || [];

  const targetMuscles = [
    ...new Set(exercises.map((ex) => ex.muscle).filter(Boolean)),
  ];

  const dateISO = day.date || plan.createdAt || null;
  const dateObj = dateISO ? new Date(dateISO) : null;

  const dateLabel =
    dateObj && !isNaN(dateObj)
      ? `${dateObj.toLocaleDateString("en-US", {
          weekday: "long",
        })} · ${dateObj.toLocaleDateString()}`
      : "—";

  const handleDelete = async () => {
    if (!window.confirm("Delete this plan?")) return;
    setDeleting(true);
    try {
      await deletePlan(id);
      navigate("/myplans");
    } catch {
      alert("Could not delete plan.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <SparklesBackground />

      {/* Content */}
      <div className="relative z-10 px-6 pt-28 pb-16 text-white">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-sm text-gray-400 hover:text-gray-200 transition"
          >
            ← Back
          </button>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">
              {plan.title}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {dateLabel}
            </p>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl bg-white/5 border border-white/10
                       backdrop-blur-xl p-8 space-y-8"
          >
            {/* Target muscles */}
            {targetMuscles.length > 0 && (
              <div className="flex items-center justify-center gap-4">
                <span className="text-base font-semibold text-white">
                  Target muscle
                </span>

                <span
                  className="px-4 py-1.5 rounded-md
                            bg-white/10 border border-white/20
                            text-sm font-medium text-white capitalize"
                >
                  {targetMuscles[0]?.replace("_", " ")}
                </span>
              </div>
            )}

            {/* Exercises */}
            <div>
              <p className="text-xs text-gray-400 mb-4">
                Exercises
              </p>

              {exercises.length > 0 ? (
                <ul className="space-y-3">
                  {exercises.map((ex, index) => (
                    <li
                      key={index}
                      className="rounded-xl p-4
                                 bg-black/40 border border-white/10"
                    >
                      <div className="flex items-center">
                        <span className="text-sm font-medium">
                          {ex.name}
                        </span>
                      </div>

                      {ex.instructions && (
                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                          {ex.instructions}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No exercises found.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-sm text-red-400 hover:text-red-300
                         transition disabled:opacity-40"
            >
              {deleting ? "Deleting…" : "Delete plan"}
            </button>

            <button
              onClick={() => navigate("/myplans")}
              className="text-sm text-gray-400 hover:text-gray-200 transition"
            >
              View all plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

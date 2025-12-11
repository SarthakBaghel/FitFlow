// src/pages/MyPlans.jsx
import React, { useEffect, useState } from "react";
import { listPlans, deletePlan } from "../services/plans";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function MyPlans() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const load = async (p = 1) => {
    setLoading(true);
    try {
      const res = await listPlans({ page: p, limit: 12 });
      setPlans(res.plans || []);
      setPage(res.page || p);
      setPages(res.pages || 1);
      setTotal(res.total || 0);
    } catch (err) {
      console.error("Failed to load plans:", err);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deletePlan(id);
      setPlans((prev) => prev.filter((p) => p._id !== id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete plan.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Plans</h1>
          <button
            onClick={() => navigate("/workouts")}
            className="px-4 py-2 rounded bg-gradient-to-r from-green-500 to-emerald-600 text-white"
          >
            Generate New Plan
          </button>
        </div>

        {plans.length === 0 && (
          <div className="bg-gray-800/40 rounded p-8 text-center">
            <p className="text-gray-300">You don't have any saved plans yet.</p>
            <Link to="/workout-generator" className="mt-4 inline-block px-5 py-2 rounded bg-blue-600 text-white">
              Generate one now
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div key={plan._id} className="bg-gradient-to-br from-gray-900/80 to-gray-800/70 border border-gray-700/50 rounded-lg p-5 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{plan.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Days: {Array.isArray(plan.days) ? plan.days.length : plan.totalDays || 0} • Created {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Link to={`/plans/${plan._id}`} className="text-sm underline">Open</Link>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    disabled={deletingId === plan._id}
                    className="text-sm text-red-400"
                  >
                    {deletingId === plan._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>

              {/* show first day's target / exercises summary */}
              {plan.days && plan.days[0] && (
                <div className="mt-3 text-sm text-gray-300">
                  <div className="font-medium">Sample Day: {plan.days[0].dateLabel || `Day 1`}</div>
                  <div className="mt-1">
                    Targets:{" "}
                    {plan.days[0].exercises && plan.days[0].exercises.length > 0
                      ? plan.days[0].exercises.slice(0, 5).map((e, i) => (
                          <span key={i} className="inline-block mr-2">{e.name}</span>
                        ))
                      : <span className="text-gray-500">No exercises listed</span>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => load(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="px-3 py-1 rounded bg-gray-800/60"
            >
              Prev
            </button>
            <div className="text-sm text-gray-300">Page {page} of {pages}</div>
            <button
              onClick={() => load(Math.min(pages, page + 1))}
              disabled={page >= pages}
              className="px-3 py-1 rounded bg-gray-800/60"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

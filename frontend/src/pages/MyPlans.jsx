// src/pages/MyPlans.jsx
import React, { useEffect, useState } from "react";
import { listPlans, deletePlan } from "../services/plans";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import PlanCard from "../components/PlanCard";

export default function MyPlans() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  
  const navigate = useNavigate();

  const loadPlans = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await listPlans({ page: pageNum, limit: 12 });
      setPlans(res.plans || []);
      setPage(res.page || pageNum);
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
    loadPlans(1);
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

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Plans</h1>

          <button
            onClick={() => navigate("/workouts")}
            className="px-4 py-2 rounded bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow"
          >
            Generate New Plan
          </button>
        </div>

        {/* Empty State */}
        {plans.length === 0 && (
          <div className="bg-gray-800/40 rounded p-8 text-center">
            <p className="text-gray-300">You don’t have any saved plans yet.</p>

            <Link
              to="/workouts"
              className="mt-4 inline-block px-5 py-2 rounded bg-blue-600 text-white"
            >
              Generate New
            </Link>
          </div>
        )}

        {/* Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              deleting={deletingId === plan._id}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => loadPlans(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="px-3 py-1 rounded bg-gray-800/60 disabled:opacity-50"
            >
              Prev
            </button>

            <div className="text-sm text-gray-300">
              Page {page} of {pages}
            </div>

            <button
              onClick={() => loadPlans(Math.min(pages, page + 1))}
              disabled={page >= pages}
              className="px-3 py-1 rounded bg-gray-800/60 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

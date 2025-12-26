// src/pages/MyPlans.jsx
import React, { useEffect, useState } from "react";
import { listPlans, deletePlan } from "../services/plans";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import PlanCard from "../components/PlanCard";
import SparklesBackground from "@/components/SparklesBackground";

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
    } catch {
      alert("Failed to delete plan.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <SparklesBackground />

      {/* Content */}
      <div className="relative z-10 px-6 pt-28 pb-16 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">
              My Plans
            </h1>

            <button
              onClick={() => navigate("/workouts")}
              className="px-4 py-2 rounded-md bg-white text-black text-sm
                         hover:opacity-90 transition"
            >
              Generate new
            </button>
          </div>

          {/* Empty state */}
          {plans.length === 0 && (
            <div
              className="rounded-2xl bg-white/5 border border-white/10
                         backdrop-blur-xl p-8 text-center"
            >
              <p className="text-gray-400">
                You don’t have any saved plans yet.
              </p>

              <Link
                to="/workouts"
                className="inline-block mt-4 px-5 py-2 rounded-md
                           bg-white text-black text-sm"
              >
                Generate workout
              </Link>
            </div>
          )}

          {/* Plans grid */}
          {plans.length > 0 && (
            <div className="space-y-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan._id}
                  plan={plan}
                  deleting={deletingId === plan._id}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-center gap-6 mt-12 text-sm">
              <button
                onClick={() => loadPlans(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="px-3 py-1 rounded-md bg-white/5
                           border border-white/10 disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-gray-400">
                Page {page} of {pages}
              </span>

              <button
                onClick={() => loadPlans(Math.min(pages, page + 1))}
                disabled={page >= pages}
                className="px-3 py-1 rounded-md bg-white/5
                           border border-white/10 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

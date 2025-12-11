// src/services/plans.js
import api from "./api";

/**
 * createPlan(payload) -> returns created plan object
 */
export const createPlan = async (payload) => {
  const res = await api.post("/plans", payload);
  return res.data?.plan ?? res.data;
};

/**
 * listPlans({ page, limit }) -> { plans, total, page, pages }
 */
export const listPlans = async ({ page = 1, limit = 12 } = {}) => {
  const res = await api.get("/plans", { params: { page, limit } });
  return res.data;
};

/**
 * getPlan(id) -> returns { plan }
 */
export const getPlan = async (id) => {
  const res = await api.get(`/plans/${id}`);
  return res.data?.plan ?? res.data;
};

/**
 * deletePlan(id) -> returns server response
 */
export const deletePlan = async (id) => {
  const res = await api.delete(`/plans/${id}`);
  return res.data;
};

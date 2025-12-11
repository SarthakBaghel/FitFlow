import api from "./api";

export const registerUser = async (payload) => {
  const res = await api.post("/auth/register", payload);
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
    try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
  }
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await api.post("/auth/login", payload);
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
    try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
  }
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
};

export const fetchCurrentUser = async () => {
  const res = await api.get("/user/me");
  // return the full response data; callers can handle { user } or direct user
  return res.data;
};

// Backwards-compatible aliases (some files import different names)
export { registerUser as register, loginUser as login, logoutUser as logout, fetchCurrentUser as getMe };

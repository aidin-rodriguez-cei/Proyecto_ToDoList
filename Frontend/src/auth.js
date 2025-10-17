// src/auth.js
export function isAuthenticated() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return Boolean(token || user);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("auth-changed"));
}


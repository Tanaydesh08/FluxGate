import { clearUserSessionCache } from "./dashboardStore";

export function getToken() {
  return localStorage.getItem("fluxos_token");
}

export function getUserEmail() {
  return localStorage.getItem("fluxos_email") || "";
}

export function saveAuth(token, email) {
  localStorage.setItem("fluxos_token", token);
  localStorage.setItem("fluxos_email", email);
}

export function clearAuth() {
  const email = getUserEmail();
  clearUserSessionCache(email);
  localStorage.removeItem("fluxos_token");
  localStorage.removeItem("fluxos_email");
  localStorage.removeItem("fluxos_demo_mode");
}

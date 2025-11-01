// ========================= AUTH HELPERS ========================= //
// Módulo para gestionar usuario autenticado y token en localStorage

const STORAGE_USER = "user";
const STORAGE_TOKEN = "token";
const STORAGE_TASKS_PREFIX = "TASKS_";

// --- Base de API normalizada (siempre sin barra final)
function getApiBase() {
  // Incluir /api/v1 en la variable de entorno
  const envUrl = import.meta.env.VITE_API_URL; 
  const fallback = "http://localhost:5000/api/v1";
  const base = (envUrl && envUrl.trim()) || fallback;
  // quita barra final si la hubiera
  return base.replace(/\/+$/, "");
}

/** Obtiene el usuario actual con su token */
export function getCurrentUser() {
  try {
    const userStr = localStorage.getItem(STORAGE_USER);
    const tokenStr = localStorage.getItem(STORAGE_TOKEN);
    if (!userStr || !tokenStr) return null;

    const user = JSON.parse(userStr);
    if (!user || typeof user !== "object") return null;

    return { ...user, token: tokenStr };
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}

/** ¿Hay usuario autenticado? */
export function isAuthenticated() {
  try {
    const user = getCurrentUser();
    const token = localStorage.getItem(STORAGE_TOKEN);
    return Boolean(user && token && user.username); // username = tu email
  } catch (error) {
    console.error("Error al verificar autenticación:", error);
    return false;
  }
}

/** Guarda datos del usuario y token */
export function setUserData(userData, token) {
  if (!userData || !token) {
    console.error("Datos de usuario o token inválidos");
    return false;
  }
  try {
    localStorage.setItem(STORAGE_USER, JSON.stringify(userData));
    localStorage.setItem(STORAGE_TOKEN, token);
    window.dispatchEvent(new Event("auth-changed"));
    return true;
  } catch (error) {
    console.error("Error al guardar usuario:", error);
    return false;
  }
}

/** Cierra sesión y limpia datos locales */
export function logout() {
  try {
    const user = getCurrentUser();
    if (user?.username) {
      localStorage.removeItem(`${STORAGE_TASKS_PREFIX}${user.username}`);
    }
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN);
    window.dispatchEvent(new Event("auth-changed"));
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}

/** Valida el token contra el backend */
export async function validateToken() {
  try {
    const token = localStorage.getItem(STORAGE_TOKEN);
    if (!token) return false;

    const API = getApiBase(); // .../api/v1
    const res = await fetch(`${API}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401 || res.status === 403) {
      // token inválido/expirado
      return false;
    }
    return res.ok;
  } catch (error) {
    console.error("Error al validar token:", error);
    return false;
  }
}

// Exporta la base de API si la quieres usar en otros módulos
export const API_BASE_URL = getApiBase();

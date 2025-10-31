// ========================= AUTH HELPERS ========================= //
// Este módulo maneja todo lo relacionado con el usuario autenticado
// y el token de sesión guardado en localStorage.

/**
 * Obtiene el usuario actual con su token.
 * Devuelve `null` si no hay usuario o los datos están corruptos.
 */
export function getCurrentUser() {
  try {
    const userStr = localStorage.getItem("user");
    const tokenStr = localStorage.getItem("token");

    if (!userStr || !tokenStr) return null;

    const user = JSON.parse(userStr);
    if (!user) return null;

    // Garantiza que el objeto usuario incluya el token actual
    user.token = tokenStr;
    return user;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}

/**
 * Verifica si hay un usuario autenticado.
 * Comprueba tanto el usuario como el token en localStorage.
 */
export function isAuthenticated() {
  try {
    const user = getCurrentUser();
    const token = localStorage.getItem("token");
    return Boolean(user && token && user.username);
  } catch (error) {
    console.error("Error al verificar autenticación:", error);
    return false;
  }
}

/**
 * Guarda los datos del usuario y su token.
 * Dispara el evento `auth-changed` para notificar cambios globales.
 */
export function setUserData(userData, token) {
  if (!userData || !token) {
    console.error("Datos de usuario o token inválidos");
    return false;
  }

  try {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("auth-changed"));
    return true;
  } catch (error) {
    console.error("Error al guardar usuario:", error);
    return false;
  }
}

/**
 * Cierra la sesión actual del usuario.
 * Limpia su información y las tareas guardadas localmente.
 */
export function logout() {
  try {
    const user = getCurrentUser();
    if (user) {
      localStorage.removeItem(`TASKS_${user.username}`);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-changed"));
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}

/**
 * Verifica si el token actual es válido mediante una petición al backend.
 * Devuelve `true` si el token es válido, `false` si no.
 */
export async function validateToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const API_URL =
      import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
    const response = await fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error al validar token:", error);
    return false;
  }
}

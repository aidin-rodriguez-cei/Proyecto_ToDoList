import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, validateToken, logout } from "@/auth";

/* ================= CONTEXTO DE USUARIO ================= */
/* Acá creo el contexto para poder compartir la info del usuario
   (sesión, métodos de login, etc.) por toda la app sin prop drilling. */
const UserContext = createContext();

export function UserProvider({ children }) {
  /* ================= ESTADO PRINCIPAL ================= */
  // Guardo el usuario logueado (o null si no hay sesión)
  const [user, setUser] = useState(null);

  /* ================= CONFIG DE API ================= */
  // Esta es la URL base del backend (leo de .env o uso localhost por defecto)
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

  /* ================= TOKEN HELPER ================= */
  // Función para obtener el token guardado en localStorage
  const token = () => localStorage.getItem("token");

  /* ================= CARGA INICIAL DE SESIÓN ================= */
  // Cuando se monta, intento recuperar el usuario y validar el token
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = getCurrentUser();
      if (storedUser) {
        const isValid = await validateToken();
        if (isValid) {
          setUser(storedUser);
        } else {
          // Si el token no sirve, cierro sesión
          logout();
        }
      }
    };
    loadUser();
  }, []);

  /* ================== AUTH ================== */
  // login: mando user y pass al backend, guardo user y token si está ok
  const login = async (userData) => {
    try {
      console.log("Intentando login con:", userData.username);

      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);

      if (!response.ok) {
        console.error("Error del servidor:", responseData);
        return responseData.message;
      }

      if (!responseData.data || !responseData.token) {
        console.error("Respuesta incompleta del servidor:", responseData);
        return "Error: Respuesta del servidor inválida";
      }

      // Armo el usuario final que voy a guardar (incluyo el token)
      const usuario = {
        ...responseData.data,
        token: responseData.token,
      };

      console.log("Usuario a guardar:", usuario);

      setUser(usuario);
      localStorage.setItem("user", JSON.stringify(usuario));
      localStorage.setItem("token", responseData.token);

      // Aviso global a la app que hubo cambio de auth
      window.dispatchEvent(new Event("auth-changed"));
      return null;
    } catch (e) {
      console.error("Error en login:", e);
      return "Error en el servidor";
    }
  };

  // register: creo el usuario y si todo va bien lo guardo y queda logueado
  const register = async (userData) => {
    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Error del servidor:", responseData);
        return responseData.message;
      }

      const usuario = responseData.data;
      setUser(usuario);
      localStorage.setItem("user", JSON.stringify(usuario));
      localStorage.setItem("token", responseData.token);

      window.dispatchEvent(new Event("auth-changed"));
      return null;
    } catch (e) {
      console.error("Error:", e);
      return "Error en el servidor";
    }
  };

  // logout: limpio el almacenamiento y reseteo el estado
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("auth-changed"));
  };

  /* =============== GESTIÓN DE CUENTA =============== */
  // Actualiza el perfil (nombre e imagen) del usuario logueado
  const updateProfile = async (payload) => {
    try {
      const res = await fetch(`${API}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return data.message || "No se pudo actualizar el perfil";

      // Actualizo el estado y también el localStorage
      setUser(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
      return null;
    } catch (e) {
      console.error(e);
      return "Error de red";
    }
  };

  // Cambia la contraseña del usuario (pide la actual y la nueva)
  const changePassword = async ({ currentPassword, newPassword }) => {
    try {
      const res = await fetch(`${API}/user/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) return data.message || "No se pudo cambiar la contraseña";
      return null;
    } catch (e) {
      console.error(e);
      return "Error de red";
    }
  };

  // Elimina la cuenta del usuario actual
  const deleteAccount = async () => {
    try {
      const res = await fetch(`${API}/user`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      let msg = "Cuenta eliminada";
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return data.message || "No se pudo eliminar la cuenta";
      }
      // Limpio sesión local y aviso a la app
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      window.dispatchEvent(new Event("auth-changed"));
      return null;
    } catch (e) {
      console.error(e);
      return "Error de red";
    }
  };

  /* ================= PROVEEDOR ================= */
  // Acá expongo el usuario y todas las funciones para usar desde los componentes
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/* ================= CUSTOM HOOK ================= */
// Pequeño helper para consumir el contexto más fácil en los componentes
export function useUser() {
  return useContext(UserContext);
}

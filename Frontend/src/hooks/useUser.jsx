import { createContext, useContext, useState, useEffect } from "react";

// Contexto de Usuario
const UserContext = createContext();

// Crear un provider y exportarlo para usarlo en main.jsx
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Solo una variable de entorno (unificada)
  const { VITE_API_URL } = import.meta.env;

  // ver si ya estoy logueado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // <- Array de dependencias vacío

  // login
  const login = async (userData) => {
    try {
      // Si VITE_API_URL ya tiene /api/v1, NO repetirlo aquí
      const response = await fetch(`${VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      // Notificamos a la app que cambió el estado de auth
      window.dispatchEvent(new Event("auth-changed"));

      return null; // no hay error
    } catch (e) {
      console.error("Error:", e);
      return "Error en el servidor";
    }
  };

  // registro
  const register = async (userData) => {
    try {
      const response = await fetch(`${VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      // Notificamos a la app que cambió el estado de auth
      window.dispatchEvent(new Event("auth-changed"));

      return null;
    } catch (e) {
      console.error("Error:", e);
      return "Error en el servidor";
    }
  };

  // logout
  const logout = () => {
    console.log("Estoy en logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // 👈 importante para que isAuthenticated() dé false
    setUser(null);
    // avisamos para que Home/Header se rerendericen y cambien la vista
    window.dispatchEvent(new Event("auth-changed"));
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Crear un Custom Hook para usar nuestro contexto de Usuario
export function useUser() {
  return useContext(UserContext);
}

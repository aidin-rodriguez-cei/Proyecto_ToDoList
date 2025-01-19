import { createContext, useContext, useState, useEffect } from "react";

// Contexto de Usuario
const UserContext = createContext();

// Crear un provider y exportarlo para usarlo en main.jsx
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // variables de entorno
  const { VITE_API_URL, VITE_BACKEND_URL } = import.meta.env;

  // ver si ya estoy logueado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // <- Array de dependencias vacío

  // login
  const login = async (userData) => {
    // console.log("Estoy en login");
    // console.log(userData);

    try {
      // Aqui enviamos los datos a nuestro backend
      // y recibiremos la respuesta antes de establecer el usuario

      const response = await fetch(`${VITE_BACKEND_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // el backend me devuelve mi USUARIO completo
      // foto, nombre, email (NO CLAVE)
      const responseData = await response.json();

      if (!response.ok) {
        console.error("Error del servidor:", responseData);
        return responseData.message;
      }

      // extraemos el usuario de la respuesta
      const usuario = responseData.data;

      // guardo con setUser mis datos de usuario
      setUser(usuario);

      // Guardamos el usuario en LocalStorage
      localStorage.setItem("user", JSON.stringify(usuario));

      // Guardamos el JWT token en LocalStorage
      localStorage.setItem("token", responseData.token);

      return null; // no hay error
    } catch (e) {
      console.error("Error:", e);
      return "Error en el servidor";
    }
  };

  // registro
  const register = async (userData) => {
    try {
      // Aqui enviamos los datos a nuestro backend
      // y recibiremos la respuesta antes de establecer el usuario

      const response = await fetch(`${VITE_BACKEND_URL}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // el backend me devuelve mi USUARIO completo
      // foto, nombre, email (NO CLAVE)
      const responseData = await response.json();

      if (!response.ok) {
        console.error("Error del servidor:", responseData);
        return responseData.message;
      }

      // extraemos el usuario de la respuesta
      const usuario = responseData.data;

      // guardo con setUser mis datos de usuario
      setUser(usuario);

      // Guardamos el usuario en LocalStorage
      localStorage.setItem("user", JSON.stringify(usuario));

      // Guardamos el JWT token en LocalStorage
      localStorage.setItem("token", responseData.token);

      return null; // no hay error
    } catch (e) {
      console.error("Error:", e);
      return "Error en el servidor";
    }
  };

  // logout
  const logout = () => {
    console.log("Estoy en logout");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Crear un Custom Hook para usar nuestro contexto de Usuario
// Se exporta para poder usarlo desde cualquier componente.
export function useUser() {
  return useContext(UserContext);
}

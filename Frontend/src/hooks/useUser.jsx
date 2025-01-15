import { createContext, useContext, useState, useEffect } from "react";

// Crear un contexto de Usuario
export const UserContext = createContext();

// Crear un provider y exportarlo para usarlo en main.jsx
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Inicializa el usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login simulado
  const login = async (userData) => {
    console.log("Estoy en login");
    // Simula un inicio de sesión exitoso
    const fakeUser = {
      username: userData.username,
      email: `${userData.username}@example.com`,
      avatar: "https://via.placeholder.com/150",
    };

    localStorage.setItem("user", JSON.stringify(fakeUser)); // Guarda el usuario en localStorage
    setUser(fakeUser); // Actualiza el estado del usuario
  };

  // Registro simulado
  const register = async (userData) => {
    console.log("Estoy en register");
    // Simula un registro exitoso
    const fakeUser = {
      username: userData.username,
      email: `${userData.username}@example.com`,
      avatar: "https://via.placeholder.com/150",
    };

    localStorage.setItem("user", JSON.stringify(fakeUser)); // Guarda el usuario en localStorage
    setUser(fakeUser); // Actualiza el estado del usuario
  };

  // Logout
  const logout = () => {
    console.log("Estoy en logout");
    localStorage.removeItem("user"); // Elimina el usuario de localStorage
    setUser(null); // Resetea el estado del usuario
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


import { createContext, useState, useEffect } from "react";

// Contexto que manejará el modo oscuro o claro
export const ModoOscuroContext = createContext();

// Proveedor del contexto (envuelve a toda la app)
export const ModoOscuroProvider = ({ children }) => {
  // Guarda el tema actual, tomando el valor de localStorage
  const temaGuardado = localStorage.getItem("modoOscuro") || "light";
  const [tema, setTema] = useState(temaGuardado);

  // Cambia el tema entre "dark" y "light" y lo guarda en localStorage
  const toggleTema = () => {
    setTema((prevTema) => {
      const nuevoTema = prevTema === "dark" ? "light" : "dark";
      localStorage.setItem("modoOscuro", nuevoTema); // Guardamos la preferencia del usuario
      return nuevoTema;
    });
  };

  // Cada vez que cambia el tema, actualiza el id del body
  useEffect(() => {
    const body = document.body;
    body.id = tema === "dark" ? "dark-body" : "light-body";
  }, [tema]);

  // Retorna el contexto para que otros componentes puedan usarlo
  return (
    <ModoOscuroContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ModoOscuroContext.Provider>
  );
};

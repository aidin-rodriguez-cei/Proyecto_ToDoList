import { createContext, useState, useEffect } from "react";

export const ModoOscuroContext = createContext();

export const ModoOscuroProvider = ({ children }) => {
  // Leemos el tema guardado en localStorage
  const temaGuardado = localStorage.getItem("modoOscuro") || "light";
  const [tema, setTema] = useState(temaGuardado);

  // Cambiamos el tema y lo guardamos en localStorage
  const toggleTema = () => {
    setTema((prevTema) => {
      const nuevoTema = prevTema === "dark" ? "light" : "dark";
      localStorage.setItem("modoOscuro", nuevoTema); // Guardamos preferencia
      return nuevoTema;
    });
  };

  // Aplicamos la clase/id al body cuando cambia el tema
  useEffect(() => {
    const body = document.body;
    body.id = tema === "dark" ? "dark-body" : "light-body";
  }, [tema]);

  return (
    <ModoOscuroContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ModoOscuroContext.Provider>
  );
};

import { createContext, useState } from "react";

export const ModoOscuroContext = createContext();

export const ModoOscuroProvider = ({ children }) => {
  const [tema, setTema] = useState("light");

  const toggleTema = () => {
    setTema((prevTema) => (prevTema === "dark" ? "light" : "dark"));
  };

  return (
    <ModoOscuroContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ModoOscuroContext.Provider>
  );
};

// src/context/ModoOscuroContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ModoOscuroContext = createContext();

export const ModoOscuroProvider = ({ children }) => {
  const [tema, setTema] = useState(localStorage.getItem('tema') || 'light');

  useEffect(() => {
    localStorage.setItem('tema', tema);
  }, [tema]);

  const toggleTema = () => {
    setTema((prevTema) => (prevTema === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ModoOscuroContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ModoOscuroContext.Provider>
  );
};


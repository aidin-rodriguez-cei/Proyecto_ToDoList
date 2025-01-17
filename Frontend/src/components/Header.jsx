import React, { useContext, useEffect } from "react";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import "@/css/style.css";

const Header = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);

  useEffect(() => {
    // Cambiar el ID del body dependiendo del tema
    const body = document.body;
    body.id = tema === "dark" ? "dark-body" : "light-body";
  }, [tema]);

  return (
    <header className={`header ${tema}`}>
      <div className="container">
        {/* Botón para cambiar entre modo claro y oscuro */}
        <button className="theme-toggle" onClick={toggleTema}>
          {tema === "dark" ? "🌙" : "☀️"}
        </button>

        {/* Título centrado */}
        <h1 className="header-name">To do List</h1>

        {/* Botón de menú */}
        <button className="menu-button">
          <img src="/icons/menu.png" alt="Menú" />
        </button>
      </div>
    </header>
  );
};

export default Header;


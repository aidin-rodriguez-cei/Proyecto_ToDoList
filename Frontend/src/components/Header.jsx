import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import "@/css/style.css";

const Header = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Cambiar el ID del body dependiendo del tema
    const body = document.body;
    body.id = tema === "dark" ? "dark-body" : "light-body";
  }, [tema]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", form);
  };

  return (
    <header className={`header ${tema}`}>
      <div className="container">
        {/* Botón para cambiar entre modo claro y oscuro */}
        <button className="theme-toggle" onClick={toggleTema}>
          {tema === "dark" ? "🌙" : "☀️"}
        </button>

        {/* Título centrado */}
        <h1 className="header-name">
        <Link to="/">To do List</Link>
        </h1>

        {/* Botón de menú con desplegable */}
        <div className="menu-container">
          <button
            className="menu-button"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <img src="/icons/menu.png" alt="Menú" />
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
              <Link to="/registro" onClick={() => setMenuOpen(false)}>
                Registro
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Iniciar sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;



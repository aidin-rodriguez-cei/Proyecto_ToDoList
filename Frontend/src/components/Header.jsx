import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useUser } from "@/hooks/useUser";
import "@/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, login, register } = useUser();

  useEffect(() => {
    // Cambia el ID del body dependiendo del tema
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

        {/* Título */}
        <h1 className="header-name">
          <Link to="/">To do List</Link>
        </h1>

        {/* Menú con desplegable */}
        <div className="menu-container">
          <button
            className="menu-button"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <img src="/icons/menu.png" alt="Menú" />
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <button className="close-menu" onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faTimes} className="close-menu-icon"/>
              </button>

              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </NavLink>

              {user ? (
                <>
                  <NavLink onClick={logout}>Salir</NavLink>
                  <img
                    src={user.image}
                    alt={user.username}
                    className="user-login"
                  />
                  <h3 className="user-login-text">{user.username}</h3>
                </>
              ) : (
                <>
                  <NavLink to="/registro" onClick={() => setMenuOpen(false)}>
                    Registro
                  </NavLink>
                  <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                    Iniciar sesión
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;



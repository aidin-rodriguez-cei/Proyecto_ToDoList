import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useUser } from "@/hooks/useUser";
import "@/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, login, register } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Cambia el ID del body dependiendo del tema
    const body = document.body;
    body.id = tema === "dark" ? "dark-body" : "light-body";
  }, [tema]);

  // ✅ Fallback estable para el avatar si no existe user.image
  const imageSrc =
    user?.image ||
    (user?.username
      ? `https://picsum.photos/seed/${encodeURIComponent(user.username)}/200`
      : "/icons/user.png");

  // ✅ Logout: limpia sesión, notifica y redirige a /login
  const handleLogout = () => {
    try {
      logout?.(); // tu hook limpia localStorage
    } finally {
      // notificamos a la app por si algún componente escucha cambios de auth
      window.dispatchEvent(new Event("auth-changed"));
      // cerramos el menú y redirigimos a /login
      setMenuOpen(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className={`header ${tema}`}>
      <div className="container">
        {/* Botón para cambiar entre modo claro y oscuro */}
        <button className="theme-toggle" onClick={toggleTema}>
          {tema === "dark" ? "🌙" : "☀️"}
        </button>

        {/* Título */}
        <h1 className="header-name">
          <Link
            to={user ? "/" : "/"}
            onClick={() => {
              if (!user) {
                // Si no hay sesión, limpia cache vieja por seguridad
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                // fuerza actualización del estado global (evento)
                window.dispatchEvent(new Event("auth-changed"));
              }
            }}
          >
            To do List
          </Link>
        </h1>

        {/* Menú con desplegable */}
        <div className="menu-container">
          <button
            className="menu-button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <img src="/icons/menu.png" alt="Menú" />
          </button>

          {menuOpen && (
            <div className="menu-dropdown" role="menu">
              <button
                className="close-menu"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <FontAwesomeIcon icon={faTimes} className="close-menu-icon" />
              </button>

              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </NavLink>

              {user ? (
                <>
                  {/* handleLogout para redirigir a /login */}
                  <NavLink
                    to="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Salir
                  </NavLink>

                  <div className="user-info">
                    <img
                      src={imageSrc}
                      alt={user.username}
                      className="user-login"
                    />
                    <h3 className="user-login-text">{user.username}</h3>
                  </div>
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

import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useUser } from "@/hooks/useUser";
import "@/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Componente principal del encabezado de la aplicación
export const Header = () => {
  // Contexto del modo oscuro
  const { tema, toggleTema } = useContext(ModoOscuroContext);

  // Estado para manejar el menú desplegable
  const [menuOpen, setMenuOpen] = useState(false);

  // Info del usuario y la función logout desde el hook
  const { user, logout } = useUser();

  // Para redireccionar al cerrar sesión
  const navigate = useNavigate();

  // Cambia el fondo del body según el tema seleccionado
  useEffect(() => {
    const body = document.body;
    body.id = tema === "dark" ? "dark-body" : "light-body";
  }, [tema]);

  // Imagen del usuario o un avatar genérico si no tiene
  const imageSrc =
    user?.image ||
    (user?.username
      ? `https://picsum.photos/seed/${encodeURIComponent(user.username)}/200`
      : "/icons/user.png");

  // Cierra sesión y redirige al login
  const handleLogout = () => {
    try {
      logout?.();
    } finally {
      window.dispatchEvent(new Event("auth-changed"));
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

        {/* Título principal con link al inicio */}
        <h1 className="header-name">
          <Link
            to="/"
            onClick={() => {
              if (!user) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.dispatchEvent(new Event("auth-changed"));
              }
            }}
          >
            To do List
          </Link>
        </h1>

        {/* Menú principal */}
        <div className="menu-container">
          {/* Botón que abre o cierra el menú */}
          <button
            className="menu-button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <img src="/icons/menu.png" alt="Menú" />
          </button>

          {/* Menú desplegable */}
          {menuOpen && (
            <div className="menu-dropdown" role="menu">
              {/* Botón para cerrar el menú */}
              <button
                className="close-menu"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <FontAwesomeIcon icon={faTimes} className="close-menu-icon" />
              </button>

              {/* Enlace al inicio, siempre visible */}
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </NavLink>

              {/* Si hay usuario, se muestran opciones de cuenta */}
              {user ? (
                <>
                  <NavLink to="/cuenta" onClick={() => setMenuOpen(false)}>
                    Mi cuenta
                  </NavLink>

                  <NavLink
                    to="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Salir
                  </NavLink>

                  {/* Muestra el avatar y el nombre del usuario */}
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
                // Si no hay sesión, se muestran las opciones de login y registro
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

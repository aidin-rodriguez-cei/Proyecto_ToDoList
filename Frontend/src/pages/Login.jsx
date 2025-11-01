// ============================================================
// Permite al usuario iniciar sesión
// Al hacer login exitoso, guarda el usuario en localStorage
// y redirige a la página principal. Solo agrego comentarios
// ============================================================

import React, { useState, useContext } from "react";
import { useUser } from "@/hooks/useUser";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser } from "@/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/style.css";

const Login = () => {
  // Obtiene el tema actual (light/dark)
  const { tema, toggleTema } = useContext(ModoOscuroContext);

  // Estado del formulario: username (email), password e imagen
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    image: "https://picsum.photos/200", // imagen temporal por defecto
  });

  // Hook de usuario que provee la función login()
  const { login } = useUser();

  // Hook de navegación de React Router
  const navigate = useNavigate();

  // ------------------------------------------------------------
  // Maneja el cambio en los inputs del formulario
  // ------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ------------------------------------------------------------
  // Maneja el envío del formulario (login)
  // ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = await login(formData);

    if (err) {
      // En caso de error, muestra mensaje en consola (puede reemplazarse por toast)
      console.error("Error de login:", err);
      return;
    }

    // Verifica que el usuario se guardó correctamente en localStorage
    const storedUser = getCurrentUser();
    if (!storedUser) {
      console.error("Error: No se pudo obtener el usuario después del login");
      return;
    }

    // Si todo fue bien, redirige a la página principal
    console.log("Login exitoso, redirigiendo...");
    navigate("/", { replace: true });
  };

  // ------------------------------------------------------------
  // Render principal
  // ------------------------------------------------------------
  return (
    <div className={`page-container ${tema}`}>
      <Header />

      {/* Contenedor central del formulario */}
      <div className="form-center-container">
        <div className="box-text">
          <h1>¡Hola de nuevo!</h1>
          <p>Inicia sesión y sigue organizando tu día como un experto.</p>
        </div>

        {/* Formulario de inicio de sesión */}
        <div className="form-box">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Usuario:</label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              placeholder="Ingresa tu email"
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Ingresa tu contraseña"
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            <button type="submit">Entrar</button>
          </form>

          {/* Enlace al registro */}
          <p className="mt-4 text-sm">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-link">
              Crea una aquí
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;

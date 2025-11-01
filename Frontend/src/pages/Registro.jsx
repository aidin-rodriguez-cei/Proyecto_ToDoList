// ============================================================
// Formulario para crear una cuenta nueva
// ============================================================

import React, { useState, useContext } from "react";
import { useUser } from "@/hooks/useUser";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/style.css";

const Registro = () => {
  // Estado global de tema (claro/oscuro)
  const { tema, toggleTema } = useContext(ModoOscuroContext);

  // ------------------------------------------------------------
  // Estado local del formulario (inputs controlados)
  // ------------------------------------------------------------
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    tyc: false,
    image: "https://picsum.photos/200",
  });

  // Función register del contexto de usuario
  const { register } = useUser();
  // Navegación para redirigir tras registrarse
  const navigate = useNavigate();

  // ------------------------------------------------------------
  // Manejador de cambios en inputs (incluye checkbox)
  // ------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ------------------------------------------------------------
  // Envío del formulario (registro)
  // ------------------------------------------------------------
  // ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = await register(formData);
    if (err) {
      // Si la API devuelve un error, aquí simplemente salgo 
      return;
    }
    // Aviso global de que cambió el estado de auth
    window.dispatchEvent(new Event("auth-changed"));
    // Redirijo a la página de inicio
    navigate("/");
  };

  // ------------------------------------------------------------
  // Render de la página de registro
  // ------------------------------------------------------------
  return (
    <div className={`page-container ${tema}`}>
      <Header />
      <div className="form-center-container">
        <div className="box-text">
          <h1>¡Organiza tu día!</h1>
          <p>Regístrate y empieza a gestionar tus tareas de forma eficiente.</p>
        </div>
        <div className="form-box">
          <h2>Regístrate</h2>

          {/* Formulario con campos controlados */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Ingresa tu nombre"
              onChange={handleChange}
              autoComplete="name"
              required
            />

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
              autoComplete="new-password"
              required
            />

            {/* Aceptación de Términos y Condiciones */}
            <label className="tyc">
              <input
                onChange={handleChange}
                name="tyc"
                type="checkbox"
                checked={formData.tyc}
                required
              />
              Acepto los Términos y Condiciones
            </label>

            {/* Botón de enviar */}
            <button type="submit">Registrarme</button>
          </form>

          {/* Enlace para ir a login si ya tiene cuenta */}
          <p className="form-link">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registro;

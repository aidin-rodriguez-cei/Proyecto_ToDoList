import React, { useState, useContext } from "react";
import { useUser } from '@/hooks/useUser';
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useNavigate, Link } from 'react-router-dom'; // 👈 agregado Link
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/style.css";

const Registro = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    tyc: false,
    image: "https://picsum.photos/200"
  });

  const { register } = useUser(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData, 
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

// ...
const handleSubmit = async (e) => {
  e.preventDefault();
  const err = await register(formData);  // 👈 esperar a que termine
  if (err) {
    // mostrar error si quieres
    return;
  }
  window.dispatchEvent(new Event("auth-changed")); // 👈 notifica
  navigate("/");
};


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
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Ingresa tu nombre"
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Usuario:</label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              placeholder="Ingresa tu email"
              onChange={handleChange}
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
              required
            />
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

            <button type="submit">Registrarme</button>
          </form>

          {/* 🔗 Enlace centrado para iniciar sesión */}
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

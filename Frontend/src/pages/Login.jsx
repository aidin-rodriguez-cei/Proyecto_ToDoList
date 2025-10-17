import React, { useState, useContext } from "react";
import { useUser } from '@/hooks/useUser';
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useNavigate, Link } from "react-router-dom"; // 👈 agregado Link
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/style.css";

const Login = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);

  const [formData, setFormData] = useState({ 
      username: "", 
      password: "",
      image: "https://picsum.photos/200"
    });

  const { login } = useUser(); 
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

// ...
const handleSubmit = async (e) => {
  e.preventDefault();
  const err = await login(formData);     // 👈 esperar a que termine
  if (err) {
    // aquí puedes mostrar toast o error si quieres
    return;
  }
  window.dispatchEvent(new Event("auth-changed")); // 👈 notifica cambio de sesión
  navigate("/");
};


  return (
    <div className={`page-container ${tema}`}>
      <Header />
      <div className="form-center-container">
        <div className="box-text">
          <h1>¡Hola de nuevo!</h1>
          <p>Inicia sesión y sigue organizando tu día como un experto.</p>
        </div>
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
            <button type="submit">Entrar</button>
          </form>

          {/* 🔗 Enlace a Registro */}
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

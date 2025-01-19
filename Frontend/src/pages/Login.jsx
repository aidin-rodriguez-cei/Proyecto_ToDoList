import React, { useState, useContext } from "react";
import { useUser } from '@/hooks/useUser';
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Autenticación
    console.log(formData);
    login(formData);
    // redirige a otra página
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

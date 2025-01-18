import React, { useState, useContext } from "react";
import { useUser } from '@/hooks/useUser';
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/style.css";

const Registro = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Registro
    console.log("Datos de registro:", formData);
    register(formData);
    // redirige a otra página
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
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="tyc">
              <input
                onChange={handleChange}
                name="tyc"
                type="checkbox"
                checked={formData.tyc}
              />
              Acepto los Terminos y Condiciones
            </label>

            <button type="submit">Registrarme</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registro;

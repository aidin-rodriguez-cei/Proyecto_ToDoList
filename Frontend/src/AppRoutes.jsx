import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Registro';
import Admin from './pages/Admin';
import PrivateRoute from './components/PrivateRoute';  // Ya no es necesario para control de acceso

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Registro" element={<Register />} />
      <Route path="/Admin" element={<Admin />} /> {/* Ya no necesitas envolverla con PrivateRoute */}
      {/* Agrega más rutas si las necesitas */}
    </Routes>
  );
}

export default AppRoutes;






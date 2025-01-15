import React from 'react';
import { BrowserRouter } from 'react-router-dom';  // Importamos BrowserRouter
import Header from './components/Header';  // Importación por defecto de Header
import { Footer } from './components/Footer';  // Asegúrate de que Footer esté exportado correctamente
import AppRoutes from './AppRoutes'; // Importamos AppRoutes

const App = () => {
  return (
    <BrowserRouter> {/* Usamos BrowserRouter para envolver nuestras rutas */}
      <Header />
      <AppRoutes /> {/* Usamos AppRoutes en lugar de definir Routes directamente aquí */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;















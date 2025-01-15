import React from 'react';
import TaskManager from '../components/TaskManager';  // Importar el componente TaskManager

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-lg font-bold">Bienvenido a la aplicación de tareas</h1> {/* Título con estilo */}
      <p>Esta sección es pública</p> {/* Texto adicional */}
      
      <TaskManager /> {/* Componente TaskManager que gestiona las tareas */}
    </div>
  );
};

export default Home;

  
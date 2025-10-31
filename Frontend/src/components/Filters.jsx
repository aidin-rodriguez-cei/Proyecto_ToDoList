import React, { useState } from "react";
import "@/css/style.css";

// Componente que maneja los filtros de las tareas
const Filters = ({ onFilter }) => {
  // Estado local para guardar los valores de los filtros seleccionados
  const [filter, setFilter] = useState({
    category: "",
    priority: "",
    completed: "",
  });

  // Función que actualiza el filtro cada vez que el usuario cambia una opción
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Se crea un nuevo objeto con el filtro actualizado
    const newFilter = { ...filter, [name]: value };
    setFilter(newFilter);
    // Se envía el nuevo filtro al componente padre
    onFilter(newFilter);
  };

  return (
    // Contenedor de todos los selectores de filtro
    <div className="filters task-dark">
      {/* Filtro por categoría */}
      <select name="category" value={filter.category} onChange={handleChange}>
        <option value="">Todas las categorías</option>
        <option value="work">Trabajo</option>
        <option value="personal">Personal</option>
        <option value="home">Doméstica</option>
        <option value="fun">Entretenimiento</option>
      </select>

      {/* Filtro por prioridad con estilos personalizados */}
      <select
        name="priority"
        value={filter.priority}
        onChange={handleChange}
        style={{
          padding: "0.5rem",
          borderRadius: "0.375rem",
          border: "1px solid #dee2e6",
          minWidth: "180px",
        }}
      >
        <option value="">Todas</option>
        <option value="0" style={{ color: "#868e96" }}>
          ⚪ Sin prioridad
        </option>
        <option value="1" style={{ color: "#69db7c" }}>
          ● Baja
        </option>
        <option value="2" style={{ color: "#ffd43b" }}>
          ● Media
        </option>
        <option value="3" style={{ color: "#ff8787" }}>
          ● Alta
        </option>
      </select>

      {/* Filtro por estado (completadas o pendientes) */}
      <select name="completed" value={filter.completed} onChange={handleChange}>
        <option value="">Todas</option>
        <option value="true">Completadas</option>
        <option value="false">Pendientes</option>
      </select>
    </div>
  );
};

export default Filters;

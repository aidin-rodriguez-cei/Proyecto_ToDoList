import React, { useState } from "react";

const Filters = ({ onFilter }) => {
  const [filter, setFilter] = useState({
    category: "",
    priority: "",
    completed: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilter = { ...filter, [name]: value };
    setFilter(newFilter);
    onFilter(newFilter); 
  };

  return (
    <div className="filters task-dark">
      <select name="category" value={filter.category} onChange={handleChange}>
        <option value="">Todas las categorías</option>
        <option value="work">Trabajo</option>
        <option value="personal">Personal</option>
        <option value="home">Doméstica</option>
        <option value="fun">Entretenimiento</option>
      </select>
      <select name="priority" value={filter.priority} onChange={handleChange}>
        <option value="">Todas las prioridades</option>
        <option value="1">Baja</option>
        <option value="2">Media</option>
        <option value="3">Alta</option>
      </select>
      <select name="completed" value={filter.completed} onChange={handleChange}>
        <option value="">Todas</option>
        <option value="true">Completadas</option>
        <option value="false">Pendientes</option>
      </select>
    </div>
  );
};

export default Filters;

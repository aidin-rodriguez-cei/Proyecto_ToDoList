import React, { useState, useRef, useEffect } from "react";

// Componente que muestra menú desplegable personalizado para elegir la prioridad de una tarea
const PriorityDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú está abierto
  const dropdownRef = useRef(null); // Referencia para detectar clics fuera del componente

  // Opciones disponibles en el menú de prioridad
  const options = [
    { value: "", label: "Todas las prioridades", className: "priority-all" },
    { value: "0", label: "Sin prioridad", className: "priority-none" },
    { value: "1", label: "Baja", className: "priority-low" },
    { value: "2", label: "Media", className: "priority-medium" },
    { value: "3", label: "Alta", className: "priority-high" },
  ];

  // Cierra el menú cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Maneja la selección de una prioridad
  const handleSelect = (optionValue) => {
    onChange({ target: { name: "priority", value: optionValue } });
    setIsOpen(false);
  };

  // Encuentra la opción seleccionada o muestra la primera por defecto
  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    // Contenedor principal del dropdown
    <div className="custom-dropdown" ref={dropdownRef}>
      {/* Botón que abre o cierra el menú */}
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="priority-option">
          <span className={`priority-dot ${selectedOption.className}`}></span>
          {selectedOption.label}
        </span>
      </button>

      {/* Menú con las opciones */}
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${
                value === option.value ? "selected" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              <span className="priority-option">
                <span className={`priority-dot ${option.className}`}></span>
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown;

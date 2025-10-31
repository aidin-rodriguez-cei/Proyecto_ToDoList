import React, { useState, useRef, useEffect } from "react";

// Componente que muestra menú desplegable para elegir la prioridad de una tarea
const PrioritySelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado que controla si el menú está abierto o cerrado
  const wrapperRef = useRef(null); // Referencia para detectar clics fuera del componente

  // Lista de opciones con sus colores y etiquetas
  const options = [
    { value: "all", label: "Todas", color: "#868e96" },
    { value: "0", label: "Sin prioridad", color: "#ced4da" },
    { value: "1", label: "Baja", color: "#69db7c" },
    { value: "2", label: "Media", color: "#ffd43b" },
    { value: "3", label: "Alta", color: "#ff8787" },
  ];

  // Cierra el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Encuentra la opción seleccionada o muestra la primera por defecto
  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    // Contenedor del menú desplegable
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* Botón principal que muestra la opción seleccionada */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "0.5rem",
          borderRadius: "0.375rem",
          border: "1px solid #dee2e6",
          backgroundColor: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: selectedOption.color,
          }}
        />
        <span>{selectedOption.label}</span>
      </div>

      {/* Menú con todas las opciones */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "4px",
            backgroundColor: "white",
            border: "1px solid #dee2e6",
            borderRadius: "0.375rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          {/* Se mapean las opciones y se muestran como elementos seleccionables */}
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange({ target: { value: option.value } });
                setIsOpen(false);
              }}
              style={{
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                backgroundColor:
                  option.value === value ? "#f8f9fa" : "transparent",
                ":hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
            >
              {/* Círculo de color que representa la prioridad */}
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: option.color,
                }}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrioritySelect;

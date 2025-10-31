import React, { useState, useRef, useEffect } from "react";

// Componente personalizado para crear un menú select con colores
const CustomSelect = ({
  value,
  onChange,
  options,
  defaultColor = "#868e96",
}) => {
  // Estado para controlar si el menú está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Referencia para detectar clics fuera del componente
  const wrapperRef = useRef(null);

  // useEffect que cierra el menú cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Busca la opción seleccionada en base al value recibido
  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* Caja principal que muestra la opción actual */}
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
        {/* Círculo de color que representa la prioridad u opción */}
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: selectedOption.color || defaultColor,
          }}
        />
        <span>{selectedOption.label}</span>
      </div>

      {/* Lista desplegable con las opciones */}
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
              {/* Muestra un pequeño círculo con el color de la opción */}
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: option.color || defaultColor,
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

export default CustomSelect;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";  // Importar el hook de usuario

const Registro = () => {
  const { register } = useUser();  // Obtener la función de registro
  const [canSubmit, setCanSubmit] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    tyc: false,
  });

  useEffect(() => {
    setCanSubmit(
      formData.name && formData.username && formData.password && formData.tyc
    );
  }, [formData]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);  // Llamar al registro
    navigate("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <h1 className="text-lg font-bold text-center">Registro</h1>

      <input
        onChange={handleChange}
        value={formData.name}
        type="text"
        name="name"
        placeholder="Nombre"
        required
      />

      <input
        onChange={handleChange}
        value={formData.username}
        type="email"
        name="username"
        placeholder="Usuario"
        required
      />

      <input
        onChange={handleChange}
        value={formData.password}
        type="password"
        name="password"
        placeholder="Clave"
        required
      />

      <label className="flex items-center gap-2">
        <input
          onChange={handleChange}
          name="tyc"
          type="checkbox"
        />
        Acepto TyC
      </label>

      <button type="submit" disabled={!canSubmit} className="w-full">
        {canSubmit ? "Registrarse" : "Complete todos los datos"}
      </button>
    </form>
  );
};

export default Registro;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
    const [canSubmit, setCanSubmit] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        tyc: false,
        image: "https://picsum.photos/200"
    });

    // Botón de Submit
    useEffect(() => {
        setCanSubmit(formData.name && formData.username && formData.password && formData.tyc);
    }, [formData]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        navigate("/admin");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1>Registro</h1>

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

            <label>
                <input 
                    onChange={handleChange} 
                    name="tyc" 
                    type="checkbox" 
                /> Acepto TyC
            </label>

            {canSubmit ? 
                <button type="submit">Registro</button> : 
                <button disabled>Complete todos los datos</button>
            }
        </form>
    );
};

export default Registro;

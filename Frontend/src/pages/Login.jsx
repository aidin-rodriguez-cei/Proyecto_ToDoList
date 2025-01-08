import { useState } from "react";

const Login = () => {
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        // Info del backend 
        name:  "Aidin",
        image: "https://picsum.photos/200"
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (  
        <form onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        >
        <h1>Soy Login</h1>
        
        <input onChange={handleChange} value={formData.username} type="email" name="username" placeholder="Usuario" requeried/>
        <input onChange={handleChange} value={formData.password} type="password" name="password" placeholder="Clave" requeried/>
        <input onChange={handleChange} type="submit" name="Login" />

        </form>
    );
}
export default Login;
import {Link , NavLink} from 'react-router-dom';

export const Header = () => {
    return ( 
        <header className='bg-gray-800 text-white w-full'>
            <nav className=" p-2 flex items-center justify-between">
                <NavLink to="/"><h1>To Do List</h1></NavLink>
                <ul className="flex gap-5">
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/Login">Iniciar sesión</NavLink></li>
                    <li><NavLink to="/Registro">Regístrate</NavLink></li>
                    <li><NavLink to="/Admin">Admin</NavLink></li>
                    <li>Salir</li>

                </ul>
            </nav>
        </header>
    );
}
import React from "react";
import "@/css/style.css";


const Header = () => {
    return (
        <header className="header">
            <nav>
                <img src="/public/icons/menu.png" alt="Menú" />
                <h1 className="header-name">To do List</h1>
                <img src="/public/icons/user.png" alt="Login" />
            </nav>
        </header>
    );
};

export default Header;

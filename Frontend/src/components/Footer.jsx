import React from "react";
import "@/css/style.css";

const Footer = ({ onAddTask }) => {
    return (
        <footer>
            <button id="add" title="Nueva Tarea" onClick={onAddTask}>
                <img src="/public/icons/add.png" alt="Add new" />
            </button>
        </footer>
    );
};

export default Footer;

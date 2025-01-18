import { useRouteError } from "react-router-dom";
import { useContext } from "react";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom"; 
import "@/css/style.css";

const ErrorPage = () => {
  const error = useRouteError();
  const { tema } = useContext(ModoOscuroContext); 
  
  return (
    <div className={`page-container ${tema}`}>
      <Header />
      <div className="error-page">
        <h1>¡Ups! Algo se nos escapó.</h1>
        <p>
          {error?.statusText ||
            error?.message ||
            "Parece que la página que buscas no existe 😅, pero no te preocupes "}
          <Link to="/" className="link-home">
            ¡puedes seguir organizando tus tareas aquí!
          </Link>
          {""}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;

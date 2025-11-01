import { useRouteError, Link } from "react-router-dom";
import { useContext } from "react";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/style.css";

/**
 * ====================== ERROR PAGE ======================
 * Esta página muestra cuando ocurre un error de enrutamiento
 * o el usuario intenta acceder a una ruta inexistente
 *
 * - Muestra un mensaje genérico con el error capturado por React Router
 * - Incluye el <Header /> y <Footer /> para mantener la coherencia visual
 * - Adapta los estilos al tema actual (claro / oscuro)
 */

const ErrorPage = () => {
  const error = useRouteError();
  const { tema } = useContext(ModoOscuroContext);

  const mensajeError =
    error?.statusText ||
    error?.message ||
    "Parece que la página que buscas no existe 😅, pero no te preocupes.";

  return (
    <div className={`page-container ${tema}`}>
      <Header />
      <main className="error-page">
        <h1>¡Ups! Algo se nos escapó.</h1>
        <p>
          {mensajeError}{" "}
          <Link to="/" className="link-home">
            ¡puedes seguir organizando tus tareas aquí!
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;

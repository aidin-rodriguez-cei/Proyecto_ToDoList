// ============================================================
// Pantalla principal. Muestra una vista pública
// si no hay sesión y la vista privada (lista de tareas) si el
// usuario está autenticado. 
// ============================================================

import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { TasksProvider } from "@/context/TasksContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { isAuthenticated, validateToken, logout } from "@/auth";
import { useUser } from "@/hooks/useUser";

const Home = () => {
  // Tema actual (claro/oscuro) desde el contexto
  const { tema } = useContext(ModoOscuroContext);

  // Controla si el formulario de crear/editar tarea está abierto
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Trae el usuario actual para “reiniciar” el provider al cambiar
  const { user } = useUser();

  // ------------------------------------------------------------
  // Estado de autenticación y carga
  // isLogged: indica si hay usuario con token válido
  // isLoading: pantalla de “cargando” mientras verifico auth
  // ------------------------------------------------------------
  const [isLogged, setIsLogged] = useState(isAuthenticated());
  const [isLoading, setIsLoading] = useState(true);

  // ------------------------------------------------------------
  // Efecto: verificación de sesión
  // 1. Revisa si hay datos en localStorage (isAuthenticated)
  // 2. Si hay, valida el token contra el backend (validateToken)
  // 3. Si no es válido, hace logout y apaga la sesión
  // 4. Escucha el evento "auth-changed" para revalidar
  // ------------------------------------------------------------
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const authenticated = isAuthenticated();

      if (authenticated) {
        const isValid = await validateToken();
        if (!isValid) {
          logout();
          setIsLogged(false);
        } else {
          setIsLogged(true);
        }
      } else {
        setIsLogged(false);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Re-escucha cambios de auth para actualizar la vista
    const handler = () => checkAuth();
    window.addEventListener("auth-changed", handler);
    return () => window.removeEventListener("auth-changed", handler);
  }, []);

  // ------------------------------------------------------------
  // Estado: pantalla de carga mientras verifico autenticación
  // ------------------------------------------------------------
  if (isLoading) {
    return (
      <div className={`${tema === "dark" ? "dark" : "light"} flex items-center justify-center h-screen`}>
        <p>Cargando...</p>
      </div>
    );
  }

  // ============================
  // Vista pública (sin sesión)
  // Si no hay usuario logueado, muestro una tarjeta con enlaces a Login y Registro
  // ============================
  if (!isLogged) {
    return (
      <div className={`${tema === "dark" ? "dark" : "light"} home-public`}>
        <Header />

        <main className="app-main home-public-main">
          <section className="max-w-lg w-full text-center rounded-2xl p-8 shadow-lg bg-white dark:bg-[#333]">
            <h1 className="text-3xl font-bold mb-3">👋 ¡Hola!</h1>
            <p className="mb-6">Empieza a organizar tus tareas y alcanzar tus metas.</p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/login" className="rounded-2xl px-5 py-2 font-semibold border">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="rounded-2xl px-5 py-2 font-semibold">
                Crear cuenta
              </Link>
            </div>
          </section>
        </main>

        {/* Paso el handler para abrir el formulario, aunque en público no se usa */}
        <Footer onAddTask={() => setIsFormOpen(true)} />
      </div>
    );
  }

  // ============================
  // Vista privada (con sesión)
  // Envuelvo en TasksProvider para disponer de estado
  // global de tareas, uso `key` con el username para resetear
  // el estado si cambia el usuario
  // ============================
  return (
    <TasksProvider key={user?.username || "guest"}>
      <div className={`app-layout ${tema === "dark" ? "dark" : "light"}`}>
        <Header />

        <main className="app-main">
          {/* Muestro el formulario si está abierto, si no la lista */}
          {isFormOpen ? (
            <TaskForm onClose={() => setIsFormOpen(false)} />
          ) : (
            <TaskList />
          )}
        </main>

        {/* Botón flotante en el footer para abrir el form de tareas */}
        <Footer onAddTask={() => setIsFormOpen(true)} />
      </div>
    </TasksProvider>
  );
};

export default Home;



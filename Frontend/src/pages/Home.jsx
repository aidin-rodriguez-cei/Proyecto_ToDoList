import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { TasksProvider } from "@/context/TasksContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { isAuthenticated } from "@/auth";
import { useUser } from "@/hooks/useUser"; // 👈 AÑADIDO

const Home = () => {
  const { tema } = useContext(ModoOscuroContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useUser(); // 👈 AÑADIDO

  // Forzar re-render al cambiar auth (login/logout)
  const [, setAuthTick] = useState(0);
  useEffect(() => {
    const handler = () => setAuthTick((t) => t + 1);
    window.addEventListener("auth-changed", handler);
    return () => window.removeEventListener("auth-changed", handler);
  }, []);

  const logged = isAuthenticated();

  // 👀 Vista pública (sin sesión)
  if (!logged) {
    return (
      <div className={`${tema === "dark" ? "dark" : "light"} home-public`}>
        <Header />
        <main className="home-public-main">
          <section className="max-w-lg w-full text-center rounded-2xl p-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-3">👋 ¡Hola!</h1>
            <p className="mb-6">
              Empieza a organizar tus tareas y alcanzar tus metas.
            </p>
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
        <Footer />
      </div>
    );
  }

  // 🔐 Vista privada (con sesión)
  return (
    // 👇 CLAVE: remonta el provider cuando cambia user
    <TasksProvider key={user?.username || "guest"}>
      <div className={tema === "dark" ? "dark" : "light"}>
        <Header />
        {isFormOpen ? (
          <TaskForm onClose={() => setIsFormOpen(false)} />
        ) : (
          <TaskList />
        )}
        <Footer onAddTask={() => setIsFormOpen(true)} />
      </div>
    </TasksProvider>
  );
};

export default Home;

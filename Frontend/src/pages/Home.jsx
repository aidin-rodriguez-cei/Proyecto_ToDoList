import React, { useContext, useState } from "react";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import { TasksProvider } from "@/context/TasksContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

const Home = () => {
  const { tema } = useContext(ModoOscuroContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <TasksProvider>
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


// Cargar variables de entorno con VITE_BACKEND_URL
const { VITE_BACKEND_URL } = import.meta.env;
const getUsers = async () => {
  const token = localStorage.getItem('token'); //obtengo el token JWT del localStorage

  const response = await fetch(`${VITE_BACKEND_URL}/api/v1/users`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
});
const responseData = await response.json();
console.log(responseData);
setUsers(responseData.data);
}

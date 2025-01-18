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
      {/* Aplicar clase de tema global al body */}
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

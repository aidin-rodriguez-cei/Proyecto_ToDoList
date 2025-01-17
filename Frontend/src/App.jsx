import React, { useState } from "react";
import { TasksProvider } from "@/context/TasksContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

const App = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <TasksProvider>
            <Header />
            {isFormOpen ? (
                <TaskForm onClose={() => setIsFormOpen(false)} />
            ) : (
                <>
                    <TaskList />
                </>
            )}
            <Footer onAddTask={() => setIsFormOpen(true)} />
        </TasksProvider>
    );
};

export default App;





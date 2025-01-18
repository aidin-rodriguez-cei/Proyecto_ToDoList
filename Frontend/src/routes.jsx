import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Registro from "@/pages/Registro";
import ErrorPage from "@/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;

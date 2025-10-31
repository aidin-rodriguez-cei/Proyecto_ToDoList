import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* ============================================================
   RUTAS PRINCIPALES (carga diferida con React.lazy)
   ============================================================ */
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Registro = lazy(() => import("@/pages/Registro"));
const Cuenta = lazy(() => import("@/pages/Cuenta"));
const ErrorPage = lazy(() => import("@/error-page"));

/* ============================================================
   Fallback de carga (mientras se cargan los componentes)
   ============================================================ */
const Loader = () => (
  <div
    style={{
      minHeight: "70vh",
      display: "grid",
      placeItems: "center",
      fontSize: "1.1rem",
    }}
  >
    <p>Cargando...</p>
  </div>
);

/* ============================================================
   Definición de rutas (con Suspense por cada elemento)
   ============================================================ */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
  },
  {
    path: "/registro",
    element: (
      <Suspense fallback={<Loader />}>
        <Registro />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
  },
  {
    path: "/cuenta",
    element: (
      <Suspense fallback={<Loader />}>
        <Cuenta />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
  },
  // Ruta comodín (404)
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
  },
]);

/* ============================================================
   Componente principal de enrutamiento
   ============================================================ */
const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;

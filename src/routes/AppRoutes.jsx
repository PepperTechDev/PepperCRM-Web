import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import PrivateRoute from "./PrivateRoute";
import Sidebar from "../components/sidebar/pages/Sidebar";

const protectedRoutes = [
  { path: "leads", element: <h1>Ruta protegida</h1> },
  { path: "contacts", element: <h1>Ruta protegida</h1> },
  { path: "deals", element: <h1>Ruta protegida</h1> },
  { path: "products", element: <h1>Ruta protegida</h1> },
  { path: "vendors", element: <h1>Ruta protegida</h1> },
  { path: "quotes", element: <h1>Ruta protegida</h1> },
  { path: "tasks", element: <h1>Ruta protegida</h1> },
  { path: "calendar", element: <h1>Ruta protegida</h1> },
  { path: "forms", element: <h1>Ruta protegida</h1> },
];

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="login" element={<Login />} />

      {/* Rutas protegidas no anidadas*/}
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PrivateRoute>{element}</PrivateRoute>}
        />
      ))}


      {/* Rutas protegidas anidadas*/}
      <Route path="calls" element={<PrivateRoute />}>
        <Route index element={<h1>calls anidado</h1>} />
        <Route path="incomming" element={<h1>Incomming anidado</h1>} />
      </Route>
      
      {/* Redirección para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;

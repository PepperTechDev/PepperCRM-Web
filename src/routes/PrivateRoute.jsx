import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Componente PrivateRoute
const PrivateRoute = ({ children }) => {
  // Si hay `children`, renderiza rutas individuales
  if (children) {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
  }

  // Si no hay `children`, renderiza rutas anidadas usando Outlet
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
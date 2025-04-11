import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import PrivateRoute from "./PrivateRoute";
import Leads from "../features/leads/pages/leads";
import Contacts from "../features/contacts/pages/Contacts";
import Products from "../features/products/pages/Products";
import Quotes from "../features/quotes/pages/Quotes";
import Vendors from "../features/vendors/pages/Vendors";
import NotFound from "../pages/notFound/pages/NotFound";



const protectedRoutes = [
  { path: "leads", element: <Leads /> },
  { path: "contacts", element: <Contacts /> },
  { path: "deals", element: <h1>Ruta protegida</h1> },
  { path: "products", element: <Products /> },
  { path: "vendors", element: <Vendors /> },
  { path: "quotes", element: <Quotes /> },
  { path: "tasks", element: <h1>Ruta protegida</h1> },
  { path: "calendar", element: <h1>Ruta protegida</h1> },
  { path: "forms", element: <h1>Ruta protegida</h1> },
];

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="leads/all" element={<Leads />} />
      <Route path="notFound" element={<NotFound />} />




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
      <Route path="*" element={<Navigate to="/notFound" replace />} />
    </Routes>
  );
};

export default AppRoutes;

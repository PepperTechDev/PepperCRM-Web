import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="deals" element={<Deals />} />
        <Route path="products" element={<Products />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="calls-meets" element={<CallsMeets />} />
        <Route path="forms" element={<Forms />} />
      </Route> */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;

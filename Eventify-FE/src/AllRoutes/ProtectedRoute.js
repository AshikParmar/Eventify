import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const role = user?.role;

  return role === "Admin" ? <Outlet /> : <Navigate to="/user/login" />;
};

export default ProtectedRoute;

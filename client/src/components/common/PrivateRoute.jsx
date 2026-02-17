import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if logged in
  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }
  return children; // Logged in → show page
};

export default PrivateRoute;

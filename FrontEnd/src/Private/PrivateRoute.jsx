import React from "react";
import { useAuthContext } from "@/Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;

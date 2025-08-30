import React from "react";
import { useAuthContext } from "@/Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthGovContext } from "@/Context/GovContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedInAsGov } = useAuthGovContext();
  const { isLoggedInAsPro } = useAuthContext();
  const location = useLocation();
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (isLoggedInAsGov || isLoggedInAsPro) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;

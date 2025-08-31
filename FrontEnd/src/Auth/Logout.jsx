import React, { useEffect } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import { Navigate } from "react-router-dom";
import { useAuthGovContext } from "@/Context/GovContext";
import toast from "react-hot-toast";

const Logout = () => {
  const { userLogout } = useAuthContext();
  const { userLogoutAsGov } = useAuthGovContext();

  const handleLogout = () => {
    userLogout(); // Call the logout function
    userLogoutAsGov(); // Call the government logout function

    toast.success("Logout successful");
    
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <Navigate to="/" />;
};

export default Logout;

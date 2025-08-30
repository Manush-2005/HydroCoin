import React, { useEffect } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import { Navigate } from "react-router-dom";
import { useAuthGovContext } from "@/Context/GovContext";
import toast from "react-hot-toast";

const Logout = () => {
  const { userLogout } = useAuthContext();
  const { userLogoutAsGov } = useAuthGovContext();

  useEffect(() => {
    userLogout(); // Call the logout function
    userLogoutAsGov(); // Call the government logout function
    toast.success("Logout successful");
  }, [userLogout, userLogoutAsGov]);

  return <Navigate to="/" />;
};

export default Logout;

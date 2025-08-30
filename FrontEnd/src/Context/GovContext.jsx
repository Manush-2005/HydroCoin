import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthGovContext = createContext();

const AuthGovProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("govhydrozen") || null
  );
  const [loading, setLoading] = useState(false);
  const [government, setGovernment] = useState(""); // Initialize with null to indicate no user initially

  const isLoggedInAsGov = !!token;

  const authorizationToken = `Bearer ${token}`;
  console.log("token", authorizationToken);

  // Store token in Local Storage and update state
  const storeTokenGovInLS = (serverToken) => {
    localStorage.setItem("govhydrozen", serverToken);
    setToken(serverToken);
  };

  // Logout function
  const userLogoutAsGov = () => {
    localStorage.removeItem("govhydrozen");
    setToken(null);
    setGovernment(""); // Clear the user data on logout
  };

  const userAuthentication = async () => {
    if (!token) return; // Skip if no token is available
    try {
      setLoading(true); // Set loading to true while fetching user data
      const res = await axios.get("http://localhost:8000/government", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      const governmentInfo = res.data;
      setLoading(false); // Set loading to false after fetching user data
      setGovernment(governmentInfo.governmentData); // Update government state
      // console.log("government data:", governmentInfo.governmentData);
    } catch (error) {
      console.error("Can't fetch government data:", error);
      userLogoutAsGov(); // Logout if authentication fails
    }
  };

  // Effect to fetch user data whenever the token changes
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  // Effect to sync token with localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("govhydrozen");
    setToken(storedToken);
  }, []);

  return (
    <AuthGovContext.Provider
      value={{
        government,
        token,
        isLoggedInAsGov,
        authorizationToken,
        storeTokenGovInLS,
        loading,
        userLogoutAsGov,
      }}
    >
      {children}
    </AuthGovContext.Provider>
  );
};

// Custom hook to use Auth Context
const useAuthGovContext = () => {
  return useContext(AuthGovContext);
};

export { useAuthGovContext, AuthGovProvider };

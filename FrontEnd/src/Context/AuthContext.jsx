import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("hydrogen") || null);
  const [loading, setLoading] = useState(false);
  const [producer, setProducer] = useState(""); // Initialize with null to indicate no user initially

  const isLoggedInAsPro = !!token;

  const authorizationToken = `Bearer ${token}`;
  console.log("token", authorizationToken);

  // Store token in Local Storage and update state
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("hydrogen", serverToken);
    setToken(serverToken);
  };

  // Logout function
  const userLogout = () => {
    localStorage.removeItem("hydrogen");
    setToken(null);
    setProducer(""); // Clear the user data on logout
  };

  const userAuthentication = async () => {
    if (!token) return; // Skip if no token is available
    try {
      setLoading(true); // Set loading to true while fetching user data
      const res = await axios.get("http://localhost:8000/producer", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      const producerInfo = res.data;
      setLoading(false); // Set loading to false after fetching user data
      setProducer(producerInfo.producerData); // Update producer state
      console.log("producer data:", producerInfo.producerData);
    } catch (error) {
      console.error("Can't fetch producer data:", error);
      userLogout(); // Logout if authentication fails
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
    const storedToken = localStorage.getItem("hydrogen");
    setToken(storedToken);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        producer,
        token,
        isLoggedInAsPro,
        authorizationToken,
        storeTokenInLS,
        loading,
        userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };

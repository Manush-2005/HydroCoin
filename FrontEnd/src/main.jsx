import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { AuthGovProvider } from "./Context/GovContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuthGovProvider>
          <App />
        </AuthGovProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

import { Routes, Route, Navigate } from "react-router-dom";
// import LandingPage from "./pages/LandingPage"
import { Toaster } from "react-hot-toast";
import LayOut from "./pages/LayOut";
import Register from "./Auth/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/producer/Dashboard";
import History from "./pages/producer/History";
import PendingRequests from "./pages/buyers/PendingRequests";
import ApprovedRequests from "./pages/buyers/ApprovedRequests";
import TradeDashboard from "./pages/Trading/DashBoard";
import Trade from "./pages/Trading/Trade";
import PurchaseModal from "./pages/Trading/Purchase";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import PrivateRoute from "./Private/PrivateRoute";
import GovRegister from "./Auth/GovRegister";
import ProducerLayOut from "./pages/ProducerLayout";
import { useAuthContext } from "./Context/AuthContext";
import GovLayout from "./pages/buyers/GovLayout";
import LoginAlert from "./components/LoginAlert";
import { useAuthGovContext } from "./Context/GovContext";

function App() {
  const { producer } = useAuthContext();
  const { government, isLoggedInAsGov } = useAuthGovContext();
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/register/producer" element={<Register />} />
        <Route exact path="/register/government" element={<GovRegister />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />

        {/* gov register */}
        <Route
          path="/producer"
          element={
            producer?.role === "Producer" ? <ProducerLayOut /> : <LoginAlert />
          }
        >
          <Route
            path="trading/dashboard"
            element={
              <>
                <PrivateRoute>
                  <TradeDashboard />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="trading/trade"
            element={
              <>
                <PrivateRoute>
                  <Trade />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="dashboard"
            element={
              <>
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="history"
            element={
              <>
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              </>
            }
          />
        </Route>

        <Route
          path="/government"
          element={
            government?.role === "central" && isLoggedInAsGov ? <GovLayout /> : <LoginAlert />
          }
        >
          <Route path="approved-requests" element={<ApprovedRequests />} />
          <Route path="pending-requests" element={<PendingRequests />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

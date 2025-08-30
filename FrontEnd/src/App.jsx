import { Routes, Route } from "react-router-dom"
// import LandingPage from "./pages/LandingPage"
import { Toaster } from "react-hot-toast"
import LayOut from "./pages/LayOut"
import Register from "./Auth/Register";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";

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

function App() {
  return (
    <>
      <Toaster />
      <Routes>

        <Route path="/" element={<LayOut />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route exact path="/register" element={<Register />} />
      
       
        <Route path="/trading/dashboard" element={<TradeDashboard />} /> 
        <Route path="/trading/trade" element={<Trade />} /> 
     
        <Route path="/" element={<PurchaseModal/>}/>

        <Route exact path="/register/producer" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />

        {/* gov register */}

        <Route exact path="/register/government" element={<GovRegister />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/producer/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/producer/history" element={<History />} />

        <Route path="/buyer/approved-requests" element={<ApprovedRequests />} />
        <Route path="/buyer/pending-requests" element={<PendingRequests />} />
      </Routes>
    </>
  );
}

export default App;

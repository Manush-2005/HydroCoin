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


function App() {
  return (
    <>
      <Toaster />
      <Routes>

        <Route path="/" element={<LayOut />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route exact path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/producer/dashboard" element={<Dashboard />} />
        <Route path="/producer/history" element={<History />} />          
        <Route path="/trading/dashboard" element={<TradeDashboard />} /> 
        <Route path="/trading/trade" element={<Trade />} /> 
        <Route path="/buyer/approved-requests" element={<ApprovedRequests />} />
        <Route path="/buyer/pending-requests" element={<PendingRequests />} />
        <Route path="/" element={<PurchaseModal/>}/>
      </Routes>
    </>
  );
}

export default App;

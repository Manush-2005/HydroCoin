import { Routes, Route } from "react-router-dom"
// import LandingPage from "./pages/LandingPage"
import { Toaster } from "react-hot-toast"
import LayOut from "./pages/LayOut"
import Register from "./Auth/Register";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/producer/History";
import Form from "./pages/producer/Form";
import PendingRequests from "./pages/buyers/PendingRequests";
import ApprovedRequests from "./pages/buyers/ApprovedRequests";

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
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/producer/dashboard" element={<Dashboard />} />
        <Route path="/producer/history" element={<History />} />
        <Route path="/producer/form" element={<Form />} />
          
        <Route path="/producer/dashboard" element={<Form />} />
        <Route path="/buyer/approved-requests" element={<ApprovedRequests />} />
        <Route path="/buyer/pending-requests" element={<PendingRequests />} />
      </Routes>
    </>
  );
}

export default App;

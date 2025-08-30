import { Routes, Route } from "react-router-dom"
// import LandingPage from "./pages/LandingPage"
import { Toaster } from "react-hot-toast"
import LayOut from "./pages/LayOut"
import Register from "./Auth/Register";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
// import ProducerDashboard from "./pages/producer/Form";
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
        <Route path="/about" element={<About />} />
        <Route path="/producer/dashboard" element={<Form />} />
        <Route path="/buyer/approved-requests" element={<ApprovedRequests />} />
        <Route path="/buyer/pending-requests" element={<PendingRequests />} />
      </Routes>
    </>
  );
}

export default App;

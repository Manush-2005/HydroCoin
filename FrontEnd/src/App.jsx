import { Routes, Route } from "react-router-dom"
// import LandingPage from "./pages/LandingPage"
import { Toaster } from "react-hot-toast"
import LayOut from "./pages/LayOut"
import Register from "./Auth/Register";
import Home from "./pages/Home";
// import About from "./pages/About";
// import ProducerDashboard from "./pages/producer/Form";
import Form from "./pages/producer/Form";
import BuyerDashboard from "./pages/buyers/Dashboard";
import AboutUs from "./pages/AboutUs";
// import ProducerDashboard from "./pages/producer/Table";
import Dashboard from "./pages/producer/History";

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
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
      </Routes>
    </>
  );
}

export default App;

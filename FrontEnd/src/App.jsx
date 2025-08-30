import { Routes, Route } from "react-router-dom"
// import LandingPage from "./pages/LandingPage"
import { Toaster } from "react-hot-toast"
import LayOut from "./pages/LayOut"
import Register from "./Auth/Register";
import Home from "./pages/Home";
import About from "./pages/About";
// import ProducerDashboard from "./pages/producer/Form";
import Form from "./pages/producer/Form";
import BuyerDashboard from "./pages/buyers/Dashboard";

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
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
      </Routes>
    </>
  );
}

export default App;

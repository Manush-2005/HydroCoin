import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Register from "./Auth/Register";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

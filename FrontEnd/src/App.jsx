import { Routes, Route  } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { Toaster } from "react-hot-toast"
function App() {

  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { Toaster } from "react-hot-toast"
import LayOut from "./pages/LayOut"
function App() {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

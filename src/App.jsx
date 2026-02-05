import { Routes, Route } from "react-router"
import Auth from "./pages/Auth"
import Home from "./pages/Home"

function App() {
  return (
    <Routes>
      <Route index element={<Auth />} />
      <Route path="/home" element={<Auth />} />
    </Routes>
  )
}

export default App

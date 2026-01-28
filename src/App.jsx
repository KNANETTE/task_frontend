import { Routes, Route } from "react-router"
import Login from "./Login"
import Register from "./Register"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App

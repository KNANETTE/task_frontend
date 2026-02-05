import { Routes, Route } from "react-router"
// import Login from "./Login"
// import Register from "./Register"
import Auth from "./pages/Auth"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  )
}

export default App

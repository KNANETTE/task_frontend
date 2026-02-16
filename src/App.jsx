import { Route, Routes } from "react-router"
import AuthGate from "./components/AuthGate"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <AuthGate>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </AuthGate>
  )
}

export default App

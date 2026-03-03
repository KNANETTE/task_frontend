import { Route, Routes } from "react-router"
import AuthGate from "./components/AuthGate"
import About from "./pages/About"
import Auth from "./pages/Auth"
import Board from "./pages/Board"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Workspace from "./pages/Workspace"


function App() {
  return (
    <AuthGate>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/boards/:id" element={<Board />} />
        <Route path="/workspaces/:id" element={<Workspace />} />
      </Routes>
    </AuthGate>
  )
}

export default App

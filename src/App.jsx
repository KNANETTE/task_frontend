import { Route, Routes } from "react-router"
import AuthGate from "./components/AuthGate"
import About from "./pages/About"
import Auth from "./pages/Auth"
import Board from "./pages/Board"
import Workspaces from "./pages/Workspaces"
import Profile from "./pages/Profile"
import Workspace from "./pages/Workspace"


function App() {
  return (
    <AuthGate>
      <Routes>
        <Route index element={<Workspaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/:id" element={<Workspace />} />
        <Route path="/:boards/:id" element={<Board />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthGate>
  )
}

export default App

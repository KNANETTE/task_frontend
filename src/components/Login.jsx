import { useState } from "react"
import { useNavigate } from "react-router"
import { login } from "../services/authServices"

export default function Login() {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const res = await login(identifier, password)
            const data = await res.json()

            if (!res.ok) {
                setError(data.error?.message || "Identifiants incorrects")
                return
            }

            localStorage.setItem("token", data.jwt)
            localStorage.setItem("userid", data.user.id)
            localStorage.setItem("useremail", data.user.email)
            localStorage.setItem("username", data.user.username)
            navigate("/")
        } catch (err) {
            setError("Impossible de contacter le serveur")
        }
    }

    return (
        <>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-icon">👤</div>
                    <h2 className="auth-title">Connexion</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>username / Email</label>
                            <div className="input-box">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    placeholder="john.doh@xyz.com"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Mot de passe</label>
                            <div className="input-box">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    placeholder="------------"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </>

    )
}

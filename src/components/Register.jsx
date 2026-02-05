import { useState } from "react"
import { useNavigate } from "react-router"

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const res = await fetch("http://localhost:1337/api/auth/local/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error?.message || "Une erreur est survenue")
                return
            }

            navigate("/login")

        } catch (err) {
            setError("Impossible de contacter le serveur")
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">

                <div className="auth-icon">👤</div>
                <h2 className="auth-title">Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Username</label>
                        <div className="input-box">
                            <span className="input-icon">👤</span>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <div className="input-box">
                            <span className="input-icon">📧</span>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-box">
                            <span className="input-icon">🔒</span>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>

                </form>

                {error && <p className="error-message">{error}</p>}

            </div>
        </div>
    )
}

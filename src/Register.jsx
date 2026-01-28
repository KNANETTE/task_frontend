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
        <div>
            <h2>Inscription</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Créer un compte</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

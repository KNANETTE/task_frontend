import { useState } from "react"
import { useNavigate } from "react-router"

export default function Login() {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const res = await fetch("http://localhost:1337/api/auth/local", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    identifier,
                    password
                })
            })
            //
            const data = await res.json()

            if (!res.ok) {
                setError(data.error?.message || "Identifiants incorrects")
                return
            }

            localStorage.setItem("token", data.jwt)

            navigate("/")
        } catch (err) {
            setError("Impossible de contacter le serveur")
        }
    }

    return (
        <div>
            <h2>Connexion</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email ou nom d'utilisateur"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Se connecter</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

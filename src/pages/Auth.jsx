import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import "../styles/auth.css";

export default function Auth() {
    const [mode, setMode] = useState("login")

    return (
        <>
            <div> {mode === "login" ? <Login /> : <Register />}

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    {mode === "login" ? (
                        <p>
                            Vous n'avez pas encore de compte?{" "}
                            <span className="purple-pointer" onClick={() => setMode("register")}>Créez le ici!</span>
                        </p>
                    ) : (
                        <p>
                            Vous avez déjà un compte?{" "}
                            <span className="purple-pointer" onClick={() => setMode("login")}>Connectez vous ici!</span>
                        </p>
                    )}

                </div>
            </div>
        </>
    )
}

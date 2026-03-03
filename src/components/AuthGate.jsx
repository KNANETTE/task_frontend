import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { isLogged } from "../services/authServices";

export default function AuthGate({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    async function checkAuth() {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/auth");
            setLoading(false);
            return;
        }

        const res = await isLogged(token)

        if (!res.ok) {
            localStorage.removeItem("token");
            navigate("/auth");
        }
        setLoading(false);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return loading ? <CircularProgress /> : children
}
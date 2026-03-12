import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from "@mui/material/CircularProgress";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Navbar from "../components/Navbar";
import NotificationToast from "../components/NotificationToast";
import { isLogged, updateUSer } from '../services/authServices';


export default function Profile() {
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({
        id: 0,
        email: "",
        username: "",
        biography: "",
    })
    const [secButVal, setSecButVal] = useState("ACTIVER")
    const [mainButVal, setMainButVal] = useState("ENREGISTRER")
    const [disactivate, setDisactivate] = useState(true)
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState({
        show: false,
        message: "",
        success: false,
    })

    const handleClose = () => { setToast({ ...toast, show: false }) }

    const handleToast = ({ success, message }) => {
        setToast({
            show: true,
            message,
            success,
        })
    }

    const ActivateForm = () => {
        setDisactivate(!disactivate)
        setSecButVal(!disactivate ? "ACTIVER" : "DESACTIVER")
    }

    const getLoggedInUser = async () => {
        try {
            const resp = await isLogged(token)
            const data = await resp.json()
            if (!resp.ok) {
                handleToast({ success: false, message: "Erreur client/serveur" })
                return
            }
            setUser(data)
        } catch (error) {
            handleToast({ success: false, message: "Problème de connexion" })
        }
        setLoading(false)
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        setMainButVal(<CircularProgress color='#000' size={20} />)
        const data = JSON.stringify(user)
        try {
            const resp = await updateUSer(token, user.id, data)
            setMainButVal("ENREGISTRER")
            if (!resp.ok) {
                handleToast({ success: false, message: "Erreur client/serveur" })
                return
            }
            handleToast({ success: true, message: "Profile mise à jour avec succès!" })
        } catch (error) {
            handleToast({ success: false, message: "Problème de connexion" })
        }
    }

    const userForm = (
        <CardContent sx={{ textAlign: "center" }}>
            <Avatar sx={{ width: 80, height: 80, margin: "0 auto", mb: 2 }}>
                {user.username.slice(0, 2).toUpperCase()}
            </Avatar>

            <form onSubmit={updateProfile}>
                <TextField label="Nom d'utilisateur" fullWidth margin="normal" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required disabled={disactivate} />
                <TextField label="Email" fullWidth margin="normal" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required disabled={disactivate} />
                <TextField label="Biography" fullWidth margin="normal" multiline rows={3} value={user.biography} onChange={(e) => setUser({ ...user, biography: e.target.value })} disabled={disactivate} />

                <Button variant="secondary" className="m-2" onClick={ActivateForm}>{secButVal}</Button>
                <Button variant="primary" type="submit" className="m-2" disabled={disactivate}>{mainButVal}</Button>
            </form>
        </CardContent>
    )

    const loadingContent = (
        <CardContent>
            <CircularProgress size={75} />
        </CardContent>
    )

    useEffect(() => { getLoggedInUser() }, [])

    return (
        <Box sx={{ width: "100%" }}>
            <CssBaseline />
            <Navbar />
            <Toolbar />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card sx={{ p: 2 }}>
                    {loading ? loadingContent : userForm}
                </Card>
            </Container>
            <NotificationToast show={toast.show} message={toast.message} success={toast.success} onCLose={handleClose} />
        </Box>
    )
}

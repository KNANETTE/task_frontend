import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Toolbar from "@mui/material/Toolbar"
import CircularProgress from "@mui/material/CircularProgress"
import TextField from "@mui/material/TextField"
import Snackbar from "@mui/material/Snackbar"


export default function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [email, setEmail] = useState(localStorage.getItem("useremail"))
    const [bio, setBio] = useState("")
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)


    const updateProfile = async () => {
        try {
            const token = localStorage.getItem("jwt")

            const response = await fetch(`http://localhost:1337/api/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    username,
                    email,
                    bio
                })
            })

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour")
            }
            setOpen(true)

        } catch (error) {
            console.error(error)
            alert("Impossible de mettre à jour le profil.")
        }
    }

    return (
        <Box sx={{ width: "100%" }}>
            <CssBaseline />
            <Navbar />
            <Toolbar />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card sx={{ p: 2 }}>
                    <CardContent sx={{ textAlign: "center" }}>
                        <Avatar sx={{ width: 80, height: 80, margin: "0 auto", mb: 2 }}>
                            {username.slice(0, 2).toUpperCase()}
                        </Avatar>

                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    
                        </Typography>

                        
                        <TextField
                            label="Nom d'utilisateur"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Bio"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={updateProfile}

                        >
                        
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
    message="Profil mis à jour avec succès !"
/>  
    <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
    message="Profil mis à jour avec succès !"
/>
 </Box>
    )
}

import CircularProgress from '@mui/material/CircularProgress';
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BoardModal from "../components/BoardModal";
import Navbar from "../components/Navbar";
import Spaces from "../components/Spaces";
import NotificationToast from '../components/NotificationToast';
import { getBoards } from '../services/boardServices';

export default function Workspace() {
    const { id } = useParams()
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(true)
    const [workspace, setWorkspace] = useState(null)
    const [toast, setToast] = useState({
        show: false,
        success: false,
        message: ""
    })
    const handleToast = ({ success, message }) => {
        setToast({
            show: true,
            success,
            message
        })
    }
    const handleClose = () => setToast({ ...toast, show: false })

    async function fetchWorkspace(id) {
        const response = await getBoards(token, id)
        const data = await response.json()
        try {
            if (!response.ok) {
                handleToast({ success: false, message: "Erreur client/server" })
                console.error(response)
                return
            }
            setLoading(false)
            setWorkspace(data.data)
        } catch (error) {
            handleToast({ success: false, message: "Problème de connexion" })
            console.error(error)
        }
    }

    useEffect(() => { fetchWorkspace(id) }, [id, token])
    if (loading) return <CircularProgress />
    return (
        <>
            <Toolbar sx={{ margin: "0.5rem" }} />
            <Navbar />

            <div className="d-flex flex-column gap-2">
                <h1>{workspace.title}</h1>
                <BoardModal onResult={handleToast} onCreated={fetchWorkspace} />
                <NotificationToast show={toast.show} message={toast.message} onCLose={handleClose} success={toast.success} />
                <Divider sx={{ margin: "1rem" }} />
            </div>
            <Typography variant="h5" align="center" color="secondary">VOS PROJETS</Typography>
            <Spaces content={workspace.boards} onDelete={fetchWorkspace} onResult={handleToast} workspace={id} />
        </>
    )
}

import CircularProgress from '@mui/material/CircularProgress';
import Divider from "@mui/material/Divider";
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WorkspaceModal from '../components/WorkspaceModal';
import NotificationToast from '../components/NotificationToast';
import { getWorkspaces } from '../services/workspaceServices';
import Spaces from '../components/Spaces';

export default function Workspaces() {
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState([])
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

    async function fetchWorkspaces() {
        try {
            const response = await getWorkspaces(token)
            const data = await response.json()

            if (!response.ok) {
                handleToast({ success: false, message: "Une erreur client/server s'est produite, veuillez réessayer plus tard." })
                console.error(response)
                return
            }
            setContent(data.workspaces)
            setLoading(false)
        } catch (err) {
            handleToast({ success: false, message: "Une erreur server s'est produite, veuillez réessayer plus tard." })
            console.error(err)
        }
    }

    useEffect(() => { fetchWorkspaces() }, [token])
    if (loading) return <CircularProgress />
    return (
        <>
            <Toolbar sx={{ margin: "0.5rem" }} />
            <Navbar />
            <div className="d-flex flex-column gap-2">
                <WorkspaceModal OnResult={handleToast} onCreated={fetchWorkspaces} />
                <NotificationToast show={toast.show} message={toast.message} onCLose={handleClose} success={toast.success} />
                <Divider sx={{ margin: "1rem" }} />
            </div>
            <Typography variant="h5" align="center" color="secondary">VOS ESPACES 🌌</Typography>
            <Spaces content={content} onDelete={fetchWorkspaces} onResult={handleToast} />
        </>
    )
}

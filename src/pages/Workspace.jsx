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
import Box from '@mui/material/Box';
import WorkspaceModal from "../components/WorkspaceModal"

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

    async function fetchWorkspace() {
        const response = await getBoards(token, id)
        const data = await response.json()
        try {
            if (!response.ok) {
                handleToast({ success: false, message: "Erreur client/server" })
                return
            }
            setLoading(false)
            setWorkspace(data.data)
        } catch (error) {
            handleToast({ success: false, message: "Problème de connexion" })
        }
    }

    useEffect(() => { fetchWorkspace() }, [id, token])
    if (loading) return <CircularProgress />
    return (
        <>
            <Navbar />
            <Box sx={{ background: workspace.background, color: "#363636", p: 3 }}>
                <Toolbar sx={{ margin: "0.5rem" }} />
                <Box className="d-flex justify-content-evenly m-2">
                    <Typography variant='h3'>{workspace.title}</Typography>
                    <Box className="d-flex">
                        <WorkspaceModal content={workspace} onCreated={fetchWorkspace} onResult={handleToast} />
                        <BoardModal onResult={handleToast} onCreated={fetchWorkspace} />
                    </Box>
                </Box>
                <Typography>{workspace.description}</Typography>
            </Box>
            <Spaces content={workspace.boards} onDelete={fetchWorkspace} onResult={handleToast} workspace={id} />
        </>
    )
}

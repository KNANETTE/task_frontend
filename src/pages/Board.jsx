import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Divider from "@mui/material/Divider"
import Toolbar from "@mui/material/Toolbar"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import BoardList from "../components/BoardList"
import CreateList from "../components/CreateList"
import Navbar from "../components/Navbar"
import NotificationToast from "../components/NotificationToast"
import { getLists } from "../services/listServices"

export default function Boards() {
    const { bid } = useParams()
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState({
        show: false,
        message: "",
        success: false,
    })
    const [board, setBoard] = useState(null)
    const handleToast = ({ success, message }) => {
        setToast({
            show: true,
            message,
            success
        })
    }
    const handleClose = () => { setToast({ ...toast, show: false }) }

    async function fetchBoard(id) {
        try {
            const res = await getLists(token, id)
            const resData = await res.json()
            setLoading(false)

            if (!res.ok) {
                handleToast({ success: false, message: "Erreur client/serveur" })
                console.error(res)
                return
            }

            setBoard(resData.data)
        } catch (error) {
            handleToast({ success: false, message: "Problème de connexion!" })
            console.error(error)
            setLoading(false)
        }
    }

    useEffect(() => { fetchBoard(bid) }, [bid])


    if (loading) return <CircularProgress />
    return (
        <>
            <Navbar />
            <Toolbar sx={{ margin: "0.5rem" }} />
            <h1>{board.title}</h1>
            <Divider />
            <Box className="horizontal-scrollbar">
                {board.lists.map(list => <BoardList key={list.id} content={list} onDeleted={fetchBoard} onResult={handleToast} />)}
                <CreateList order={board.lists.length} onCreated={fetchBoard} onResult={handleToast} />
            </Box>
            <NotificationToast show={toast.show} message={toast.message} success={toast.success} onCLose={handleClose} />
        </>
    )
}
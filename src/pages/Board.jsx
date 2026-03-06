import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Toolbar from "@mui/material/Toolbar"
import Navbar from "../components/Navbar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import BoardLists from "../components/BoardLists"
import { getLists } from "../services/listServices"
import CircularProgress from "@mui/material/CircularProgress"
import NotificationToast from "../components/NotificationToast"
import CreateList from "../components/CreateList"

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

            if (!res.ok) {
                console.error(res)
                setLoading(false)
                return
            }

            setBoard(resData.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
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
                <BoardLists content={board.lists} onDelete={fetchBoard} onResult={handleToast} />
                <CreateList order={board.lists.length} onCreated={fetchBoard} onResult={handleToast}></CreateList>
            </Box>
            <NotificationToast show={toast.show} message={toast.message} success={toast.success} onCLose={handleClose} />
        </>
    )
}
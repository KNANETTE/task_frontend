import { useParams } from "react-router"
import { getBoard } from "../services/boardServices"
import { useEffect, useState } from "react"
import Toolbar from "@mui/material/Toolbar"
import Navbar from "../components/Navbar"
import { border } from "@mui/system"

export default function Boards() {
    const { id } = useParams()
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [board, setBoard] = useState(null)

    async function fetchBoard(id) {
        const res = await getBoard(token, id)

        if (!res.ok) {
            setError("Something went wrong!!!")
            setLoading(false)
            return
        }

        const resData = await res.json()
        setBoard(resData.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchBoard(id)
    }, [id])

    if (loading) return <h3>LOADING...</h3>
    return (
        <>
            <Navbar />
            <Toolbar sx={{ margin: "0.5rem" }} />
            <h1>{board.title}</h1>
        </>
    )
}
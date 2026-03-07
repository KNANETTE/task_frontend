import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getCards } from "../services/cardServices";
import CreateCard from "./CreateCard";
import ListCard from "./ListCard";

export default function ListCards({ id, onResult }) {
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(true)
    const [cards, setCards] = useState([])

    const fetchCards = async () => {
        try {
            const resp = await getCards(token, id)
            const data = await resp.json()
            setLoading(false)

            if (!resp.ok) {
                onResult({ success: false, message: "Erreur client/serveur!" })
                console.error(resp)
                return
            }

            setCards(data.data.cards)
        } catch (e) {
            onResult({ success: false, message: "Problème de connexion!" })
            console.error(e)
            setLoading(false)
        }
    }

    useEffect(() => { fetchCards() }, [id])
    if (loading) return <CircularProgress />
    return (
        <CardContent>
            <ListGroup className="gap-3">
                {cards.map((card) => (<ListCard key={card.id} content={card} onDeleted={fetchCards} onResult={onResult} />))}
            </ListGroup>
            <CreateCard id={id} order={cards.length} onResult={onResult} onCreated={fetchCards} />
        </CardContent>
    )
}
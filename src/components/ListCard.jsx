import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Delete } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { deleteCard } from "../services/cardServices";
import CardModal from "./CardModal";
import { useState } from "react";

export default function ListCard({ card, labels, onDeleted, onResult }) {
    const token = localStorage.getItem("token")
    const [show, setShow] = useState(false)
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: `${card.id}`,
        animateLayoutChanges: (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true })
    })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    }
    const handleDelete = async () => {
        try {
            const resp = await deleteCard(token, content.documentId)
            if (!resp.ok) {
                onResult({ success: false, message: "Erreur client/serveur" })
                console.error(resp)
                return
            }

            onDeleted()
            onResult({ success: true, message: "Suppression de la tâche" })
        } catch (error) {
            onResult({ success: false, message: "Problème de connexion!" })
            console.error(error)
        }
    }
    const handleShow = () => setShow(!show)
    return (
        <ListGroupItem
            ref={setNodeRef}
            style={style}
            {...attributes}
            // onClick={handleShow}
            className="d-flex justify-content-between align-items-center"
        >
            <Button onClick={handleShow} {...listeners} sx={{ width: "80%" }} className="truncate-3 text-dark">{card.content}</Button>
            <Button className="text-danger" onClick={handleDelete}><Delete /></Button>
            <CardModal show={show} handleShow={handleShow} content={card} labels={labels} onRequest={onDeleted} onResult={onResult} />
        </ListGroupItem>
    )
}

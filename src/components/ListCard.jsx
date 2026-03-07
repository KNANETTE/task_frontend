import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { deleteCard } from "../services/cardServices";

export default function ListCard({ content, onDeleted, onResult }) {
    const token = localStorage.getItem("token")
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
    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center truncate-3">
            {content.content}
            <Button className="text-danger" onClick={handleDelete}><Delete /></Button>
        </ListGroupItem>
    )
}
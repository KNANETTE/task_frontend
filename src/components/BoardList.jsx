import { Delete, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { deleteList } from "../services/listServices";
import ListCards from "./ListCards";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";

export default function BoardList({ content, onDeleted, onResult }) {
    const token = localStorage.getItem("token")
    const { bid } = useParams()
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: content.order })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        minWidth: 340,
        background: "#eee",
        height: "fit-content",
    }
    const handleDelete = async () => {
        try {
            const resp = await deleteList(token, content.documentId)
            if (!resp.ok) {
                onResult({ success: false, message: "Erreur client/server" })
                console.error(resp)
                return
            }
            onDeleted(bid)
            onResult({ success: true, message: "Liste supprimée!" })
        } catch (error) {
            onResult({ success: false, message: "Problème de connexion" })
            console.error(e)
        }
    }
    const handleUpdate = async()=>{}
    return (
        <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <CardContent sx={{ fontWeight: "bold", fontSize: "large" }} className="d-flex justify-content-between">
                {content.title}
                <Box className="d-flex justify-content-evenly align-items-start" sx={{ width: "30%" }}>
                    <Button className="text-secondary" style={{ background: "#0000", border: 0 }}><Edit /></Button>
                    <Button className="text-danger" onClick={handleDelete} style={{ background: "#0000", border: 0 }}><Delete /></Button>
                </Box>
            </CardContent>
            <ListCards id={content.documentId} onResult={onResult} />
        </Card>
    )
}
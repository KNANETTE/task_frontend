import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Delete, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";
import { deleteList, updateList } from "../services/listServices";
import CreateCard from "./CreateCard";
import ListCard from "./ListCard";
import ListCards from "./ListCards";

export default function BoardList({ list, cards, labels, onRequest, onResult }) {
    const token = localStorage.getItem("token")
    const [title, setTitle] = useState(list.title)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: `list-${list.order}` })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        minWidth: 340,
        background: "#eee",
        height: "fit-content",
    }
    const handleDelete = async () => {
        try {
            const resp = await deleteList(token, list.documentId)
            if (!resp.ok) {
                onResult({ success: false, message: "Erreur client/server" })
                return
            }
            onRequest()
            onResult({ success: true, message: "Liste supprimée!" })
        } catch (error) {
            onResult({ success: false, message: "Problème de connexion" })
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = JSON.stringify({ data: { title } })
        try {
            const resp = await updateList(token, list.documentId, data)
            if (!resp.ok) {
                onResult({ success: false, message: "Erreur" })
                return
            }
            onRequest()
            onResult({ success: true, message: "Modification enregistrée" })
            setOpen(!open)
        } catch (error) {
            onResult({ success: false, message: "Problème de connexion" })
        }
        setLoading(false)
    }
    const titleField = (
        <Form onSubmit={handleUpdate} className="d-flex flex-column gap-2">
            <FormControl type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} required />
            <Box className="d-flex justify-content-evenly">
                <Button variant="secondary" onClick={() => setOpen(!open)}>Annuler</Button>
                <Button disabled={loading} type="submit">{loading ? <CircularProgress size={20} color="#000" /> : "Enregistrer"}</Button>
            </Box>
        </Form>
    )

    return (
        <Card ref={setNodeRef} style={style} {...attributes}>
            {!open ? (
                <CardContent sx={{ fontSize: "large" }} className="d-flex justify-content-between">
                    <Box {...listeners} sx={{ width: "75%", display: "flex", alignItems: "center" }}>
                        <Typography variant="h6">{list.title}</Typography>
                    </Box>
                    <Box className="d-flex justify-content-evenly align-items-start">
                        <Button variant="outline-none text-secondary" onClick={() => setOpen(!open)}><Edit /></Button>
                        <Button variant="outline-none text-danger" onClick={handleDelete}><Delete /></Button>
                    </Box>
                </CardContent>
            ) : (
                <CardContent>
                    {titleField}
                </CardContent>
            )}
            <ListCards listOrder={list.order} >
                <CardContent>
                    <SortableContext items={cards.map(card => `${card.id}`)} strategy={verticalListSortingStrategy}>
                        {cards.map(card => <ListCard key={card.id} card={card} labels={labels} onDeleted={onRequest} onResult={onResult} />)}
                    </SortableContext>
                    <CreateCard id={list.documentId} order={cards.length} onResult={onResult} onCreated={onRequest} />
                </CardContent>
            </ListCards>
        </Card>
    )
}

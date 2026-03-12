import { Add } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/esm/FormControl";
import { createCard } from "../services/cardServices";

export default function CreateCard({ id, order, onResult, onCreated }) {
    const token = localStorage.getItem("token")
    const [clicked, setClicked] = useState(false)
    const [content, setContent] = useState("")
    const handleClicked = () => { setClicked(!clicked) }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newCard = JSON.stringify({
            data: {
                order,
                content,
                list: id
            }
        })
        try {
            const resp = await createCard(token, newCard)
            if (!resp.ok) {
                onResult({ success: false, message: "Erreur client / server" })
                return
            }
            onCreated()
            onResult({ success: true, message: "Tâche ajoutée!" })
            handleClicked()
            setContent("")
        } catch (error) {
            onResult({ success: false, message: "Problème de connexion!" })
        }
    }

    const addButton = (<Button onClick={handleClicked} variant="outline-none text-primary"><Add /></Button>)
    const addForm = (
        <Box className="pt-3">
            <Form onSubmit={handleSubmit}>
                <FormControl as="textarea" value={content} onChange={(e) => { setContent(e.target.value) }} />
                <Box className="d-flex w-100 justify-content-evenly mt-3">
                    <Button variant="secondary" onClick={handleClicked}>Annuler</Button>
                    <Button variant="primary" type="submit">Créer</Button>
                </Box>
            </Form>
        </Box>
    )
    if (!clicked) return addButton
    return addForm
}
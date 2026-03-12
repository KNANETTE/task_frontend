import { useState } from "react";
import { createLabel } from "../services/labelServices";
import { Button, Form, FormLabel, FormControl, InputGroup } from "react-bootstrap";
import { Add, Close, Check } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function CreateLabel({ onResult, onRequest }) {
    const token = localStorage.getItem("token")
    const [clicked, setClicked] = useState(false)
    const [label, setLabel] = useState({ title: "", background: "#48b948" })

    function handleClicked() { setClicked(!clicked) }

    function cleanLabel() { setLabel({ ...label, title: "" }) }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = JSON.stringify({ data: label })
        try {
            const resp = await createLabel(token, data)
            if (!resp.ok) {
                console.error(resp)
                onResult({ success: false, message: "Erreur client/serveur" })
                return
            }
        } catch (error) {
            console.error(error),
                onResult({ success: false, message: "Problème de connexion" })
        }
        onRequest()
        cleanLabel()
        onResult({ success: true, message: "Label créé!" })
    }

    const addButton = (
        <Button onClick={handleClicked} variant="outline-none" className="text-primary d-flex gap-2 align-items-center">
            <Add /> Créez un nouveau label ici!
        </Button>
    )
    const addForm = (
        <Box className="pt-3">
            <Form onSubmit={handleSubmit} className="d-flex align-items-start">
                <InputGroup>
                    <FormControl type="text" value={label.title} onChange={(e) => setLabel({ ...label, title: e.target.value })} required />
                    <FormControl type="color" value={label.background} onChange={(e) => setLabel({ ...label, background: e.target.value })} required />
                </InputGroup>
                <Button variant="ouline-none text-danger" onClick={handleClicked}> <Close /> </Button>
                <Button variant="ouline-none text-success" onClick={handleSubmit}> <Check /> </Button>
            </Form>
        </Box>
    )

    if (!clicked) return addButton
    return addForm
}
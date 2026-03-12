import { Label as LabelIcon, ShortText } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { Button, Col, Form, FormControl, FormLabel, Modal, ModalBody, ModalHeader, Row, } from 'react-bootstrap';
import { updateCard } from "../services/cardServices";
import CreateLabel from "./CreateLabel";
import Label from "./Label";
import { updateLabel } from "../services/labelServices";

export default function CardModal({ show, handleShow, content, labels, onRequest, onResult }) {
    const [card, setCard] = useState(content)
    const [activate, setActivate] = useState(false)
    const token = localStorage.getItem("token")

    function handleActivation() { setActivate(!activate) }

    async function handleUpdateContent(e) {
        setCard({ ...card, content: e.target.value })
        if (!card.content) return
        const data = JSON.stringify({ data: { content: card.content } })
        try {
            const resp = await updateCard(token, card.documentId, data)
            if (!resp.ok) {
                console.error(resp)
                onResult({ success: false, message: "Erreur client/serveur" })
                return
            }
        } catch (error) {
            console.error(error)
            onResult({ success: false, message: "Problème de connexion" })
        }
        onRequest()
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = JSON.stringify({ data: { description: card.description } })
        try {
            const resp = await updateCard(token, card.documentId, data)
            if (!resp.ok) {
                console.error(resp)
                onResult({ success: false, message: "Erreur client/serveur" })
                return
            }
        } catch (error) {
            console.error(error)
            onResult({ success: false, message: "PRoblème de connexion" })
        }
        onRequest()
        onResult({ success: true, message: "Description mise à jour!" })
    }

    async function linkLabel(labelId, link) {
        const data = link ?
            JSON.stringify({ data: { cards: { connect: [card.documentId] } } }) :
            JSON.stringify({ data: { cards: { disconnect: [card.documentId] } } })
        try {
            const resp = await updateLabel(token, labelId, data)
            if (!resp.ok)
                onResult({ success: false, message: "Erreur client/serveur" })
        } catch (error) {
            onResult({ success: false, message: "Problème de connexion" })
        }
        onRequest()
    }

    const descForm = (
        <Box sx={{ textAlign: "left" }}>
            <FormControl as="textarea" rows={3} value={card.description || ""} onChange={(e) => setCard({ ...card, description: e.target.value })} />
            <Button style={{ marginTop: "1rem", marginRight: "1rem" }} variant='secondary' onClick={handleActivation}>Annuler</Button>
            <Button style={{ marginTop: "1rem", marginRight: "1rem" }} variant='primary' type="submit">Enregistrer</Button>
        </Box>
    )

    const descButton = (
        <Button variant="outline-secondary d-flex align-items-start truncate-3" onClick={handleActivation} style={{ width: "100%", height: "5rem" }}>
            {card.description || "Ajouter une description plus détaillée..."}
        </Button>
    )

    return (
        <Modal show={show} onHide={handleShow} className="rounded" centered backdrop="static" size="lg">
            <ModalHeader closeButton />
            <ModalBody>
                <Row>
                    <Col md={7} style={{ textAlign: "left" }}>
                        <FormControl type="text" value={card.content} onChange={handleUpdateContent} required style={{ border: 0 }} />
                        <Divider variant="middle" sx={{ mt: 2 }} />
                        <Form onSubmit={handleSubmit}>
                            <FormLabel style={{ textAlign: "left" }}><ShortText /> Description</FormLabel>
                            {activate ? descForm : descButton}
                        </Form>
                    </Col>
                    <Col md={5}>
                        <Box>
                            <Typography className="mb-2 small"> <LabelIcon /> LABELS</Typography>
                            <Divider sx={{ m: 2 }} variant="middle" />
                            <Box className="d-flex gap-1 flex-wrap">
                                {labels.map(label => {
                                    const related = content.labels.find(l => l.documentId === label.documentId)
                                    if (related) return <Label key={label.id} label={label} linkLabel={linkLabel} related />
                                    return <Label key={label.id} label={label} linkLabel={linkLabel} related={false} />
                                })}
                            </Box>
                            <Divider sx={{ m: 2 }} variant="middle" />
                            <CreateLabel onResult={onResult} onRequest={onRequest} />
                        </Box>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}
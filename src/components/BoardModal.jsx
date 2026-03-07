import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router';
import { createBoard } from '../services/boardServices';

export default function BoardModal({ onResult, onCreated }) {
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("")
    const [background, setBackground] = useState("#777777")
    const [description, setDescription] = useState("")
    const token = localStorage.getItem("token")

    const handleOpen = () => setOpen(!open);

    async function handleSubmit() {
        try {
            const boardData = JSON.stringify({
                data: {
                    title: title,
                    background: background,
                    description: description,
                    workspace: id,
                }
            })
            const res = await createBoard(token, boardData)
            if (!res.ok) {
                onResult({ success: false, message: "Une erreur server s'est produite, veuillez réessayer plus tard." })
                console.error(res)
                return
            }
            onCreated(id)
            onResult({ success: true, message: "Noueau board créé!" })
        } catch (error) {
            onResult({ success: false, message: "Une erreur réseau s'est produite, veuillez réessayer plus tard." })
            console.error(error)
        }
        handleOpen()
        setTitle("")
        setDescription("")
    }

    return (
        <>
            <Button variant='warning' onClick={handleOpen} className="d-flex align-self-center justify-content-center justify-self-center">
                <AddIcon />
                <Typography noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Créer un board
                </Typography>
            </Button>
            <Modal show={open} onHide={handleOpen} className="rounded" centered backdrop="static">
                <Modal.Header closeButton />
                <Form className='p-2 gap-1'>
                    <Modal.Body>
                        <Box>
                            <Form.Group controlId='title' className="mb-4">
                                <Form.Label>Titre</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='description' className="mb-4">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='color'>
                                <Form.Label>Couleur d'arrière plan</Form.Label>
                                <Form.Control type="color" value={background} onChange={(e) => setBackground(e.target.value)} style={{
                                    width: "100%",
                                    height: "100px",
                                }} />
                            </Form.Group>
                        </Box>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleOpen}>Annuler</Button>
                        <Button variant='primary' onClick={handleSubmit}>Enregistrer</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
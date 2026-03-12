import { Add, Edit } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router';
import { createBoard, updateBoard } from '../services/boardServices';

export default function BoardModal({ onResult, onCreated, content = null }) {
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(content ? content.title : "")
    const [background, setBackground] = useState(content ? content.background : "#777777")
    const [description, setDescription] = useState(content ? content.description : "")
    const token = localStorage.getItem("token")

    const handleOpen = () => setOpen(!open);

    const button = content ? (
        <Button variant='outline-none' onClick={handleOpen} className="text-secondary ">
            <Edit fontSize='large' />
        </Button>
    ) : (
        <Button variant='outline-none' onClick={handleOpen} className="text-primary fs-3">
            <Add fontSize='large' />
        </Button>
    )

    async function handleSubmit(e) {
        e.preventDefault()
        const boardData = {
            title: title,
            background: background,
            description: description,
            workspace: id,
        }
        const data = JSON.stringify({ data: boardData })
        try {
            const res = !content ?
                await createBoard(token, boardData) :
                await updateBoard(token, content.documentId, data)
            if (!res.ok) {
                onResult({ success: false, message: "Une erreur server s'est produite, veuillez réessayer plus tard." })
                return
            }
            onCreated(content ? content.documentId : id)
            onResult({ success: true, message: "👍🏽" })
        } catch (error) {
            onResult({ success: false, message: "Une erreur réseau s'est produite, veuillez réessayer plus tard." })
        }
        handleOpen()
        setTitle(content ? boardData.title : "")
        setDescription(content ? boardData.description : "")
    }

    return (
        <>
            {button}
            <Modal show={open} onHide={handleOpen} className="rounded" centered backdrop="static">
                <Modal.Header closeButton >
                    <Typography sx={{ fontWeight: "bolder" }}>BOARD</Typography>
                </Modal.Header>
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
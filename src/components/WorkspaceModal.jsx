import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Typography from '@mui/material/Typography';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';
import { createWorkspace } from '../services/workspaceServices';

export default function WorkspaceModal({ OnResult, onCreated }) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [background, setBackground] = useState("#777777")
    const [visibility, setVisibility] = useState(true)
    const [description, setDescription] = useState("")
    const token = localStorage.getItem("token")
    const handleOpen = () => setOpen(!open)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const workspaceData = JSON.stringify({
                data: {
                    title: title,
                    public: visibility,
                    background: background,
                    description: description,
                }
            })
            const res = await createWorkspace(token, workspaceData)
            if (!res.ok) {
                OnResult({ success: false, message: "Une erreur server s'est produite, veuillez réessayer plus tard." })
                console.error(res)
                return
            }
            onCreated()
            OnResult({ success: true, message: "Noueau workspace créé!" })
        } catch (error) {
            OnResult({ success: false, message: "Une erreur réseau s'est produite, veuillez réessayer plus tard." })
            console.error(error)
        }
        handleOpen()
        setTitle("")
        setDescription("")
    }

    return (
        <>
            <Button variant='outline-none' onClick={handleOpen} className="d-flex align-self-center align-items-center gap-2 text-primary">
                <AddIcon fontSize='large'/>
                <Typography noWrap component="div" variant='h5' sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Créer un workspace
                </Typography>
            </Button>
            <Modal show={open} onHide={handleOpen} className="rounded" centered backdrop="static">
                <Modal.Header closeButton />
                <Modal.Body>
                    <Box>
                        <Form className='p-2 gap-1'>
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
                            <Form.Group controlId='visibility' className='d-flex justify-content-center mt-3'>
                                <Form.Check type='switch' label='Public' checked={visibility} onChange={(e) => setVisibility(e.target.checked)} />
                            </Form.Group>
                        </Form>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleOpen}>Annuler</Button>
                    <Button variant='primary' onClick={handleSubmit}>Enregistrer</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
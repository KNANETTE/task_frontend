import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createWorkspace, updateWorkspace } from '../services/workspaceServices';
import { Add, Edit } from '@mui/icons-material';

export default function WorkspaceModal({ onResult, onCreated, content = "" }) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(content ? content.title : "")
    const [visibility, setVisibility] = useState(content ? content.public : true)
    const [background, setBackground] = useState(content ? content.background : "#777777")
    const [description, setDescription] = useState(content ? content.description : "")
    const token = localStorage.getItem("token")
    const handleOpen = () => setOpen(!open)

    const button = content ? (
        <Button variant='outline-none' onClick={handleOpen} className="text-secondary">
            <Edit fontSize='large' />
        </Button>
    ) : (
        <Button variant='outline-none' onClick={handleOpen} className="d-flex center align-items-center gap-2 text-primary">
            <AddIcon fontSize='large' />
            <Typography noWrap component="div" variant='h5' sx={{ display: { xs: 'none', sm: 'block' } }}>
                Créer un workspace
            </Typography>
        </Button>
    )

    async function handleSubmit(e) {
        e.preventDefault()
        const workspaceData = {
            title: title,
            public: visibility,
            background: background,
            description: description,
        }
        const data = JSON.stringify({ data: workspaceData })

        try {
            const res = !content ?
                await createWorkspace(token, data) :
                await updateWorkspace(token, content.documentId, data)
            if (!res.ok) {
                onResult({ success: false, message: "Une erreur server s'est produite, veuillez réessayer plus tard." })
                console.error(res)
                return
            }
            onCreated()
            onResult({ success: true, message: "👍🏽" })
        } catch (error) {
            onResult({ success: false, message: "Une erreur réseau s'est produite, veuillez réessayer plus tard." })
            console.error(error)
        }
        handleOpen()
        setTitle(content ? workspaceData.title : "")
        setDescription(content ? content.description : "")
    }

    return (
        <>
            {button}
            <Modal show={open} onHide={handleOpen} className="rounded" centered backdrop="static">
                <Modal.Header closeButton >
                    <Typography sx={{fontWeight:"bolder"}}>WORKSPACE</Typography>
                </Modal.Header>
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
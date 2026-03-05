// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import AddIcon from '@mui/icons-material/Add';
// import TextField from '@mui/material/TextField';
// import FormGroup from '@mui/material/FormGroup';
import { createBoard } from '../services/boardServices';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Typography from '@mui/material/Typography';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { createWorkspace } from '../services/workspaceServices';
// import { useNavigate } from 'react-router';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BoardModal({ onResult, onCreated }) {
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("")
    const [background, setBackground] = useState("#777777")
    const [description, setDescription] = useState("")
    const token = localStorage.getItem("token")

    const handleOpen = () => setOpen(!open);

    async function handleSubmit() {
        // console.log("ok")
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
                        </Form>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleOpen}>Annuler</Button>
                    <Button variant='primary' onClick={handleSubmit}>Enregistrer</Button>
                </Modal.Footer>
            </Modal>
            {/* <Button variant="contained" color='warning' startIcon={<AddIcon />} onClick={handleOpen}>
                <Typography noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Créer un tableau
                </Typography>
            </Button>
            <Modal open={open} onClose={handleOpen} aria-labelledby="modal-new-board">
                <Box sx={style}>
                    <Typography id="modal-new-board" variant="h6" component="h2">
                        Un nouveau tableau ?
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <TextField id="title" value={title} label="Titre" variant="standard" name="title" onChange={(e) => setTitle(e.target.value)} />
                            <label htmlFor="bg-color">Arrière plan</label>
                            <input type="color" value={background} name="background" id="background" onChange={(e) => setBackground(e.target.value)} />
                            <Button type='submit'>CREER</Button>
                        </FormGroup>
                    </form>
                </Box>
            </Modal> */}
        </>
    );
}
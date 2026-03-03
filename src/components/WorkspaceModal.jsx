import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { createWorkspace } from '../services/workspaceServices';
import { useNavigate } from 'react-router';

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

export default function WorkspaceModal() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null)
    const [title, setTitle] = useState("")
    const [background, setBackground] = useState("#777777")
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("userid")
    const navigate = useNavigate()

    const handleOpen = () => setOpen(!open);

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)

        try {
            const workspaceData = JSON.stringify({
                data: {
                    title: title,
                    background: background,
                    // user: user
                }
            })
            const res = await createWorkspace(token, workspaceData)
            if (!res.ok) {
                setError("something went wrong")
                console.error(res)
                return
            }
            const data = await res.json()
            navigate(`/workspaces/${data.data.documentId}`)

        } catch (error) {
            setError("something went wrong")
            console.error(error)
        }
    }

    return (
        <>
            <Button variant="contained" color='warning' startIcon={<AddIcon />} onClick={handleOpen}>
                <Typography noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Créer un espace de travail
                </Typography>
            </Button>
            <Modal open={open} onClose={handleOpen} aria-labelledby="modal-new-workspace">
                <Box sx={style}>
                    <Typography id="modal-new-workspace" variant="h6" component="h2">
                        Un nouvel espace de travail ?
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
            </Modal>
        </>
    );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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

export default function BoardModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Button variant="contained" color='warning' startIcon={<AddIcon />} onClick={handleOpen}>
                <Typography noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Créer un tableau
                </Typography>
            </Button>
            <Modal open={open} onClose={handleOpen} aria-labelledby="modal-new-board">
                <Box sx={style}>
                    <Typography id="modal-new-board" variant="h6" component="h2">
                        Un nouveau tableau ?
                    </Typography>
                    <FormGroup onSubmit={handleSubmit}>
                        <TextField id="title" label="Titre" variant="standard" />
                        <label htmlFor="bg-color">Arrière plan</label>
                        <input type="color" name="bg-color" id="bg-color" />
                        <Button type='submit'>CREER</Button>
                    </FormGroup>
                    <form onSubmit={handleSubmit}>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
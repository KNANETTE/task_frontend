import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import { deleteWorkspace } from '../services/workspaceServices';
import { deleteBoard } from '../services/boardServices';
import { useParams } from 'react-router';

export default function Space({ content, url, onDelete, onResult, workspace = true }) {
    const token = localStorage.getItem("token")
    const { id } = useParams()
    const handleDelete = async () => {
        try {
            const resp = workspace ?
                await deleteWorkspace(token, content.documentId) :
                await deleteBoard(token, content.documentId)
            const data = await resp.json()
            if (!resp.ok) {
                onResult({ success: false, message: "Erreur client/server" })
                console.error(resp)
                console.error(data)
                return
            }
        } catch (error) {
            onResult({ success: false, message: "Problème de réseaux" })
        }
        onDelete(id)
        onResult({ success: true, message: "Suppression effectuée!" })
    }

    return (
        <Card sx={{ height: 300, maxWidth: 275 }}>
            <CardActions className='d-flex flex-row-reverse'>
                <Button variant='danger' color='white' onClick={handleDelete}><DeleteIcon /></Button>
            </CardActions>
            <CardActionArea href={url} sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ height: "20%" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }}> {content.title} </Typography>
                    </CardContent>
                </Box>
                <Box sx={{ height: "50%", width: "100%", background: content.background }}>
                    <CardContent>
                        <Typography className='truncate-5'>{content.description}</Typography>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card >
    );
}
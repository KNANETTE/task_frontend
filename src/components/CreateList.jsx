import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router";
import { createList } from "../services/listServices";


export default function CreateList({ order, onResult, onCreated }) {
    const [clicked, setClicked] = useState(false)
    const [title, setTitle] = useState("")
    const { bid } = useParams()
    const token = localStorage.getItem("token")
    const handleClick = () => { setClicked(!clicked) }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = JSON.stringify({
            data: {
                title,
                order,
                board: bid,
            }
        })
        try {
            const resp = await createList(token, data)
            if (!resp.ok) {
                onResult({ success: false, message: "Erreur client/server" })
            }
            onCreated(bid)
            onResult({ success: true, message: "Une nouvelle liste s'est ajoutée à votre projet!" })
        } catch (error) {
            onResult({ success: false, message: "Problème de réseau" })
        }
        handleClick()
        setTitle("")
    }

    const addButton = (<Button variant="primary" style={{ minWidth: "12em", height: "fit-content" }} onClick={handleClick}><AddIcon /></Button>)
    const addListForm = (
        <Card sx={{ minWidth: "20rem", height: "fit-content" }}>
            <CardActions className="d-flex flex-row-reverse">
                <Button onClick={handleClick} variant='outline-none text-danger'><CloseIcon /></Button>
            </CardActions>
            <Form className="pb-1" onSubmit={handleSubmit}>
                <CardContent>
                    <FormControl type="test" value={title} onChange={(e) => { setTitle(e.target.value) }} required/>
                </CardContent>
                <CardActions className="d-flex flex-row-reverse">
                    <Button type="submit" variant="success">Créer</Button>
                </CardActions>
            </Form>
        </Card>
    )

    if (!clicked) return addButton
    return addListForm
}
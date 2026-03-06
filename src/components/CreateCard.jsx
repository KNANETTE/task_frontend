import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/esm/FormControl";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import { Add } from "@mui/icons-material";
import { useState } from "react";

export default function CreateCard({ id, onResult, onCreated }) {
    const token = localStorage.getItem("token")
    const [clicked, setClicked] = useState(true)
    const handleClicked = () => { setClicked(!clicked) }
    const handleSubmit = async () => { }

    const addButton = (<Button onClick={handleClicked} className="text-primary" style={{ background: "#0000", border: 0 }}><Add /></Button>)
    const addForm = (
        <Box>
            <Form>
                <FormGroup controlId="title">
                    <FormLabel>Titre</FormLabel>
                </FormGroup>
            </Form>
        </Box>
    )
    if(!clicked) return addButton
    return addForm
}
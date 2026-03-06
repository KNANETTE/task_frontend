import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";
import { Delete, Add, Edit } from "@mui/icons-material";
import { useParams } from "react-router";
import CreateCard from "./CreateCard";

export default function BoardList({ content, onDelete, onResult }) {
    const token = localStorage.getItem("token")
    const { bid } = useParams()
    const handleDelete = () => {
        try {

        } catch (error) {

        }
    }
    return (
        <Card sx={{ minWidth: 340, background: "#f0f0f0", height: "fit-content" }}>
            <CardContent sx={{ fontWeight: "bold", fontSize: "large" }} className="d-flex justify-content-between">
                {content.title}
                <Box className="d-flex justify-content-evenly align-items-start" sx={{ width: "30%" }}>
                    <Button className="text-secondary" style={{ background: "#0000", border: 0 }}><Edit /></Button>
                    <Button className="text-danger" style={{ background: "#0000", border: 0 }}><Delete /></Button>
                </Box>
            </CardContent>
            <Divider />
            <CardContent></CardContent>
            <Divider />
            <CardContent>
                <CreateCard id={content.documentId} onResult={onResult} onCreated={onDelete} />
            </CardContent>
        </Card>
    )
}
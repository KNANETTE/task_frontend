import Toolbar from "@mui/material/Toolbar"
import Navbar from "../components/Navbar"
import { Engineering } from "@mui/icons-material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function About() {
    return (
        <>
            <Navbar />
            <Toolbar sx={{ margin: "0.5rem" }} />
            <Box sx={{color:"#ddd", fontSize:250}}>
                <Engineering fontSize="larger"/>
                <Typography variant="h5">Nous arrivons bientôt!</Typography>
            </Box>
        </>
    )
}
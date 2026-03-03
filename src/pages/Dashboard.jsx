import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Spaces from "../components/Spaces";
import WorkspaceModal from '../components/WorkspaceModal';

export default function Dashboard() {
    const username = localStorage.getItem("username")

    return (
        <>
            <Toolbar sx={{ margin: "0.5rem" }} />
            <Navbar />
            <div>
                <Typography variant="h4" color="primary">Bienvenue {username}</Typography>
                <WorkspaceModal />
            </div>
            <Divider sx={{ margin: "1rem" }} />
            <Typography variant="h5" align="center" color="secondary">VOS ESPACES 🌌</Typography>
            <Spaces />
            <Toolbar sx={{ margin: "0.5rem" }} />
            <Footer />
        </>
    )
}

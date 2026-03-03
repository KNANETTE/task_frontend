import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from "react-router";

export default function SideDrawer() {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const handleLoggout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("useremail");
        navigate("/auth");
    }

    const drawerList = [
        ['ACCUEIL', DashboardIcon, "/"],
        ['PROFIL', AccountCircle, "/profile"],
        ['À PROPOS', InfoIcon, "/about"],
    ]
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {drawerList.map(([label, Icon, link], index) => (
                    <ListItem key={label} disablePadding>
                        <ListItemButton href={link}>
                            <ListItemText primary={label} />
                            <Icon />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem key="DECONNEXION" disablePadding>
                    <ListItemButton onClick={handleLoggout}>
                        <ListItemText primary="DECONNEXION" />
                        <LogoutIcon />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)} color='#fff' sx={{ gap: "1rem" }}>
                <Box sx={{ display: "flex" }}>
                    <MenuIcon />
                </Box>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Typography variant="h6" noWrap component="div">
                        TASKFLOW
                    </Typography>
                </Box>
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

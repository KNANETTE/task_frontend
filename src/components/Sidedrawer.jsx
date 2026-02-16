import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from "react-router"

export default function SideDrawer() {
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate()
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const handleLoggout = async () => {
        localStorage.removeItem("token");
        navigate("/auth");
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[['ACCUEIL', DashboardIcon], ['ESPACES DE TRAVAIL', WorkspacesIcon], ['TABLEAUX', DashboardCustomizeIcon], ['À PROPOS', InfoIcon]].map(([label, Icon], index) => (
                    <ListItem key={label} disablePadding>
                        <ListItemButton>
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
            <Button onClick={toggleDrawer(true)} color='#fff'>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <MenuIcon />
                </Box>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
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

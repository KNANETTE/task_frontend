import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SideDrawer from './Sidedrawer';

export default function Navbar() {
    const username = localStorage.getItem("username")

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Box sx={{ display: "flex" }}>
                        <SideDrawer />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }}>
                        <Avatar>{username.slice(0, 2).toUpperCase()}</Avatar>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

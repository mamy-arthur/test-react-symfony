import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItemIcon, ListItemText, CssBaseline, Box, IconButton, ListItemButton, Container } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { AuthStatus, useAuth } from "../hooks/useAuth";

const drawerWidth = 240;

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);
  const {status} = useAuth();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  if (status === AuthStatus.Guest) {
    return <Navigate to="/login"/>;
  }

  return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                width: open ? drawerWidth : 60,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: open ? drawerWidth : 60, boxSizing: "border-box", transition: "width 0.3s" },
                }}
            >
                <Toolbar>
                    <IconButton onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        <ListItemButton component={NavLink} to="/" activeClassName="Mui-selected">
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            {open && <ListItemText primary="Dashboard" />}
                        </ListItemButton>
                        <ListItemButton component={NavLink} to="/users" activeClassName="Mui-selected">
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            {open && <ListItemText primary="Utilisateurs" />}
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>

            {/* Main content */}
            <Container component="main" maxWidth="lg">
                <AppBar
                    position="fixed"
                    sx={{
                    width: `calc(100% - ${open ? drawerWidth : 60}px)`,
                    ml: `${open ? drawerWidth : 60}px`,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "width 0.3s, margin-left 0.3s"
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Dashboard
                        </Typography>
                        <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>Se Déconnecter</Button>
                    </Toolbar>
                </AppBar>
                {/* Contenu de la page */}
                <Outlet />
            </Container>
        </Box>
    );
}

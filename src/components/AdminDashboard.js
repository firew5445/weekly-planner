import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Drawer,
  IconButton,
  Box,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Sidebar content
  const drawer = (
    <Box sx={{ width: 250, padding: 2 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Avatar />
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="subtitle1">@admin</Typography>
          <Typography variant="body2">Admin Role</Typography>
        </div>
      </div>
      <Divider />
      <List>
        <Link to="overview">
          <ListItem button>
            <CheckCircleIcon />
            <ListItemText primary="Overview" />
          </ListItem>
        </Link>
        <Link to="user">
          <ListItem button>
            <GroupIcon />
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <Link to="department">
          <ListItem button>
            <InboxIcon />
            <ListItemText primary="Departments" />
          </ListItem>
        </Link>
        <Link to="database">
          <ListItem button>
            <NotificationsIcon />
            <ListItemText primary="Database" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {/* Sidebar for larger screens */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              display: { xs: "none", md: "flex" }, // Hide on small screens
              padding: { xs: "10px", md: "20px" },
              flexDirection: "column",
              minHeight: "500px",
            }}
          >
            {drawer}
          </Paper>
        </Grid>

        {/* Drawer for smaller screens */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            display: { xs: "block", md: "none" }, // Only show drawer on small screens
          }}
        >
          {drawer}
        </Drawer>

        {/* Hamburger icon for opening the drawer on small screens */}
        <IconButton
          sx={{
            display: { xs: "block", md: "none" }, // Only show on small screens
            position: "absolute",
            top: 20,
            left: 20,
          }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: "20px", md: "50px" },
              minHeight: "500px",
              backgroundColor: "rgb(220 252 231)",
            }}
          >
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;



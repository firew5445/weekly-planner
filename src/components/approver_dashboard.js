import React, { useState } from "react";
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
  IconButton,
  Drawer,
  Hidden,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import { Link, Outlet } from "react-router-dom";

const ApproverDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <Avatar />
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="subtitle1">@buze</Typography>
          <Typography variant="body2">Approver at</Typography>
          <Typography variant="body2">application department</Typography>
        </div>
      </div>
      <Divider />
      <List>
        <Link to="recieved_plan">
          <ListItem button>
            <InboxIcon />
            <ListItemText primary="Received Plans" />
          </ListItem>
        </Link>
        <Link to="recieved_report">
          <ListItem button>
            <CheckCircleIcon />
            <ListItemText primary="Received Reports" />
          </ListItem>
        </Link>
        <Link to="notification">
          <ListItem button>
            <NotificationsIcon />
            <ListItemText primary="Notifications" />
          </ListItem>
        </Link>
        <Link to="users">
          <ListItem button>
            <GroupIcon />
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Grid container spacing={3}>
        {/* Mobile menu button */}
        <Hidden lgUp>
          <Grid item xs={12}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              style={{ marginBottom: "10px" }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Hidden>

        {/* Sidebar for larger screens */}
        <Hidden lgDown>
          <Grid item lg={3}>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {drawer}
            </Paper>
          </Grid>
        </Hidden>

        {/* Sidebar as drawer for smaller screens */}
        <Hidden lgUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            style={{ width: "240px" }}
          >
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                minHeight: "100%",
                width: "240px",
              }}
            >
              {drawer}
            </Paper>
          </Drawer>
        </Hidden>

        {/* Main content */}
        <Grid item xs={12} lg={9}>
          <Paper elevation={3} style={{ padding: "20px", minHeight: "500px" }}>
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApproverDashboard;

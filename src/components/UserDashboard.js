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
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import { Link, Outlet } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

const UserDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              minHeight: isMobile ? "auto" : "500px",
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              justifyContent: isMobile ? "space-around" : "flex-start",
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: isMobile ? "0" : "20px",
              }}
            >
              <Avatar />
              {!isMobile && (
                <div style={{ marginLeft: "10px" }}>
                  <Typography variant="subtitle1">@fr</Typography>
                  <Typography variant="body2">USER</Typography>
                </div>
              )}
            </div>
            <Divider />
            <List
              style={{
                display: "flex",
                flexDirection: isMobile ? "row" : "column",
                width: "100%",
              }}
            >
              <Link to="myplan" style={{ flex: isMobile ? 1 : "unset" }}>
                <ListItem button>
                  <InboxIcon />
                  {!isMobile && <ListItemText primary="MyPlans" />}
                </ListItem>
              </Link>
              <Link to="myreport" style={{ flex: isMobile ? 1 : "unset" }}>
                <ListItem button>
                  <CheckCircleIcon />
                  {!isMobile && <ListItemText primary="MyReport" />}
                </ListItem>
              </Link>
              <Link to="plan" style={{ flex: isMobile ? 1 : "unset" }}>
                <ListItem button>
                  <NotificationsIcon />
                  {!isMobile && <ListItemText primary="Add Plans" />}
                </ListItem>
              </Link>
              <Link to="report" style={{ flex: isMobile ? 1 : "unset" }}>
                <ListItem button>
                  <GroupIcon />
                  {!isMobile && <ListItemText primary="Add Reports" />}
                </ListItem>
              </Link>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Paper
            elevation={3}
            style={{ padding: "50px", minHeight: "500px" }}
          >
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboard;





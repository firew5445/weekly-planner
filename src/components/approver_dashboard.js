import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText, Divider, Avatar } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';

const ApproverDashboard = ({ receivedPlans }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper elevation={3} style={{ padding: '20px', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <Avatar />
                            <div style={{ marginLeft: '10px' }}>
                                <Typography variant="subtitle1">@buze_man</Typography>
                                <Typography variant="body2">Approver at</Typography>
                                <Typography variant="body2">application department</Typography>
                            </div>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button onClick={() => handleOptionClick('receivedPlans')}>
                                <InboxIcon />
                                <ListItemText primary="Received Plans" />
                            </ListItem>
                            <ListItem button onClick={() => handleOptionClick('receivedReports')}>
                                <CheckCircleIcon />
                                <ListItemText primary="Received Reports" />
                            </ListItem>
                            <ListItem button onClick={() => handleOptionClick('notifications')}>
                                <NotificationsIcon />
                                <ListItemText primary="Notifications" />
                            </ListItem>
                            <ListItem button onClick={() => handleOptionClick('users')}>
                                <GroupIcon />
                                <ListItemText primary="Users" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={9}>
                    <Paper elevation={3} style={{ padding: '20px', minHeight: '500px' }}>
                        {selectedOption === 'receivedPlans' && (
                            <>
                                <Typography variant="h5">Received Plans Content</Typography>
                                <ul>
                                    {receivedPlans.map((plan, index) => (
                                        <li key={index}>{plan.name}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {selectedOption === 'receivedReports' && (
                            <Typography variant="h5">Received Reports Content</Typography>
                        )}
                        {selectedOption === 'notifications' && (
                            <Typography variant="h5">Notifications Content</Typography>
                        )}
                        {selectedOption === 'users' && (
                            <Typography variant="h5">Users Content</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ApproverDashboard;

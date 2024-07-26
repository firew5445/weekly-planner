import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText, Divider, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';

const AdminDashboard = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(options[0].key);

    const handleOptionClick = (optionKey) => {
        setSelectedOption(optionKey);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                
                <Grid item xs={3}>
                    <Paper elevation={3} style={{ padding: '20px', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <Avatar />
                            <div style={{ marginLeft: '10px' }}>
                                <Typography variant="subtitle1">@admin</Typography>
                                <Typography variant="body2">Role: Admin</Typography>
                            </div>
                        </div>
                        <Divider />
                        
                        <List>
                            {options.map(option => (
                                <ListItem key={option.key} button onClick={() => handleOptionClick(option.key)}>
                                    {option.icon}
                                    <ListItemText primary={option.label} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={9}>
                    <Paper elevation={3} style={{ padding: '20px', minHeight: '500px' }}>
                        {options.map(option => (
                            <div key={option.key} style={{ display: selectedOption === option.key ? 'block' : 'none' }}>
                                <Typography variant="h5">{option.label} Content</Typography>
                                {option.content}
                            </div>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

const TouchableList = ({ items }) => (
    <List>
        {items.map((item, index) => (
            <ListItem key={index} button>
                <ListItemText primary={item} />
            </ListItem>
        ))}
    </List>
);

const DepartmentsContent = () => {
    const departments = [
        {
            id: 1,
            name: "Electronic Services and Application Development Directorate",
            approver: "bekele belay"
        },
        {
            id: 2,
            name: "Planning and Budget Preparation Monitoring and Evaluation Directorate",
            approver: "birhanu bogale"
        },
        {
            id: 2,
            name: "Directorate of Procurement Finance and Property Management",
            approver: "birhanu bogale"
        },
        {
            id: 2,
            name: "Access to Science and Technology, Radiation Protection and Intellectual Property Protection Directorate",
            approver: "birhanu bogale"
        },
        {
            id: 2,
            name: "Ecote Infrastructure and Service Management Directorate",
            approver: "birhanu bogale"
        },
        {
            id: 2,
            name: "Internal Audit Support and Monitoring Directorate",
            approver: "birhanu bogale"
        },
        {
            id: 2,
            name: "Electronic Services and Application Development Directorate",
            approver: "birhanu bogale"
        },
        {
            id: 2,
            name: "Ecote Private Entrepreneurship and Community Information Centers Management Directorate",
            approver: "birhanu bogale"
        },
        
    ];

    return (
        <div>
            <Typography variant="h6">Departments</Typography>
            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Department ID</TableCell>
                            <TableCell>Department Name</TableCell>
                            <TableCell>Approver Name</TableCell> {/* New column */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments.map(department => (
                            <TableRow key={department.id}>
                                <TableCell>{department.id}</TableCell>
                                <TableCell>{department.name}</TableCell>
                                <TableCell>{department.approver}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const App = () => {
    const dashboardOptions = [
        {
            key: 'departments',
            label: 'Departments',
            icon: <PeopleAltIcon />,
            content: <DepartmentsContent />
        },
        {
            key: 'users',
            label: 'Users',
            icon: <PeopleAltIcon />,
            content: <div>Add your content for users here</div>
        },
        {
            key: 'database',
            label: 'Database',
            icon: <StorageIcon />,
            content: <div>Add your content for database here</div>
        },
        {
            key: 'operations',
            label: 'Operations',
            icon: <SettingsIcon />,
            content: <div>Add your content for operations here</div>
        }
    ];

    return (
        <div>
            <AdminDashboard options={dashboardOptions} />
        </div>
    );
}

export default App;

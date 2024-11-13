import React from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material"; // Ensure these imports are correct

function Departments() {
  const departments = [
    {
      id: 1,
      name: "Electronic Services and Application Development Directorate",
      approver: "bekele belay",
    },
    {
      id: 2,
      name: "Planning and Budget Preparation Monitoring and Evaluation Directorate",
      approver: "birhanu bogale",
    },
    {
      id: 3,
      name: "Directorate of Procurement Finance and Property Management",
      approver: "birhanu bogale",
    },
    {
      id: 4,
      name: "Access to Science and Technology, Radiation Protection and Intellectual Property Protection Directorate",
      approver: "birhanu bogale",
    },
    {
      id: 5,
      name: "Ecote Infrastructure and Service Management Directorate",
      approver: "birhanu bogale",
    },
    {
      id: 6,
      name: "Internal Audit Support and Monitoring Directorate",
      approver: "birhanu bogale",
    },
    {
      id: 7,
      name: "Electronic Services and Application Development Directorate",
      approver: "birhanu bogale",
    },
    {
      id: 8,
      name: "Ecote Private Entrepreneurship and Community Information Centers Management Directorate",
      approver: "birhanu bogale",
    },
  ];

  return (
    <div>
      <Typography variant="h6">Departments</Typography>
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Department ID</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Approver Name</TableCell> {/* New column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
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
}

export default Departments;

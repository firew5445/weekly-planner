import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Reports from "./components/Reports";
import Profile from "./components/Profile";
import Plan from "./components/Plan";
import ApproverDashboard from "./components/approver_dashboard";
import AdminDashboard from "./components/AdminDashboard";
import ApproversList from "./components/approvers_list";
import RecievedPlans from "./components/RecievedPlans";
import RecievedReports from "./components/RecievedReports";
import Notifications from "./components/Notifications";
import Users from "./components/Users";
import PlanManagement from "./components/Plan";
import Myplans from "./components/Myplans";
import Myreports from "./components/Myreports";
import UserDashboard from "./components/UserDashboard";
import ReportManagement from "./components/Reports";
import Departments from "./components/Departments";
import Database from "./components/Database";
import Operations from "./components/Operations";
import Overview from "./components/Overview";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/plan" element={<PlanManagement />} />
          <Route path="/myplan" element={<Myplans />} />
          <Route path="/myreport" element={<Myreports />} />
          <Route path="/report" element={<Reports />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/approver_dashboard" element={<ApproverDashboard />}>
            <Route
              index
              element={<RecievedPlans replace to="recieved_plan" />}
            />
            <Route index path="recieved_plan" element={<RecievedPlans />} />
            <Route path="recieved_report" element={<RecievedReports />} />
            <Route path="notification" element={<Notifications />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route index element={<Navigate replace to="myplan" />} />
            <Route path="myplan" element={<Myplans />} />
            <Route path="myreport" element={<Myreports />} />
            <Route path="plan" element={<PlanManagement />} />
            <Route path="report" element={<Reports />} />
          </Route>
          <Route path="/admin_dashboard" element={<AdminDashboard />}>
            <Route index element={<Navigate replace to="overview" />} />
            <Route path="overview" element={<Overview />} />
            <Route path="user" element={<Users />} />
            <Route path="department" element={<Departments />} />
            <Route path="database" element={<Database />} />
            <Route path="operation" element={<Operations />} />
          </Route>

          {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
          <Route path="/approvers_list" element={<ApproversList />} />
          <Route path="/logout" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

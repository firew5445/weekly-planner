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
import approver_dashboard from "./components/approver_dashboard";
import admin_dashboard from "./components/admin_dashboard";
import approvers_list from "./components/approvers_list";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    React.createElement("div", null,
      React.createElement(Navbar, { isLoggedIn: isLoggedIn, handleLogout: handleLogout }),
      React.createElement("div", { className: "container mt-3" },
        React.createElement(Routes, null,
          React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
          React.createElement(Route, { path: "/login", element: React.createElement(Login, { handleLogin: handleLogin }) }),
          React.createElement(Route, { path: "/register", element: React.createElement(Register, null) }),
          React.createElement(Route, { path: "/plan", element: React.createElement(Plan, null) }),
          React.createElement(Route, { path: "/report", element: React.createElement(Reports, null) }),  
          React.createElement(Route, { path: "/profile", element: React.createElement(Profile, null) }),
          React.createElement(Route, { path: "/approver_dashboard", element: React.createElement(approver_dashboard, null) }),
          React.createElement(Route, { path: "/admin_dashboard", element: React.createElement(admin_dashboard, null) }),
          React.createElement(Route, { path: "/dashboard/*", element: React.createElement(Dashboard, null) }),
          React.createElement(Route, { path: "/approvers_list", element: React.createElement(approvers_list, null) }),
          React.createElement(Route, { path: "/logout", element: React.createElement(Navigate, { to: "/login" }) }),
          React.createElement(Route, { path: "*", element: React.createElement(Navigate, { to: "/" }) })
        )
      )
    )
  );
};

export default App;

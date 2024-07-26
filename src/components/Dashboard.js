// Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Import your custom CSS for hover effects

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <Link to="/plan" className="card-link">
            <div className="card mb-4 shadow-sm plan-card">
              <div className="card-body">
                <h5 className="card-title">Plan</h5>
                <p className="card-text card-description">This option allows you to create, edit, and share your weekly plan.</p>
                <Link to="/plan" className="btn btn-black">View Plan</Link>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/report" className="card-link">
            <div className="card mb-4 shadow-sm report-card">
              <div className="card-body">
                <h5 className="card-title">Report</h5>
                <p className="card-text card-description">This option allows you to create, edit, and share your weekly report.</p>
                <Link to="/report" className="btn btn-black">View Report</Link>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/profile" className="card-link">
            <div className="card mb-4 shadow-sm profile-card">
              <div className="card-body">
                <h5 className="card-title">Profile</h5>
                <p className="card-text card-description">A profile is a collection of information that describes you</p>
                <Link to="/profile" className="btn btn-black">View Profile</Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isAuthenticated }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: '#20948B' }}>
      <Link to="/" className="navbar-brand">
        Sidama Science And Technology Agency
      </Link>
      <div className="navbar-nav ml-auto">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link button">
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link button">
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </Link>
            </li>
          </>
        ) : (
          isHomePage && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link button">
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link button">
                  <FontAwesomeIcon icon={faUserPlus} /> Register
                </Link>
              </li>
            </>
          )
        )}
      </div>
      <style jsx>{`
        .button {
          padding: 8px 16px;
          margin: 0 5px;
          border: 2px solid #ffffff;
          border-radius: 20px;
          background-color: transparent;
          color: #ffffff;
          font-weight: bold;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .button:hover {
          transform: scale(1.05);
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;





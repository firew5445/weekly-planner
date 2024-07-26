import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: '#20948B' }}>
      <Link to={"/"} className="navbar-brand">
        Sidama Science And Technology Agency
      </Link>
      <div className="navbar-nav ml-auto">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/logout"} className="nav-link">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                <FontAwesomeIcon icon={faSignInAlt} />
              </Link>
            </li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

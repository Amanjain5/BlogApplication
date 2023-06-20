import "./navbar.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
    navigate("/");
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">
            <img src={require("../assets/codercd logo.jpg")} alt="Logo" />
          </div>
          <ul className="nav-links">
            <li className="lis1">
              <Link to="/mypost">My Post</Link>
            </li>
            <li className="lis2">
              <Link to="#">Blog</Link>
            </li>
            <li className="lis3">
              <Link to="#" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

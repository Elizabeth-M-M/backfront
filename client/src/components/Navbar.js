import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = ({user, onLogout}) => {
  const navigator = useNavigate();
  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }
  return (
    <nav className="navbar" id="navtitle">
      <h4 href="#" className="theme-color me-3">
        Logo
      </h4>
      <div className="right-nav">
        <ul className="menu-list">
          <li className="nav-item pe-4">
            <Link to="/">Home</Link>
          </li>
        </ul>
        <p>
          {!user? (
            <button
              className="btn btn-info"
              onClick={() => {
                navigator("/login");
              }}
            >
              Login
            </button>
          ) : (
            <button className="btn btn-info" onClick={handleLogout}>
              Logout
            </button>
          )}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;



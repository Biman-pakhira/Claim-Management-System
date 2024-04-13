import React from "react";
import "./Header.css";

const Navbar = () => {
  const handleLogout = () => {
    // Logic to handle logout
    console.log("Logging out...");
  };

  return (
    <div className="nav-bar">
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <div className="side-nav-button p-2 me-3 text-light">
          <i className="fa-regular fa-address-card"></i>
        </div>

        <span className="navbar-brand px-4">Claim Management System</span>

        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <span className="nav-link">Welcome! User</span>
          </li>
        </ul>

        <div className="profile-logo dropdown d-flex mx-5">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i className="fa-solid fa-user px-2"></i>
            User
          </button>
          <ul className="dropdown-menu dropdown-menu-light">
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

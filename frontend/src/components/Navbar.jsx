import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/icons/logo.jpg';

export function Navbar() {
  const userID = localStorage.getItem('userID');

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="CampusHub Logo" className="logo" />
        <span className="logo-text">CampusHub</span>
      </div>
      <div className="nav-links">
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
        <Link to="/report" className="nav-link report-btn">Report</Link>
        {userID && (
          <Link to={`/profile/${userID}`} className="nav-link">Profile</Link>
        )}
      </div>
    </nav>
  );
}

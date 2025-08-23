import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">CampusHub</h1>
      <div className="nav-links">
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/report" className="nav-link report-btn">Report</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
        <Link to="/about" className="nav-link">About Us</Link>
      </div>
    </nav>
  );
}

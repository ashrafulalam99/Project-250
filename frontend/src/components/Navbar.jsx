// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/icons/logo.jpg';

export const Navbar = () => {
  const userID = localStorage.getItem('userID');
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="CampusHub Logo" className="logo" />
        <span className="logo-text">CampusHub</span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/report" className={({ isActive }) => isActive ? 'active' : ''}>
            Report
          </NavLink>
        </li>
        <li>
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          {userID && (
          <NavLink to={`/profile/${userID}`} className={({ isActive }) => isActive ? 'active' : ''}>
            Profile
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

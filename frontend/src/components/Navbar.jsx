import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/icons/logo.jpg';
import api from '../axiosConfig';

export const Navbar = () => {
  const userID = localStorage.getItem('userID');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // fetch unread notifications count
    const fetchUnreadCount = async () => {
      try {
        const res = await api.get('/notifications');
        const unread = res.data.filter((n) => !n.read_status).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      }
    };

    fetchUnreadCount();
    // refresh every 60 seconds
    const interval = setInterval(fetchUnreadCount, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="CampusHub Logo" className="logo" />
        <span className="logo-text">CampusHub</span>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/marketplace/create" className={({ isActive }) => (isActive ? 'active' : '')}>
            Add to Market
          </NavLink>
        </li>
        <li>
          <NavLink to="/report" className={({ isActive }) => (isActive ? 'active' : '')}>
            Report Lost/Found
          </NavLink>
        </li>
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>

        {/* 🔔 Notifications link with badge */}
        <li className="notification-link">
          <NavLink to="/notifications" className={({ isActive }) => (isActive ? 'active' : '')}>
            Notifications{' '}
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </NavLink>
        </li>

        {userID && (
          <li>
            <NavLink to={`/profile/${userID}`} className={({ isActive }) => (isActive ? 'active' : '')}>
              Profile
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

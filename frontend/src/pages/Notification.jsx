import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
      setUnreadCount(res.data.filter(n => !n.read_status).length);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await api.post(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read_status: true } : n))
      );
      setUnreadCount(res.data.unreadCount ?? Math.max(unreadCount - 1, 0));
    } catch (err) {
      console.error('Failed to mark notification as read', err);
    }
  };

  const handleClick = (n) => {
    if (!n.read_status) markAsRead(n.id);

    if (n.type === 'marketplace') {
      navigate(`/marketplace/${n.item_id}`);
    } else if (n.type === 'lost_item' || n.type === 'found_item') {
      navigate(`/items/${n.item_id}`);
    }
  };

  return (
    <div className="notification-page">
      <h2>Notifications ({unreadCount} unread)</h2>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`notification-item ${n.read_status ? 'read' : 'unread'}`}
              onClick={() => handleClick(n)}
            >
              <div className="notification-message">
                <strong>{n.actor_name}</strong>: {n.message}
              </div>
              {!n.read_status && (
                <button onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}>
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;

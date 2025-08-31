import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import profileImg from '../Assets/images/profile.png';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import OwnItemcard from '../components/OwnItemcard';
import Itemcard from '../components/Itemcard';
import Settings from './Settings';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // 'info' or 'posts'
  const token = localStorage.getItem('token');
  const loggedInUserId = localStorage.getItem('userID');

  useEffect(() => {
    const own = String(id) === String(loggedInUserId);
    setIsOwnProfile(own);

    const fetchUser = async () => {
      try {
        if (!token) {
          navigate('/auth');
          return;
        }

        let res;
        if (own) {
          res = await api.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          res = await api.get(`/users/public/${id}`);
        }

        const userData = res.data.user || res.data;
        const items = res.data.items || [];
        setUser({ ...userData, items });
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate('/auth');
        } else {
          setUser(null);
        }
      }
    };

    fetchUser();
  }, [id, loggedInUserId, token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  const handleUpdate = () => navigate('/settings');

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove deleted item from state
      setUser((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
      }));
    } catch (err) {
      console.error('Error deleting item:', err);
      alert(err.response?.data?.message || 'Failed to delete item');
    }
  };

  if (!user) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="profile-page-wrapper">
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-avatar">
            <img src={profileImg} alt="Profile" />
          </div>

          <h2>{user.name || 'No Name'}</h2>

          {/* Tabs */}
          <div className="profile-tabs">
            <button
              className={activeTab === 'info' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('info')}
            >
              Information
            </button>
            <button
              className={activeTab === 'posts' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
          </div>

          {/* Tab content */}
          {activeTab === 'info' && (
            <div className="profile-info">
              {isOwnProfile ? (
                <>
                  <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                  <p><strong>Contact:</strong> {user.contact || 'N/A'}</p>
                  <p><strong>Location:</strong> {user.location || 'N/A'}</p>
                  <div className="profile-actions">
                    <button className="update-button" onClick={handleUpdate}>Update Info</button>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                  </div>
                </>
              ) : (
                <>
                  <p><strong>Contact:</strong> {user.contact || 'N/A'}</p>
                  <p><strong>Location:</strong> {user.location || 'N/A'}</p>
                </>
              )}
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="profile-posts">
              {user.items && user.items.length > 0 ? (
                <div className="items-grid">
                  {user.items.map((item) =>
                    isOwnProfile ? (
                      <OwnItemcard key={item.id} item={item} onDelete={handleDeleteItem} />
                    ) : (
                      <Itemcard key={item.id} item={item} />
                    )
                  )}
                </div>
              ) : (
                <p>No posts yet</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

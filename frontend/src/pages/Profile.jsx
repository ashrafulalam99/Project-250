import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import Itemcard from '../components/Itemcard';
import profileImg from '../Assets/images/profile.png';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // 'info' or 'posts'

  const loggedInUserId = localStorage.getItem('userID');
  const token = localStorage.getItem('token');

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
          res = await api.get(`/users/me`, {
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
          // Unauthorized, navigate to login
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
                  {user.items.map(item => (
                    <Itemcard key={item.id} item={item} />
                  ))}
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

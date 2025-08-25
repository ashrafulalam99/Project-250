import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import profileImg from '../Assets/images/profile.png';
import './Profile.css';

const Profile = () => {
  const { id } = useParams(); // profile ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const loggedInUserId = localStorage.getItem('userID');

  useEffect(() => {
    const own = String(id) === String(loggedInUserId);
    setIsOwnProfile(own);

    const fetchUser = async () => {
      try {
        let res;
        if (own) {
          // fetch full info for own profile
          res = await api.get(`/users/me`);
        } else {
          // fetch limited info for others
          res = await api.get(`/users/public/${id}`);
        }

        // Handle both backend response shapes
        const userData = res.data.user || res.data;
        const items = res.data.items || [];

        setUser({ ...userData, items });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setUser(null);
      }
    };

    fetchUser();
  }, [id, loggedInUserId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  const handleUpdate = () => navigate('/settings');

  if (!user) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
        < img src={profileImg} alt="Profile" />
        </div>

        <h2>{user.name || 'No Name'}</h2>
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

        <h3>Posts</h3>
            <ul className="posts-list">
              {user.items && user.items.length > 0
                ? user.items.map(item => (
                    <li key={item.id}>{item.name} ({item.status})</li>
                  ))
                : <li>No posts yet</li>}
            </ul>
      </div>
    </div>
  );
};

export default Profile;

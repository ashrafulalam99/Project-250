import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import profileImg from '../Assets/images/profile.png';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import OwnItemcard from '../components/OwnItemcard';
import OwnMarketItemCard from '../components/OwnMarketItem';
import Itemcard from '../components/Itemcard';
import MarketItemCard from '../components/MarketItem';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('info'); // info | report | marketplace
  const [marketItems, setMarketItems] = useState([]);
  const token = localStorage.getItem('token');
  const loggedInUserId = localStorage.getItem('userID');
  const isOwnProfile = String(id) === String(loggedInUserId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isOwnProfile && !token) {
          navigate('/auth');
          return;
        }

        const res = isOwnProfile
          ? await api.get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
          : await api.get(`/users/public/${id}`);

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
  }, [id, token, navigate, isOwnProfile]);

  useEffect(() => {
    const fetchMarketItems = async () => {
      try {
        let res;
        if (isOwnProfile) {
          res = await api.get('/marketplace/my', { headers: { Authorization: `Bearer ${token}` } });
        } else {
          res = await api.get(`/marketplace/user/${id}`);
        }
        setMarketItems(res.data);
      } catch (err) {
        console.error('Failed to fetch marketplace items', err);
        setMarketItems([]);
      }
    };

    fetchMarketItems();
  }, [id, token, isOwnProfile]);

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/items/${itemId}`, { headers: { Authorization: `Bearer ${token}` } });
      setUser((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
      }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const handleDeleteMarketItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this market item?')) return;
    try {
      await api.delete(`/marketplace/${itemId}`, { headers: { Authorization: `Bearer ${token}` } });
      setMarketItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete market item');
    }
  };

  const handleUpdateProfile = () => {
    navigate('/profileupdate');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
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

          {isOwnProfile && (
            <div className="profile-actions">
              <button onClick={handleUpdateProfile} className="profile-action-button">
                Update Profile
              </button>
              <button onClick={handleLogout} className="profile-action-button logout">
                Logout
              </button>
            </div>
          )}

          <div className="profile-tabs">
            <button
              className={activeTab === 'info' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('info')}
            >
              Information
            </button>
            <button
              className={activeTab === 'report' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('report')}
            >
              Report
            </button>
            <button
              className={activeTab === 'marketplace' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('marketplace')}
            >
              Marketplace
            </button>
          </div>

          {activeTab === 'info' && (
            <div className="profile-info">
              <p><strong>Email:</strong> {user.email || 'N/A'}</p>
              <p><strong>Contact:</strong> {user.contact || 'N/A'}</p>
              <p><strong>Location:</strong> {user.location || 'N/A'}</p>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="profile-tabs">
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
                <p>No report yet</p>
              )}
            </div>
          )}

          {activeTab === 'marketplace' && (
            <div className="profile-marketplace">
              {marketItems.length > 0 ? (
                <div className="items-grid">
                  {marketItems.map((item) =>
                    isOwnProfile ? (
                      <OwnMarketItemCard key={item.id} item={item} onDelete={handleDeleteMarketItem} />
                    ) : (
                      <MarketItemCard key={item.id} item={item} />
                    )
                  )}
                </div>
              ) : (
                <p>No marketplace items yet.</p>
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

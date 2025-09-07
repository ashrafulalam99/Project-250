import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Settings.css';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    contact: '',
    location: ''
  });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Separate messages
  const [infoMessage, setInfoMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [loadingInfo, setLoadingInfo] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Load user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = res.data.user || res.data;

        setUserInfo({
          name: userData.name || '',
          email: userData.email || '',
          contact: userData.contact || '',
          location: userData.location || ''
        });
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    };

    fetchUser();
  }, []);

  // Handle info update
  const handleInfoUpdate = async (e) => {
    e.preventDefault();
    setInfoMessage('');
    setLoadingInfo(true);
    try {
      const token = localStorage.getItem('token');
      const res = await api.put('/users/me', userInfo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInfoMessage(res.data.message || 'Profile updated successfully!');
    } catch (err) {
      setInfoMessage(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoadingInfo(false);
    }
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordMessage('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordMessage('All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage('New password and confirmation do not match');
      return;
    }

    setLoadingPassword(true);
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(
        '/users/me/password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPasswordMessage(res.data.message || 'Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordMessage(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="settings-page-wrapper">
        <div className="settings-page">
          <h2>Settings</h2>

          {/* Info update form */}
          <div className="settings-section">
            <h3>Update Information</h3>
            <form onSubmit={handleInfoUpdate} className="info-form">
              <label>
                Name:
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                />
              </label>
              <label>
                Contact:
                <input
                  type="text"
                  value={userInfo.contact}
                  onChange={(e) => setUserInfo({ ...userInfo, contact: e.target.value })}
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  value={userInfo.location}
                  onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                />
              </label>
              <div className="update-button-wrapper">
                <button type="submit" disabled={loadingInfo}>
                  {loadingInfo ? 'Updating...' : 'Update Info'}
                </button>
                {infoMessage && <span className="update-message">{infoMessage}</span>}
              </div>
            </form>
          </div>

          {/* Password update form */}
          <div className="settings-section">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordUpdate} className="password-form">
              <label>
                Old Password:
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                Confirm New Password:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <div className="update-button-wrapper">
                <button type="submit" disabled={loadingPassword}>
                  {loadingPassword ? 'Updating...' : 'Update Password'}
                </button>
                {passwordMessage && <span className="update-message">{passwordMessage}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Report.css';

const fallbackImage = '/Assets/images/image.png'; // local fallback image

const Report = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('lost');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in to report an item.');
        setLoading(false);
        return;
      }

      await axios.post(
        '/api/items',
        {
          name,
          description,
          image_url: imageUrl || null,
          status
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage('Report submitted successfully!');
      setName('');
      setDescription('');
      setImageUrl('');
      setStatus('lost');

      // Navigate to home after 1 second
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to submit report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page-wrapper">
      <Navbar />
      <div className="report-page">
        <h2>Report Lost/Found Item</h2>
        <form className="report-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Image URL (optional):
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
            />
          </label>

          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Report'}
          </button>
        </form>

        {message && <p className="report-message">{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Report;

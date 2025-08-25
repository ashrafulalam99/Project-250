import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import './Report.css';

const Report = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    status: 'lost', // default selection
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/items', formData);
      alert('Item reported successfully!');
      // Navigate to appropriate page based on status
      navigate(formData.status === 'lost' ? '/lost' : '/found');
    } catch (err) {
      console.error(err);
      setError('Failed to report item. Please try again.');
    }
  };

  return (
    <div className="report-page">
      <h2>Report Lost / Found Item</h2>
      <form className="report-form" onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL:
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-button">Report Item</button>
      </form>
    </div>
  );
};

export default Report;

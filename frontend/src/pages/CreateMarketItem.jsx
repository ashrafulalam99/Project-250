import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import './CreateMarketItem.css';

const CreateMarketItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('buy');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in.');
        setLoading(false);
        return;
      }

      await axios.post(
        '/marketplace',
        {
          title,
          description,
          type,
          price: price ? Number(price) : null,
          image_url: imageUrl || null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Marketplace item created!');
      setTitle('');
      setDescription('');
      setType('buy');
      setPrice('');
      setImageUrl('');

      setTimeout(() => navigate('/marketplace'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-wrapper">
      <Navbar />
      <div className="form-container">
        <h2>Add Marketplace Item</h2>
        <form className="market-form" onSubmit={handleSubmit}>
          <label>
            Title*:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            Interested to*:
            <select value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </label>

          <label>
            Price/Budget:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
            />
          </label>

          <label>
            Image URL (Optional):
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Item'}
          </button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default CreateMarketItem;

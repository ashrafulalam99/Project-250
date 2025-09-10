import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import Itemcard from '../components/Itemcard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Lost.css';

const Lost = () => {
  const [lostItems, setLostItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch items whenever searchTerm changes
  useEffect(() => {
    const fetchItems = () => {
      const url = searchTerm
        ? `/items?status=lost&search=${encodeURIComponent(searchTerm)}`
        : '/items?status=lost';
      api.get(url)
        .then(res => setLostItems(res.data))
        .catch(err => console.error(err));
    };

    // Optional: add small delay for better performance
    const timeoutId = setTimeout(fetchItems, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="lost-page-wrapper">
      <Navbar />
      <div className="items-page">
        <h2>Lost Items</h2>

        {/* Live search input */}
        <div className="search-bar" style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search lost items..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="items-grid">
          {lostItems.length > 0 ? (
            lostItems.map(item => <Itemcard key={item.id} item={item} />)
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lost;

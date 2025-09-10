import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import MarketItem from '../components/MarketItem';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Marketplace.css';

const FILTERS = ['buy', 'sell'];

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('buy'); 
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // search term

  const fetchItems = async (currentSearchTerm = searchTerm) => {
    setLoading(true);
    try {
      const oppositeFilter = filter === 'buy' ? 'sell' : 'buy';
      let query = `?type=${oppositeFilter}`;
      if (currentSearchTerm) query += `&search=${encodeURIComponent(currentSearchTerm)}`;

      const res = await axios.get(`/marketplace${query}`);
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch marketplace items', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch items when filter or search term changes
  useEffect(() => {
    fetchItems();
  }, [filter, searchTerm]);

  // Handle tab switch: reset searchTerm
  const handleFilterChange = (f) => {
    setFilter(f);
    setSearchTerm(''); // ✅ reset search box
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchItems(); 
  };

  return (
    <>
      <Navbar />
      <div className="marketplace-page">
        <h2 className="marketplace-title">Marketplace</h2>

        {/* Filter Tabs */}
        <div className="marketplace-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => handleFilterChange(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="search-bar" style={{ margin: '15px 0' }}>
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
        </div>

        {loading ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div className="marketplace-grid">
            {items.map((item) => (
              <MarketItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

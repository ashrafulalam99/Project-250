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

  const fetchItems = async () => {
    setLoading(true);
    try {
      // reverse the filter
      const oppositeFilter = filter === 'buy' ? 'sell' : 'buy';
      const query = `?type=${oppositeFilter}`;
      const res = await axios.get(`/marketplace${query}`);
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch marketplace items', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [filter]);

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
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
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

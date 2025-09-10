import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import Itemcard from '../components/Itemcard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Found.css';

const Found = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // ✅ search term

  const fetchItems = () => {
    const query = searchTerm
      ? `/items?status=found&search=${encodeURIComponent(searchTerm)}`
      : '/items?status=found';

    api.get(query)
      .then(res => setFoundItems(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, [searchTerm]); // ✅ refetch when searchTerm changes

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchItems(); // optional: Enter key triggers search
  };

  return (
    <div className="found-page-wrapper">
      <Navbar />

      <div className="items-page">
        <h2>Found Items</h2>

        {/* Search input */}
        <div className="search-bar" style={{ margin: '15px 0' }}>
          <input
            type="text"
            placeholder="Search found items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
        </div>

        <div className="items-grid">
          {foundItems.length > 0 ? (
            foundItems.map(item => <Itemcard key={item.id} item={item} />)
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Found;

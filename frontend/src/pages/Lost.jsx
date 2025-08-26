import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import Itemcard from '../components/Itemcard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Lost.css';

const Lost = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    api.get('/items?status=lost')
      .then(res => setLostItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="lost-page-wrapper">
      <Navbar />
      <div className="items-page">
        <h2>Lost Items</h2>
        <div className="items-grid">
          {lostItems.map(item => (
            <Itemcard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lost;

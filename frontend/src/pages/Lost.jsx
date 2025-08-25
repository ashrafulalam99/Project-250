import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import Itemcard from '../components/Itemcard';
import './Lost.css';

const Lost = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    api.get('/items?status=lost')
      .then(res => setLostItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="items-page">
      <h2>Lost Items</h2>
      <div className="items-grid">
        {lostItems.map(item => (
          <Itemcard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Lost;

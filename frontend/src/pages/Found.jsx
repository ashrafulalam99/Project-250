import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import Itemcard from '../components/Itemcard';
import './Found.css';

const Found = () => {
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    api.get('/items?status=found')
      .then(res => setFoundItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="items-page">
      <h2>Found Items</h2>
      <div className="items-grid">
        {foundItems.map(item => (
          <Itemcard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Found;

// src/pages/MarketplaceItemPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axiosConfig';
import MarketItem from '../components/MarketItem';
import './SingleItem.css';

const MarketplaceItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/marketplace/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error('Failed to fetch marketplace item', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div className="single-item-page">
      <div className="single-item-card-wrapper">
        <MarketItem item={item} />
      </div>
    </div>
  );
};

export default MarketplaceItemPage;

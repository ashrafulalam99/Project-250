import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MarketItem.css';
import DriveImage from './DriveImage'; // ✅

const MarketItem = ({ item }) => {
  const navigate = useNavigate();
  const { title, description, price, budget, type, image_url, user_id } = item;

  const handleContact = () => {
    navigate(`/profile/${user_id}`);
  };

  let amountText = null;
  if (type === 'sell' && price !== null) {
    amountText = `Price: BDT ${price}`;
  } else if (type === 'buy' && price !== null) {
    amountText = `Budget: BDT ${price}`;
  }

  return (
    <div className="market-item-card">
      <div className="market-item-image-container">
        <DriveImage src={image_url} alt={title} className="market-item-image" /> {/* ✅ */}
      </div>
      <h3 className="market-item-title">{title}</h3>
      <p className="market-item-description">{description}</p>
      {amountText && <div className="market-item-meta">{amountText}</div>}
      <button className="contact-button" onClick={handleContact}>
        Contact
      </button>
    </div>
  );
};

export default MarketItem;

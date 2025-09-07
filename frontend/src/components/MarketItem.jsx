import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MarketItem.css';
import fallbackImg from '../Assets/images/item.png'; // fallback image

const MarketItem = ({ item }) => {
  const navigate = useNavigate();
  const { id, title, description, price, budget, type, image_url, user_id } = item; // include type and budget

  // Handle broken images
  const handleImageError = (e) => {
    e.target.src = fallbackImg;
  };

  const handleContact = () => {
    navigate(`/profile/${user_id}`);
  };

  // Decide what to display: label + value
  let amountText = null;
  if (type === 'sell' && price !== null) {
    amountText = `Price: BDT ${price}`;
  } else if (type === 'buy' && budget !== null) {
    amountText = `Budget: BDT ${price}`;
  }

  return (
    <div className="market-item-card">
      <div className="market-item-image-container">
        <img
          src={image_url || fallbackImg}
          alt={title}
          onError={handleImageError}
          className="market-item-image"
        />
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

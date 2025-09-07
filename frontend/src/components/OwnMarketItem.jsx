import React from 'react';
import './MarketItem.css';
import fallbackImg from '../Assets/images/item.png';

const OwnMarketItemCard = ({ item, onDelete }) => {
  const { id, title, description, price, type, image_url } = item;

  // Handle broken images
  const handleImageError = (e) => {
    e.target.src = fallbackImg;
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(id);
    }
  };

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
      <div className="market-item-meta">
        <span className={`market-item-type ${type}`}>{type.toUpperCase()}</span>
        {price !== null && <span className="market-item-price">${price}</span>}
      </div>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default OwnMarketItemCard;

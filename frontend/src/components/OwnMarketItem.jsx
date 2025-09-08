import React from 'react';
import './MarketItem.css';
import DriveImage from './DriveImage'; // ✅

const OwnMarketItemCard = ({ item, onDelete }) => {
  const { id, title, description, price, type, image_url } = item;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="market-item-card">
      <div className="market-item-image-container">
        <DriveImage src={image_url} alt={title} className="market-item-image" /> {/* ✅ */}
      </div>
      <h3 className="market-item-title">{title}</h3>
      <p className="market-item-description">{description}</p>
      <div className="market-item-meta">
        <span className={`market-item-type ${type}`}>{type.toUpperCase()}</span>
        {price !== null && <span className="market-item-price">BDT {price}</span>}
      </div>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default OwnMarketItemCard;

import React from 'react';
import './Itemcard.css';
import fallbackImg from '../Assets/images/item.png';

const OwnItemcard = ({ item, onDelete }) => {
  const { id, name, description, image_url } = item;

  const handleImageError = (e) => {
    e.target.src = fallbackImg;
  };

  return (
    <div className="item-card">
      <div className="item-image-container">
        <img
          src={image_url || fallbackImg}
          alt={name}
          onError={handleImageError}
          className="item-image"
        />
      </div>
      <h3 className="item-name">{name}</h3>
      <p className="item-description">{description}</p>
      <button
        className="delete-button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default OwnItemcard;

import React from 'react';
import './Itemcard.css';
import DriveImage from './DriveImage'; // ✅ new import

const OwnItemcard = ({ item, onDelete }) => {
  const { id, name, description, image_url } = item;

  return (
    <div className="item-card">
      <div className="item-image-container">
        <DriveImage src={image_url} alt={name} className="item-image" /> {/* ✅ */}
      </div>
      <h3 className="item-name">{name}</h3>
      <p className="item-description">{description}</p>
      <button className="delete-button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default OwnItemcard;

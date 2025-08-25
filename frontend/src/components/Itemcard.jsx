import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Itemcard.css';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { name, description, image_url, owner_id } = item;

  const handleContact = () => {
    navigate(`/profile/${owner_id}`);
  };

  return (
    <div className="item-card">
      <div className="item-image-container">
        <img
          src={image_url || 'https://via.placeholder.com/150?text=Unavailable'}
          alt={name}
          className="item-image"
        />
      </div>
      <h3 className="item-name">{name}</h3>
      <p className="item-description">{description}</p>
      <button className="contact-button" onClick={handleContact}>
        Contact Owner
      </button>
    </div>
  );
};

export default ItemCard;

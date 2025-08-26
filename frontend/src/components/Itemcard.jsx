import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Itemcard.css';
import fallbackImg from '../Assets/images/item.png'; // fallback image

const Itemcard = ({ item }) => {
  const navigate = useNavigate();
  const { name, description, image_url, user_id } = item;

  const handleContact = () => {
    navigate(`/profile/${user_id}`);
  };

  // Handle broken images
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
      <button className="contact-button" onClick={handleContact}>
        Contact
      </button>
    </div>
  );
};

export default Itemcard;

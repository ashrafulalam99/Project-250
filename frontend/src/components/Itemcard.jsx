import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Itemcard.css';
import DriveImage from './DriveImage'; // ✅ new import

const Itemcard = ({ item }) => {
  const navigate = useNavigate();
  const { name, description, image_url, user_id } = item;

  const handleContact = () => {
    navigate(`/profile/${user_id}`);
  };

  return (
    <div className="item-card">
      <div className="item-image-container">
        <DriveImage src={image_url} alt={name} className="item-image" /> {/* ✅ changed */}
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

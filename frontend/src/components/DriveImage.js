import React from 'react';
import item1 from '../Assets/images/item1.png';
import item2 from '../Assets/images/item2.png';
import item3 from '../Assets/images/item3.png';
import item4 from '../Assets/images/item4.png';

const fallbackImages = [item1, item2, item3, item4];

const DriveImage = ({ src, alt, className }) => {
  let finalSrc = src;

  // Convert Drive URLs to direct view links
  if (src?.includes('drive.google.com')) {
    let fileId = null;

    const match1 = src.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match1 && match1[1]) fileId = match1[1];

    const match2 = src.match(/[\?&]id=([a-zA-Z0-9_-]+)/);
    if (!fileId && match2 && match2[1]) fileId = match2[1];

    if (fileId) {
      finalSrc = `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }

  // Deterministic fallback: hash alt or src to pick an image
  const getFallbackForItem = () => {
    const key = alt || src || 'default';
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    const index = Math.abs(hash) % fallbackImages.length;
    return fallbackImages[index];
  };

  return (
    <img
      src={finalSrc || getFallbackForItem()}
      alt={alt}
      className={className}
      onError={(e) => { e.target.src = getFallbackForItem(); }}
    />
  );
};

export default DriveImage;

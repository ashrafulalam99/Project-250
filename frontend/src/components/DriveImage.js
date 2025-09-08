import React from 'react';
import item1 from '../Assets/images/item1.png';
import item2 from '../Assets/images/item2.png';
import item3 from '../Assets/images/item3.png';
import item4 from '../Assets/images/item4.png';

const fallbackImages = [item1, item2, item3, item4];

const DriveImage = ({ src, alt, className }) => {
  let finalSrc = src;

  if (src?.includes('drive.google.com')) {
    // Extract file ID from multiple Drive URL formats
    let fileId = null;

    // Format: /d/<ID>/view or /d/<ID>/
    const match1 = src.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match1 && match1[1]) fileId = match1[1];

    // Format: ?id=<ID>
    const match2 = src.match(/[\?&]id=([a-zA-Z0-9_-]+)/);
    if (!fileId && match2 && match2[1]) fileId = match2[1];

    if (fileId) {
      finalSrc = `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }

  // Random fallback selection
  const getRandomFallback = () => {
    const index = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[index];
  };

  return (
    <img
      src={finalSrc || getRandomFallback()}
      alt={alt}
      className={className}
      onError={(e) => { e.target.src = getRandomFallback(); }}
    />
  );
};

export default DriveImage;

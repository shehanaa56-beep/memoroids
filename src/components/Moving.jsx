import React from 'react';
import './Moving.css';

const images = [
  '/images/1.jfif',
  '/images/2.jfif',
  '/images/3.jfif',
  '/images/4.jfif',
  '/images/5.jfif',
  '/images/50.jfif',
    '/images/15.jfif',
    '/images/16.jfif',
    '/images/17.jfif',
    '/images/18.jfif',
    '/images/47.jfif',
    '/images/20.jfif',
    '/images/21.jfif',
    '/images/22.jfif',
    '/images/23.jfif',
    '/images/62.jfif',
    '/images/74.jfif',
    '/images/24.jfif',
    '/images/25.jfif',
    '/images/26.jfif',
    '/images/27.jfif',
    '/images/28.jfif',
    '/images/60.jfif',
    '/images/29.jfif',
    '/images/61.jfif',
    '/images/30.jfif',
    '/images/31.jfif',
    '/images/72.jfif',
    '/images/5.jfif',
    '/images/33.jfif',
    '/images/34.jfif',
    '/images/73.jfif',
    '/images/63.jfif',
    '/images/35.jfif',
    '/images/70.jfif',
    '/images/84.jfif',
    '/images/36.jfif',
    '/images/37.jfif',
    '/images/81.jfif',
    '/images/38.jfif',
    '/images/39.jfif',
    '/images/64.jfif',
    '/images/40.jfif',
    '/images/41.jfif',
];

const Moving = () => {
  return (
    <div className="moving-slider">
      <div className="moving-track">
        {images.concat(images).map((image, index) => (
          <img key={index} src={image} alt={`Moving ${index + 1}`} className="moving-image" />
        ))}
      </div>
    </div>
  );
};

export default Moving;

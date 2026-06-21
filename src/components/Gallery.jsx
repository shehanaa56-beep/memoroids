import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    '/images/1.jfif',
    '/images/2.jfif',
    '/images/3.jfif',
    '/images/4.jfif',
    '/images/11.jfif',
    '/images/32.jfif',
    '/images/6.jfif',
    '/images/7.jfif',
    '/images/8.jfif',
    '/images/46.jfif',
    '/images/60.jfif',
    '/images/10.jfif',
    '/images/111.jfif',
    '/images/12.jfif',
    '/images/13.jfif',
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
    '/images/24.jfif',
    '/images/25.jfif',
    '/images/26.jfif',
    '/images/27.jfif',
    '/images/28.jfif',
    '/images/29.jfif',
    '/images/61.jfif',
    '/images/30.jfif',
    '/images/31.jfif',
    '/images/5.jfif',
    '/images/33.jfif',
    '/images/34.jfif',
    '/images/35.jfif',
    '/images/36.jfif',
    '/images/37.jfif',
    '/images/38.jfif',
    '/images/39.jfif',
    '/images/40.jfif',
    '/images/41.jfif',
    '/images/62.jfif',
    '/images/42.jfif',
    '/images/43.jfif',
    '/images/44.jfif',
    '/images/45.jfif',
    '/images/9.jfif',
    '/images/85.jfif',
    '/images/19.jfif',
    '/images/48.jfif',
    '/images/52.jfif',
    '/images/14.jfif',
    '/images/51.jfif',
    '/images/49.jfif',
    '/images/84.jfif',
    '/images/53.jfif',
    '/images/54.jfif',
    '/images/55.jfif',
    '/images/56.jfif',
    '/images/57.jfif',
    '/images/58.jfif',
    '/images/59.jfif',
    '/images/63.jfif',
    '/images/64.jfif',
    '/images/65.jfif',
    '/images/66.jfif',
    '/images/67.jfif',
    '/images/68.jfif',
    '/images/69.jfif',
    '/images/70.jfif',
    '/images/71.jfif',
    '/images/72.jfif',
    '/images/73.jfif',
    '/images/74.jfif',
    '/images/75.jfif',
    '/images/76.jfif',
    '/images/77.jfif',
    '/images/78.jfif',
    '/images/79.jfif',
    '/images/80.jfif',
    '/images/81.jfif',
    '/images/82.jfif',
    '/images/83.jfif',
  ];

  return (
    <div className="gallery-page">
      {/* Cute Scrapbook Header */}
      <div className="gl-header">
        {/* Floating doodles */}
        <div className="gl-doodle gl-doodle-hearts-left">
          <span>❤</span>
          <span className="tiny-heart">❤</span>
        </div>
        
        <div className="gl-doodle gl-doodle-plane">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f497a9" strokeWidth="1.5" strokeLinecap="round" width="48" height="48">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            <path d="M6 18c.5-1 1-1.5 2-1s1.5 1 3 0c1.5-1 2-2 3.5-1.5" strokeDasharray="3 3"/>
          </svg>
        </div>

        <div className="gl-doodle gl-doodle-hearts-right">
          <span>❤</span>
          <span className="tiny-heart">❤</span>
          <span>❤</span>
        </div>

        <div className="gl-doodle gl-doodle-sparkles">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f497a9" strokeWidth="1.8" strokeLinecap="round" width="24">
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5l2.5 2.5M18 6l-2.5 2.5M8.5 15.5L6 18"/>
          </svg>
        </div>

        <h1 className="gl-title">
          Follow Our <br />
          <span className="gl-journey">Journey <span className="gl-title-heart">❤</span></span>
        </h1>

        {/* Pill Banner */}
        <div className="gl-instagram-banner">
          <p className="gl-banner-text">
            Follow our Instagram page <br />
            <a href="https://www.instagram.com/memoroidsbyshehana" target="_blank" rel="noopener noreferrer" className="gl-insta-link">
              @memoroids
            </a>
          </p>
          <div className="gl-banner-badge">
            <div className="gl-badge-speech">
              <span>❤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of gallery images */}
      <div className="gallery-container">
        <div className="gallery-images">
          {images.map((image, index) => (
            <div key={index} className="gl-image-card">
              <img src={image} alt={`Memory ${index + 1}`} onClick={() => setSelectedImage(image)} />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="gl-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Zoomed" className="gl-modal-image" />
        </div>
      )}
    </div>
  );
};

export default Gallery;

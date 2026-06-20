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
    <div className="gallery">
      <h1>Follow Our Journey</h1>
      <p className="subheading">
        Follow our Instagram page{' '}
        <a href="https://www.instagram.com/memoroidsbyshehana" target="_blank" rel="noopener noreferrer">
          @memoroids
        </a>
      </p>
      <div className="gallery-images">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Memory ${index + 1}`} onClick={() => setSelectedImage(image)} />
        ))}
      </div>
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Zoomed" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default Gallery;

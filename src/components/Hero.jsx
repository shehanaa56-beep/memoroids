import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  const handleViewGalleryClick = () => {
    navigate('/gallery');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>You Make Memories, <span className="highlight">We Make Them Forever</span></h1>
        <p>
          At Memoroids by Shehana, we bring your memories to life through handcrafted Polaroids, albums, and personalized frames. Each piece is made with love, care, and creativity — designed to make your special moments last forever.
        </p>
        <div className="hero-buttons">
          <button className="btn shop-btn" onClick={handleShopNowClick}>Shop Now</button>
          <button className="btn gallery-btn" onClick={handleViewGalleryClick}>View Gallery</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

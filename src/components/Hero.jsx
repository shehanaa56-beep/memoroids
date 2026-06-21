import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => navigate('/shop');
  const handleViewGalleryClick = () => navigate('/gallery');

  const polaroidData = [
    { src: '/images/2.jfif',  alt: 'Handcrafted Flowers',   dec: <span className="polaroid-heart">❤</span> },
    { src: '/images/12.jfif', alt: 'Memory Sunset',         dec: <span className="polaroid-flower">✿</span> },
    { src: '/images/6.jfif',  alt: 'Personalized Portrait', dec: <span className="polaroid-heart-bottom">❤</span> },
    { src: '/images/10.jfif', alt: 'Ruled Keepsake Book',   dec: <span className="polaroid-flower-bottom">✿</span> },
  ];

  return (
    <section className="hero">

      {/* ── MOBILE: horizontal polaroid strip ── */}
      <div className="mobile-polaroid-strip">
        {polaroidData.map((p, i) => (
          <div key={i} className="polaroid">
            <div className="washi-tape"></div>
            <img src={p.src} alt={p.alt} />
            {p.dec}
          </div>
        ))}
      </div>

      {/* ── DESKTOP: absolute-positioned polaroids ── */}
      <div className="polaroid polaroid-1 desktop-only">
        <div className="washi-tape"></div>
        <img src="/images/2.jfif" alt="Handcrafted Flowers" />
        <span className="polaroid-heart">❤</span>
      </div>
      <div className="polaroid polaroid-2 desktop-only">
        <div className="washi-tape"></div>
        <img src="/images/12.jfif" alt="Memory Sunset" />
        <span className="polaroid-flower">✿</span>
      </div>
      <div className="polaroid polaroid-3 desktop-only">
        <div className="washi-tape"></div>
        <img src="/images/6.jfif" alt="Personalized Portrait" />
        <span className="polaroid-heart-bottom">❤</span>
      </div>
      <div className="polaroid polaroid-4 desktop-only">
        <div className="washi-tape"></div>
        <img src="/images/10.jfif" alt="Ruled Keepsake Book" />
        <span className="polaroid-flower-bottom">✿</span>
      </div>

      {/* Decorative Doodle SVGs */}
      <div className="doodle doodle-heart-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 21 C11.3 20.3, 3.5 13.5, 3.5 9 C3.5 5.5, 6.5 2.5, 10 2.5 C11.9 2.5, 12 3.5, 12 3.5 C12 3.5, 12.1 2.5, 14 2.5 C17.5 2.5, 20.5 5.5, 20.5 9 C20.5 13.5, 12.7 20.3, 12 21 Z" stroke="#e3627d" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeDasharray="3 3"/>
        </svg>
      </div>
      <div className="doodle doodle-heart-2">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M12 20.5 C11.5 20, 4.5 13.8, 4.5 9.5 C4.5 6.2, 7.2 3.5, 10.5 3.5 C11.8 3.5, 12 4.2, 12 4.2 C12 4.2, 12.2 3.5, 13.5 3.5 C16.8 3.5, 19.5 6.2, 19.5 9.5 C19.5 13.8, 12.5 20, 12 20.5 Z" stroke="#ebd7d0" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
      <div className="doodle doodle-sparkle-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z" fill="#fecad4" stroke="#e3627d" strokeWidth="1"/>
        </svg>
      </div>
      <div className="doodle doodle-sparkle-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z" fill="none" stroke="#e3627d" strokeWidth="1.5" strokeDasharray="2 2"/>
        </svg>
      </div>
      <div className="doodle doodle-sparkle-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4 L13.8 9.5 L19.5 11.3 L13.8 13.1 L12 18.6 L10.2 13.1 L4.5 11.3 L10.2 9.5 Z" fill="none" stroke="#ebd7d0" strokeWidth="2"/>
        </svg>
      </div>
      <div className="doodle doodle-flower-1">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill="#ffe2e7" stroke="#e3627d" strokeWidth="1.5"/>
          <circle cx="12" cy="7"  r="2.5" fill="none" stroke="#e3627d" strokeWidth="1.5"/>
          <circle cx="12" cy="17" r="2.5" fill="none" stroke="#e3627d" strokeWidth="1.5"/>
          <circle cx="7"  cy="12" r="2.5" fill="none" stroke="#e3627d" strokeWidth="1.5"/>
          <circle cx="17" cy="12" r="2.5" fill="none" stroke="#e3627d" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Main content */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-serif-top">You Make Memories,</span>
          <span className="title-serif-middle">We Make Them</span>
          <span className="title-script-bottom">Forever</span>
        </h1>

        <div className="description-box-container">
          <div className="bow-icon">
            <svg width="48" height="28" viewBox="0 0 40 24" fill="none">
              <path d="M20 12 C18 6, 10 3, 10 9 C10 15, 18 12, 20 12 C22 12, 30 15, 30 9 C30 3, 22 6, 20 12 Z" stroke="#e3627d" strokeWidth="2.2" fill="#ffd5dd" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 12 C18 15, 17 21, 15 22 M20 12 C22 15, 23 21, 25 22" stroke="#e3627d" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="20" cy="12" r="2.2" fill="#e3627d"/>
            </svg>
          </div>
          <div className="description-box">
            <p>
              At Memoroids by Shehana, we bring your memories to life through handcrafted Polaroids, albums, and personalized frames. Each piece is made with love, care, and creativity — designed to make your special moments last forever.
            </p>
          </div>
        </div>

        <div className="hero-buttons-container">
          <div className="button-wrapper">
            <button className="btn shop-btn" onClick={handleShopNowClick}>
              <span className="btn-stitch-inner"></span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
                <path d="M12 15.5 C11.6 15, 10.3 14.1, 10.3 13.3 C10.3 12.6, 10.9 12.1, 11.5 12.1 C11.8 12.1, 12 12.3, 12 12.3 C12 12.3, 12.2 12.1, 12.5 12.1 C13.1 12.1, 13.7 12.6, 13.7 13.3 C13.7 14.1, 12.4 15, 12 15.5 Z" fill="currentColor"/>
              </svg>
              Shop Now
            </button>
            <span className="button-sparkle sparkles-right">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5 L13 10 L18 11 L13 12 L12 17 L11 12 L6 11 L11 10 Z" fill="#e3627d"/>
              </svg>
            </span>
          </div>

          <div className="button-wrapper">
            <button className="btn gallery-btn" onClick={handleViewGalleryClick}>
              <span className="btn-stitch-inner"></span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                <rect x="4" y="6" width="12" height="12" rx="1.5" transform="rotate(-8 10 12)" strokeWidth="1.8"/>
                <rect x="7" y="4" width="12" height="12" rx="1.5" fill="#fff" strokeWidth="1.8"/>
                <path d="M13 9.5 C12.7 9.1, 12 8.6, 12 8.1 C12 7.6, 12.4 7.2, 12.9 7.2 C13.1 7.2, 13.2 7.3, 13.2 7.3 C13.2 7.3, 13.3 7.2, 13.5 7.2 C14 7.2, 14.4 7.6, 14.4 8.1 C14.4 8.6, 13.7 9.1, 13 9.5 Z" fill="#e3627d"/>
              </svg>
              View Gallery
            </button>
            <span className="button-sparkle sparkles-right">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5 L13 10 L18 11 L13 12 L12 17 L11 12 L6 11 L11 10 Z" fill="#9a5858"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

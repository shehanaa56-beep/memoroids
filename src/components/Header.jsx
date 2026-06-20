import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Memoroids</h1>
          <span>BY SHEHANA</span>
        </div>
        
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {/* Desktop Nav Links */}
          <ul className="desktop-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/custom-orders">Custom Orders</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>

          {/* Mobile Nav Cards */}
          <div className="mobile-links-container">
            <div className="mobile-menu-section">
              <span className="section-title">EXPLORE</span>
              <div className="section-divider">
                <span className="line"></span>
                <span className="diamond">✦</span>
                <span className="line"></span>
              </div>
            </div>

            <Link to="/" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span className="card-label">HOME</span>
            </Link>

            <Link to="/shop" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </span>
              <span className="card-label">SHOP</span>
            </Link>

            <Link to="/gallery" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </span>
              <span className="card-label">GALLERY</span>
            </Link>

            <Link to="/about" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
              <span className="card-label">ABOUT US</span>
            </Link>

            <Link to="/reviews" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <span className="card-label">REVIEWS</span>
            </Link>

            <Link to="/custom-orders" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="M9 14h6" />
                  <path d="M9 18h6" />
                  <path d="M9 10h6" />
                </svg>
              </span>
              <span className="card-label">CUSTOM ORDERS</span>
            </Link>

            <div className="mobile-menu-section" style={{ marginTop: '1.5rem' }}>
              <span className="section-title">ACCOUNT</span>
              <div className="section-divider">
                <span className="line"></span>
                <span className="diamond">✦</span>
                <span className="line"></span>
              </div>
            </div>

            <Link to="/login" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <span className="card-label">LOGIN</span>
            </Link>
          </div>
        </nav>

        <div className="menu-icon" onClick={toggleMenu}>
          <span>{isMenuOpen ? '✕' : '☰'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

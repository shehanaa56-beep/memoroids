import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>Memoroids</h2>
          <span>BY SHEHANA</span>
          <p>Crafting memories into timeless keepsakes with love and creativity.</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/memoroids__?igsh=MWs2YmlyanZ6Z2xkbw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">🅾</a>
            <a href="mailto:memoroidsbyshehana@gmail.com" aria-label="Email">🖂</a>
            <a href="https://wa.me/9037258541" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">✆</a>
          </div>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
                     <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/custom-orders">Custom Orders</Link></li>
          </ul>
        </div>
        <div className="footer-section support">
          <h3>Support</h3>
          <ul>
            <li>Contact Us</li>
            <li>Reviews</li>
            <li>FAQ</li>
            <li>Shipping Policy</li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Get in Touch</h3>
          <p><strong>Email:</strong> memoroidsbyshehana@gmail.com</p>
          <p><strong>WhatsApp:</strong> +91 9037258541</p>
          <p><strong>Instagram:</strong> @memoroids</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Memoroids by Shehana. All rights reserved.</p>
        <div className="footer-legal">
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

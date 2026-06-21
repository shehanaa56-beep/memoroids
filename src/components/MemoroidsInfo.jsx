import React from 'react';
import './MemoroidsInfo.css';

const MemoroidsInfo = () => {
  return (
    <section className="memoroids-info-section">
      {/* Wavy Divider at the Top */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="#ffdce3">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,80L1320,80C1200,80,960,80,720,80C480,80,240,80,120,80L0,80Z"></path>
        </svg>
      </div>

      {/* Main Grid Content */}
      <div className="info-grid-container">
        <div className="info-grid">
          
          {/* Column 1: Lined Paper Sticky Note */}
          <div className="sticky-note-wrapper">
            <div className="sticky-note">
              <div className="paperclip-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9 v7 a5 5 0 0 0 10 0 v-8 a3 3 0 0 0 -6 0 v7 a1 1 0 0 0 2 0 v-6" />
                </svg>
              </div>
              <p className="sticky-text">
                Made<br />with love,<br />just for you
              </p>
              <span className="sticky-heart">❤</span>
            </div>
          </div>

          {/* Column 2: Dark/Black Polaroid Frame */}
          <div className="polaroid-black-wrapper">
            <div className="polaroid-black">
              <span className="black-frame-heart">❤</span>
              <img src="images/shan.jfif" alt="Shehana - Creator" />
            </div>
          </div>

          {/* Column 3: Features List */}
          <div className="features-list-wrapper">
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e3627d" stroke="#e3627d" strokeWidth="1">
                    <path d="M12 21 C11.3 20.3, 3.5 13.5, 3.5 9 C3.5 5.5, 6.5 2.5, 10 2.5 C11.9 2.5, 12 3.5, 12 3.5 C12 3.5, 12.1 2.5, 14 2.5 C17.5 2.5, 20.5 5.5, 20.5 9 C20.5 13.5, 12.7 20.3, 12 21 Z" />
                  </svg>
                </div>
                <span className="feature-text">Handmade with Love</span>
              </div>

              <div className="feature-item">
                <div className="feature-icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e3627d" stroke="#e3627d" strokeWidth="1">
                    <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" />
                  </svg>
                </div>
                <span className="feature-text">High Quality Materials</span>
              </div>

              <div className="feature-item">
                <div className="feature-icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e3627d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="8" width="18" height="14" rx="2" ry="2" />
                    <path d="M12 5 C10.5 2, 7 3, 9 7" />
                    <path d="M12 5 C13.5 2, 17 3, 15 7" />
                    <line x1="12" y1="22" x2="12" y2="8" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                  </svg>
                </div>
                <span className="feature-text">Perfect for Every Occasion</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dashed Border & Footer Support Bar */}
      <div className="sub-footer-divider"></div>
      <div className="sub-footer-bar">
        <p className="sub-footer-text">Thank you for supporting small & handmade ♡</p>
      </div>
    </section>
  );
};

export default MemoroidsInfo;

import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

const About = () => {
  return (
    <div className="about-page">

      {/* ── Background doodles ── */}
      <div className="ab-doodle ab-doodle-heart-tl">❤</div>
      <div className="ab-doodle ab-doodle-heart-tr">♡</div>
      <div className="ab-doodle ab-doodle-heart-ml">♡</div>
      <div className="ab-doodle ab-doodle-sparkle-1">✦</div>
      <div className="ab-doodle ab-doodle-sparkle-2">✦</div>
      <div className="ab-doodle ab-doodle-sparkle-3">✦</div>
      <div className="ab-doodle ab-doodle-camera">
        <svg viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="14" width="56" height="34" rx="6" fill="#fff" stroke="#f497a9" strokeWidth="2.5"/>
          <path d="M22 14V10a4 4 0 014-4h12a4 4 0 014 4v4" stroke="#f497a9" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="32" cy="31" r="10" stroke="#f497a9" strokeWidth="2.5"/>
          <circle cx="32" cy="31" r="5" stroke="#f497a9" strokeWidth="2.5"/>
          <circle cx="49" cy="20" r="2.5" fill="#f497a9"/>
          <path d="M12 25h4" stroke="#f497a9" strokeWidth="2" strokeLinecap="round"/>
          {/* heart lens */}
          <path d="M32 34 C31.5 33.5, 28 30.5, 28 28.5 C28 27.1, 29.1 26, 30.5 26 C31.2 26, 32 26.7, 32 26.7 C32 26.7, 32.8 26, 33.5 26 C34.9 26, 36 27.1, 36 28.5 C36 30.5, 32.5 33.5, 32 34 Z" fill="#f497a9"/>
        </svg>
      </div>

      {/* ── Header section ── */}
      <motion.div className="ab-header" {...fadeUp(0)}>
        <p className="ab-label">About Us ♡</p>

        <div className="ab-header-grid">
          {/* Left: heading */}
          <div className="ab-heading-col">
            <h1 className="ab-title">
              Meet Shehana —<br/>
              <span className="ab-title-pink">The Creative Mind<br/>Behind Memoroids</span>
              <span className="ab-title-heart"> ♡</span>
            </h1>
          </div>

          {/* Right: polaroid of flower */}
          <div className="ab-header-polaroid-col">
            <div className="ab-header-polaroid">
              <div className="ab-polaroid-clip">
                <svg viewBox="0 0 20 30" fill="none" width="20">
                  <path d="M10 2 C6 2, 3 5, 3 9 C3 13, 5 15, 5 19 C5 22, 7 24, 10 24 C13 24, 15 22, 15 19 C15 15, 17 13, 17 9 C17 5, 14 2, 10 2 Z" stroke="#aaa" strokeWidth="1.5" fill="none"/>
                  <path d="M10 2 C8 2, 6 3, 6 5 C6 7, 8 8, 10 8 C12 8, 14 7, 14 5 C14 3, 12 2, 10 2 Z" stroke="#aaa" strokeWidth="1.5" fill="#f0f0f0"/>
                </svg>
              </div>
              <img src="/images/rv5.jfif" alt="Pink flowers" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Middle row: sticky note | circular photo | speech bubble ── */}
      <motion.div className="ab-middle-row" {...fadeUp(0.15)}>

        {/* Sticky note */}
        <div className="ab-sticky-note">
          <div className="ab-sticky-clip">
            <svg viewBox="0 0 20 30" fill="none" width="16">
              <path d="M10 2 C6 2, 3 5, 3 9 C3 13, 5 15, 5 19 C5 22, 7 24, 10 24 C13 24, 15 22, 15 19 C15 15, 17 13, 17 9 C17 5, 14 2, 10 2 Z" stroke="#aaa" strokeWidth="1.5" fill="none"/>
              <path d="M10 2 C8 2, 6 3, 6 5 C6 7, 8 8, 10 8 C12 8, 14 7, 14 5 C14 3, 12 2, 10 2 Z" stroke="#aaa" strokeWidth="1.5" fill="#f0f0f0"/>
            </svg>
          </div>
          <p>Made<br/>with love,<br/>just for you</p>
          <span className="ab-sticky-heart">❤</span>
        </div>

        {/* Circular photo with flowers */}
        <div className="ab-photo-wrapper">
          <div className="ab-flower ab-flower-tl">✿</div>
          <div className="ab-flower ab-flower-tr">✿</div>
          <div className="ab-flower ab-flower-bl">✿</div>
          <div className="ab-flower ab-flower-br">✿</div>
          <div className="ab-circle-photo">
            <img src="/images/shan.jfif" alt="Shehana" />
          </div>
        </div>

        {/* Speech bubble */}
        <div className="ab-speech-bubble">
          <p>"Every memory has a story, we just give it a forever home."</p>
        </div>

      </motion.div>

      {/* ── Bio paragraph with bow ── */}
      <motion.div className="ab-bio-container" {...fadeUp(0.25)}>
        <div className="ab-bow">
          <svg width="52" height="30" viewBox="0 0 40 24" fill="none">
            <path d="M20 12 C18 6, 10 3, 10 9 C10 15, 18 12, 20 12 C22 12, 30 15, 30 9 C30 3, 22 6, 20 12 Z" stroke="#e3627d" strokeWidth="2" fill="#ffd5dd" strokeLinecap="round"/>
            <path d="M20 12 C18 15, 17 21, 15 22 M20 12 C22 15, 23 21, 25 22" stroke="#e3627d" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="20" cy="12" r="2" fill="#e3627d"/>
          </svg>
        </div>
        <div className="ab-bio-box">
          <p>
            Hey, I'm Shehana — the creator of Memoroids. What started as a small craft passion became a creative studio dedicated to preserving your memories in the most personal way possible. Every frame, every cut, and every detail is made by hand, with your story in mind.
          </p>
          <div className="ab-bio-heart-r">♡</div>
          <div className="ab-bio-heart-l">❤</div>
        </div>
      </motion.div>

      {/* ── Mission section ── */}
      <motion.div className="ab-mission-section" {...fadeUp(0.35)}>

        {/* Left deco: flowers */}
        <div className="ab-mission-deco-left">
          <svg viewBox="0 0 60 120" fill="none" width="45">
            <line x1="30" y1="120" x2="30" y2="30" stroke="#c9a0a0" strokeWidth="2"/>
            <circle cx="30" cy="22" r="8" fill="#ffd5dd" stroke="#f497a9" strokeWidth="1.5"/>
            <circle cx="22" cy="30" r="7" fill="#ffd5dd" stroke="#f497a9" strokeWidth="1.5"/>
            <circle cx="38" cy="30" r="7" fill="#ffd5dd" stroke="#f497a9" strokeWidth="1.5"/>
            <circle cx="30" cy="38" r="7" fill="#ffd5dd" stroke="#f497a9" strokeWidth="1.5"/>
            <circle cx="30" cy="30" r="5" fill="#ffb0c0" stroke="#f497a9" strokeWidth="1.5"/>
          </svg>
        </div>

        <div className="ab-mission-content">
          <div className="ab-mission-badge">Our Mission</div>
          <p className="ab-mission-text">
            To turn every captured moment into a piece of art that lasts forever. ♡<br/>
            We believe that memories deserve to be felt, not just seen — and every creation we make reflects that belief.
          </p>

          <div className="ab-pillars">
            <div className="ab-pillar">
              <div className="ab-pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e3627d" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 21 C11.3 20.3, 3.5 13.5, 3.5 9 C3.5 5.5, 6.5 2.5, 10 2.5 C11.9 2.5, 12 3.5, 12 3.5 C12 3.5, 12.1 2.5, 14 2.5 C17.5 2.5, 20.5 5.5, 20.5 9 C20.5 13.5, 12.7 20.3, 12 21 Z"/>
                </svg>
              </div>
              <span>Made with Love</span>
            </div>
            <div className="ab-pillar">
              <div className="ab-pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e3627d" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 21C12 21 4 15 4 9a8 8 0 0116 0c0 6-8 12-8 12z"/>
                  <path d="M12 9l1.5 3 3 .5-2.2 2 .5 3L12 16l-2.8 1.5.5-3L7.5 12.5l3-.5z"/>
                </svg>
              </div>
              <span>Handcrafted with Care</span>
            </div>
            <div className="ab-pillar">
              <div className="ab-pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e3627d" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="8" width="18" height="12" rx="2"/>
                  <path d="M8 8V6a4 4 0 018 0v2"/>
                  <circle cx="12" cy="14" r="2"/>
                </svg>
              </div>
              <span>Personalized for You</span>
            </div>
            <div className="ab-pillar">
              <div className="ab-pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e3627d" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="8" width="18" height="13" rx="2"/>
                  <path d="M12 8V21M3 13h18"/>
                  <path d="M8 8C8 5 10 3 12 3s4 2 4 5"/>
                </svg>
              </div>
              <span>Perfect for Every Occasion</span>
            </div>
          </div>
        </div>

        {/* Right deco: polaroid */}
        <div className="ab-mission-deco-right">
          <div className="ab-mission-polaroid">
            <div className="ab-mission-tape"></div>
            <img src="/images/rv3.jfif" alt="flowers" />
          </div>
        </div>

      </motion.div>

      {/* ── Footer banner ── */}
      <div className="ab-footer-banner">
        <span className="ab-footer-heart">♡</span>
        <span>Thank you for supporting small &amp; handmade</span>
        <span className="ab-footer-heart">♡</span>
      </div>

    </div>
  );
};

export default About;

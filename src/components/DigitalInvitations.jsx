import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DigitalInvitations.css';

const features = [
  { icon: 'bi-phone', label: 'Mobile\nFriendly', position: 'feat-tl' },
  { icon: 'bi-brush', label: 'Custom\nDesigns', position: 'feat-tr' },
  { icon: 'bi-envelope-paper-heart', label: 'Instant\nDelivery', position: 'feat-bl' },
  { icon: 'bi-share', label: 'Easy to\nShare', position: 'feat-br' },
];

const perfectFor = [
  { icon: 'bi-gem', label: 'Weddings' },
  { icon: 'bi-moon-stars', label: 'Nikah' },
  { icon: 'bi-ring', label: 'Engagements' },
  { icon: 'bi-music-note-beamed', label: 'Receptions' },
  { icon: 'bi-balloon-heart', label: 'Birthday' },
  { icon: 'bi-star', label: 'Cradle Ceremony' },
];

const showcaseWorks = [
  { id: 1, title: 'Elegant Islamic Invitation', duration: '00:45', video: '/video/1.mp4' },
  { id: 2, title: 'Soft Pink Islamic Invitation', duration: '00:50', video: '/video/2.mp4' },
];

const DigitalInvitations = () => {
  const navigate = useNavigate();
  const showcaseRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);
  const videoRefs = useRef({});

  const scrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlayVideo = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id) {
      video.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId].pause();
      }
      video.play();
      setPlayingId(id);
    }
  };

  const handleVideoEnded = (id) => {
    if (playingId === id) setPlayingId(null);
  };

  return (
    <div className="di-page">
      {/* ===== HERO SECTION ===== */}
      <section className="di-hero">
        {/* Decorative floral elements */}
        <div className="di-floral di-floral-left"></div>
        <div className="di-floral di-floral-right"></div>

        {/* Floating sparkles */}
        <span className="di-sparkle di-sp-1">✦</span>
        <span className="di-sparkle di-sp-2">✦</span>
        <span className="di-sparkle di-sp-3"><i className="bi bi-heart-fill"></i></span>
        <span className="di-sparkle di-sp-4"><i className="bi bi-heart"></i></span>
        <span className="di-sparkle di-sp-5">✦</span>

        {/* Title */}
        <div className="di-hero-heading">
          <span className="di-label">D I G I T A L</span>
          <h1 className="di-title">
            WEDDING<br />
            <span className="di-title-script">Invitations</span>
          </h1>
          <p className="di-subtitle">
            Beautifully designed. Digitally delivered.<br />
            Forever cherished.
          </p>
        </div>

        {/* Phone Mockup with Feature Badges */}
        <div className="di-mockup-section">
          {/* Feature badges floating around the phone */}
          {features.map((feat, i) => (
            <div key={i} className={`di-feat-badge ${feat.position}`}>
              <div className="di-feat-icon-circle">
                <i className={`bi ${feat.icon}`}></i>
              </div>
              <span className="di-feat-label">{feat.label}</span>
            </div>
          ))}

          {/* Phone frame */}
          <div className="di-phone-frame">
            <div className="di-phone-notch"></div>
            <div className="di-phone-screen">
              <img
                src="/images/invitation-sample.png"
                alt="Sample wedding invitation design"
                className="di-phone-img"
              />
            </div>
          </div>
        </div>

        {/* "Perfect For" Chips */}
        <div className="di-perfect-for">
          <span className="di-pf-title">P E R F E C T&nbsp;&nbsp;F O R</span>
          <div className="di-pf-chips">
            {perfectFor.map((pf, i) => (
              <div key={i} className="di-pf-chip">
                <i className={`bi ${pf.icon}`}></i>
                <span>{pf.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="di-cta-group">
          <button className="di-cta-primary" onClick={() => navigate('/custom-orders')}>
            <i className="bi bi-bag-heart"></i> ORDER NOW
          </button>
          <button className="di-cta-outline" onClick={scrollToShowcase}>
            VIEW SAMPLES
          </button>
        </div>
      </section>

      {/* ===== OUR WORKS SHOWCASE ===== */}
      <section className="di-showcase" ref={showcaseRef}>
        {/* Decorative florals */}
        <div className="di-floral di-floral-left"></div>
        <div className="di-floral di-floral-right"></div>
        <span className="di-sparkle" style={{ top: '60px', left: '12%', fontSize: '12px' }}>✦</span>
        <span className="di-sparkle" style={{ bottom: '80px', right: '10%', fontSize: '10px' }}>✦</span>

        <div className="di-showcase-heading">
          <span className="di-title-script" style={{ fontSize: '1.6rem', color: '#c9a96e' }}>A Glimpse of</span>
          <h2 className="di-section-title" style={{ marginTop: '-4px' }}>
            Our Works
          </h2>
          <p className="di-section-subtitle">
            Thoughtfully designed. Beautifully delivered.
          </p>
        </div>

        <div className="di-showcase-list">
          {showcaseWorks.map((work) => (
            <div key={work.id} className="di-showcase-card">
              <div className="di-iphone-frame">
                <div className="di-iphone-notch"></div>
                <div className="di-iphone-screen">
                  <video
                    ref={(el) => (videoRefs.current[work.id] = el)}
                    src={work.video}
                    className="di-showcase-video"
                    playsInline
                    muted
                    preload="metadata"
                    onEnded={() => handleVideoEnded(work.id)}
                    onClick={() => handlePlayVideo(work.id)}
                  />
                  {/* Play button overlay */}
                  {playingId !== work.id && (
                    <button
                      className="di-play-btn"
                      onClick={() => handlePlayVideo(work.id)}
                      aria-label={`Play ${work.title}`}
                    >
                      <i className="bi bi-play-fill"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="di-showcase-info">
                <span className="di-showcase-title">{work.title}</span>
                <div className="di-showcase-meta">
                  <span className="di-showcase-duration">{work.duration}</span>
                  <i className="bi bi-heart"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="di-showcase-cta">
          <button className="di-cta-primary" onClick={() => navigate('/custom-orders')}>
            <i className="bi bi-stars"></i> View More Designs <i className="bi bi-chevron-right"></i>
          </button>
          <button className="di-cta-outline" onClick={() => navigate('/custom-orders')}>
            <i className="bi bi-whatsapp"></i> Order Your Invitation
          </button>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="di-how">
        <div className="di-how-heading">
          <span className="di-label">H O W&nbsp;&nbsp;I T&nbsp;&nbsp;W O R K S</span>
          <h2 className="di-section-title">
            Three Simple Steps
          </h2>
        </div>
        <div className="di-steps">
          <div className="di-step">
            <div className="di-step-num">1</div>
            <div className="di-step-text">
              <h4>Choose Your Style</h4>
              <p>Pick a template or describe your dream design</p>
            </div>
          </div>
          <div className="di-step-connector">
            <i className="bi bi-arrow-right"></i>
          </div>
          <div className="di-step">
            <div className="di-step-num">2</div>
            <div className="di-step-text">
              <h4>Share Your Details</h4>
              <p>Send us your names, date, venue & preferences</p>
            </div>
          </div>
          <div className="di-step-connector">
            <i className="bi bi-arrow-right"></i>
          </div>
          <div className="di-step">
            <div className="di-step-num">3</div>
            <div className="di-step-text">
              <h4>Receive & Share</h4>
              <p>Get your digital invitation ready to send</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalInvitations;

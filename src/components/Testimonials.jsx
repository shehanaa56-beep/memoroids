import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    initial: "A",
    quote: "Absolutely loved my mini album from Memoroids! The details were beautiful and it made the perfect gift.",
    name: "Ameena",
    image: "rv1.jfif",
    clip: "paperclip"
  },
  {
    initial: "R",
    quote: "Great quality and fast delivery. Will order again for sure.",
    name: "Rohan",
    image: "rv2.jfif",
    clip: "tape_polka"
  },
  {
    initial: "R",
    quote: "The personalized frame I ordered was beyond my expectations. Every detail was crafted with such care and love.",
    name: "Riya",
    image: "rv3.jfif",
    clip: "tape_pink"
  },
  {
    initial: "F",
    quote: "The custom polaroids captured our wedding memories perfectly. Highly recommend!",
    name: "Farsana",
    image: "rv4.jfif",
    clip: "paperclip"
  },
  {
    initial: "D",
    quote: "They are so nice your service is best thankyou for this!!loved itt",
    name: "Disha",
    image: "rv5.jfif",
    clip: "tape_polka"
  },
  {
    initial: "F",
    quote: "Personalized touch made all the difference. My kids love their memory book!",
    name: "Fathima",
    image: "rv6.jfif",
    clip: "tape_pink"
  }
];

const QuoteStart = () => (
  <svg className="quote-icon start" viewBox="0 0 24 24" fill="#f497a9">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const QuoteEnd = () => (
  <svg className="quote-icon end" viewBox="0 0 24 24" fill="#f497a9">
    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
  </svg>
);

const FlowerDec = () => (
  <svg className="flower-dec-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 20C40 10 25 15 25 30C25 45 40 50 50 50C60 50 75 45 75 30C75 15 60 10 50 20Z" fill="#ffb3c6" stroke="#f497a9" strokeWidth="2"/>
    <path d="M80 50C90 40 95 55 80 75C65 95 50 80 50 70C50 60 65 55 80 50Z" fill="#ffb3c6" stroke="#f497a9" strokeWidth="2"/>
    <path d="M50 80C60 90 75 85 75 70C75 55 60 50 50 50C40 50 25 55 25 70C25 85 40 90 50 80Z" fill="#ffb3c6" stroke="#f497a9" strokeWidth="2"/>
    <path d="M20 50C10 60 5 45 20 25C35 5 50 20 50 30C50 40 35 45 20 50Z" fill="#ffb3c6" stroke="#f497a9" strokeWidth="2"/>
    <circle cx="50" cy="50" r="12" fill="#fff" stroke="#f497a9" strokeWidth="2"/>
  </svg>
);

const PaperclipDec = () => (
  <svg className="clip-dec-svg" viewBox="0 0 24 24" fill="none" stroke="#f497a9" strokeWidth="2" strokeLinecap="round">
    <path d="M8 8v8a4 4 0 0 0 8 0V6a6 6 0 0 0-12 0v11a8 8 0 0 0 16 0V8" />
    <rect x="8" y="2" width="8" height="6" fill="#fff" rx="1" strokeWidth="1.5" />
    <path d="M10 5h4" stroke="#ffb3c6" strokeWidth="1.5" />
  </svg>
);

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      {/* Background doodles */}
      <div className="bg-doodle doodle-heart-big">❤</div>
      <div className="bg-doodle doodle-heart-small">♡</div>
      <div className="bg-doodle doodle-sparkle-1">✨</div>
      <div className="bg-doodle doodle-sparkle-2">✨</div>
      <div className="bg-doodle doodle-camera">
        <svg viewBox="0 0 24 24" fill="none" stroke="#5c4040" strokeWidth="1.2">
          <rect x="3" y="8" width="18" height="12" rx="2" fill="#fff" />
          <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" />
          <circle cx="12" cy="14" r="4" />
          <circle cx="12" cy="14" r="1.5" fill="#5c4040" />
        </svg>
      </div>
      <div className="bg-doodle doodle-flower">✿</div>

      <div className="testi-header">
        <h2 className="testi-title-top">What Our</h2>
        <h2 className="testi-title-bottom">Clients Say</h2>
        <div className="testi-heart-divider">
          <span className="line"></span>
          <span className="heart">❤</span>
          <span className="line"></span>
        </div>
        <p className="testi-subtitle">Hear from our happy customers<br/>about their Memoroids experience</p>
      </div>

      <div className="testi-cards-container">
        {testimonials.map((t, index) => (
          <div key={index} className={`testi-card ${index % 2 !== 0 ? 'card-alt' : ''}`}>
            <div className="testi-inner-dashed">
              <div className="testi-initial-circle">
                <span>{t.initial}</span>
              </div>
              
              <div className="testi-content">
                <div className="testi-text-col">
                  <div className="testi-quote-wrapper">
                    <QuoteStart />
                    <p className="testi-quote-text">"{t.quote}"</p>
                    <QuoteEnd />
                  </div>
                  <p className="testi-author">— {t.name} <span className="author-heart">♡</span></p>
                </div>

                <div className="testi-photo-col">
                  <div className="testi-polaroid-wrapper">
                    <div className="testi-clip-wrapper">
                      {t.clip === 'tape_pink' && <div className="testi-washi-tape pink"></div>}
                      {t.clip === 'tape_polka' && <div className="testi-washi-tape polka"></div>}
                      {t.clip === 'paperclip' && <div className="testi-paperclip"><PaperclipDec /></div>}
                    </div>
                    <div className="testi-polaroid">
                      <img src={`/images/${t.image}`} alt={`Review from ${t.name}`} />
                    </div>
                    <div className="testi-flower-dec">
                      <FlowerDec />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Small decorative heart floating near the card */}
            <div className="testi-float-heart">❤</div>
          </div>
        ))}
      </div>

      <div className="testi-footer-banner">
        <div className="stitched-banner">
          <span className="banner-icon">♡</span>
          <span>Thank you for supporting small & handmade</span>
          <span className="banner-icon">♡</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

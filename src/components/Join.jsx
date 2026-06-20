import React from 'react';
import './Join.css';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

const Join = () => {
  return (
    <section className="join-shehana-family">
      <div className="icon">✉︎</div>
      <h2>Join Our Memoroids Family!</h2>
      <p>
        Celebrate timeless elegance and trusted craftsmanship with us. Each piece connects you to a family that values beauty and tradition
      </p>
      <button onClick={() => window.open('https://www.instagram.com/memoroids__?igsh=MWs2YmlyanZ6Z2xkbw==', '_blank')}>
        CLICK HERE
      </button>
    </section>
  );
};

export default Join;

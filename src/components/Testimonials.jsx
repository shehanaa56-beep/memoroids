import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    initial: "A",
    quote: "Absolutely loved my mini album from Memoroids! The details were beautiful and it made the perfect gift.",
    name: "Ameena"
  },
  {
    initial: "R",
    quote: "Great quality and fast delivery. Will order again for sure.",
    name: "Rena"
  },
  {
    initial: "R",
    quote: "The personalized frame I ordered was beyond my expectations. Every detail was crafted with such care and love.",
    name: "Riya"
  },
   {
    initial: "F",
    quote: "The custom polaroids captured our wedding memories perfectly. Highly recommend!",
    name: "Farsana"
  },
     {
    initial: "D",
    quote: "They are so nice your service is best thankyou for this!!loved itt",
    name: "Disha"
  },
     {
    initial: "F",
    quote: "Personalized touch made all the difference. My kids love their memory book!",
    name: "Fathima"
  }
  
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <p>Hear from our happy customers about their Memoroids experience</p>
      <div className="testimonial-cards">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <div className="initial-circle">{t.initial}</div>
            <p className="quote">"{t.quote}"</p>
            <p className="name">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

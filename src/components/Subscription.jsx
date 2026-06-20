import React, { useState } from 'react';
import './Subscription.css';

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }
    try {
      // TODO: Implement subscription with backend API
      // For now, just show success message
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
    }
  };

  return (
    <section className="subscription">
      <div className="subscription-content">
        <div className="email-icon">✉️</div>
        <h2>Join Our Memoroids Family!</h2>
        <p>Celebrate timeless elegance and trusted craftsmanship with us. Each piece connects you to a family that values beauty and tradition</p>
        <form onSubmit={handleSubscribe} className="subscription-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </section>
  );
};

export default Subscription;

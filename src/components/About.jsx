import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="about-header"
      >
        <h1>Meet Shehana — the Creative Mind<br></br> Behind Memoroids</h1>
        <img src="images/shan.jfif" alt="Shehana" className="about-image" />
        <p>
          Hey, I'm Shehana — the creator of Memoroids. What started as a small craft passion became a creative studio dedicated to preserving your memories in the most personal way possible.
          Every frame, every cut, and every detail is made by hand, with your story in mind.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="about-mission"
      >
        <h2>Our Mission</h2>
        <p>
          To turn every captured moment into a piece of art that lasts forever.We believe that memories deserve to be felt, not just seen — and every creation we make reflects that belief.
        </p>
      </motion.div>
    </div>
  );
};

export default About;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Reviews.css';
import {
  DraggableCardBody,
} from './ui/draggable-card';

export function DraggableCardDemo() {
  const items = [
    {
      title: "Dispatched❤️",
      image:'images/rv1.jfif',
      className: "card-1",
    },
    {
      title: "DispatchedToday💛",
      image:'images/rv2.jfif',
      className: "card-2",
    },
    {
      title: "DispatchedTomorrow❤️",
      image:'images/rv3.jfif',
    },
    {
      title: "DispatchedYesterday🖤",
      image: 'images/rv4.jfif',
      className: "card-4",
    },
    {
      title: "Dispatched💕",
      image:'images/rv5.jfif',
    },
    {
      title: "Dispatched💖",
      image:'images/rv6.jfif',
    },
    {
      title: "Dispatched💝",
      image:'images/rv7.jfif',
    },
  ];
  return (
    <div className="draggable-card-container">
      {items.map((item, index) => (
        <DraggableCardBody key={index} className={`draggable-card-body ${item.className}`}>
          <img
            src={item.image}
            alt={item.title}
          />
          <h3>{item.title}</h3>
        </DraggableCardBody>
      ))}
    </div>
  );
}

const Reviews = () => {
  const reviews = [
    { name: 'Ameena', text: 'Absolutely loved my mini album from Memoroids! The details were beautiful and it made the perfect gift.', rating: 5 },
    { name: 'Sara', text: 'The custom polaroids captured our wedding memories perfectly. Highly recommend!', rating: 5 },
    { name: 'Ahmed', text: 'Great quality and fast delivery. Will order again for sure.', rating: 5 },
    { name: 'Fatima', text: 'Personalized touch made all the difference. My kids love their memory book!', rating: 5 },
    { name: 'Omar', text: 'Professional service and amazing craftsmanship. Worth every penny.', rating: 5 },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const imageReviews = [
    { image: '/images/r1.jfif' },
    { image: '/images/r2.jfif'},
    { image: '/images/r3.jfif'},
    { image: '/images/r4.jfif'},
    { image: '/images/r6.jfif'},
    { image: '/images/r7.jfif'},
    { image: '/images/r8.jfif'},
    { image: '/images/r9.jfif'},
    { image: '/images/r10.jfif'},
    { image: '/images/r11.jfif'},
    { image: '/images/r12.jfif'},
    { image: '/images/r13.jfif'},
    { image: '/images/r14.jfif'},
    { image: '/images/r15.jfif'},
    { image: '/images/r16.jfif'},
    { image: '/images/r17.jfif'},
    { image: '/images/r18.jfif'},
    { image: '/images/r19.jfif'},
    { image: '/images/r20.jfif'},
    { image: '/images/r21.jfif'},
    { image: '/images/r22.jfif'},
    { image: '/images/r23.jfif'},
    { image: '/images/r24.jfif'},
    { image: '/images/r25.jfif'},
    { image: '/images/r26.jfif'},
    { image: '/images/r27.jfif'},
    { image: '/images/r28.jfif'},
    { image: '/images/r29.jfif'},
    { image: '/images/r30.jfif'},
    { image: '/images/r31.jfif'},
    { image: '/images/r32.jfif'},
    { image: '/images/r33.jfif'},
    { image: '/images/r34.jfif'},
    { image: '/images/r35.jfif'},
    { image: '/images/r36.jfif'},
    { image: '/images/r37.jfif'},
    { image: '/images/r40.jfif'},
    { image: '/images/r41.jfif'},
    { image: '/images/r42.jfif'},
    { image: '/images/r43.jfif'},
    { image: '/images/r44.jfif'},
    { image: '/images/r45.jfif'},
    { image: '/images/r46.jfif'},
    { image: '/images/r47.jfif'},
    { image: '/images/r49.jfif'},
  ];

  return (
    <div className="reviews-container">
      <DraggableCardDemo />
      <h1 className="reviews-title">Customer Reviews</h1>
      
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="review-card"
          >
            <div className="review-rating">
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <p className="review-text">"{review.text}"</p>
            <p className="review-name">- {review.name}</p>
          </motion.div>
        ))}
      </div>

      <h2 className="image-reviews-title">Screenshot Reviews</h2>
      <div className="image-reviews-grid">
        {imageReviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="image-review-card"
          >
            <img src={review.image} alt="Customer Review" onClick={() => setSelectedImage(review.image)} />
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Enlarged Review" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default Reviews;

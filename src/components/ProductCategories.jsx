import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCategories.css';

const featuredCategories = [
  {
    id: 1,
    title: "Custom Polaroids",
    tagline: "Your memories, beautifully printed to hold forever.",
    image: "images/32.jfif",
    icon: "bi-heart-fill",
    link: "/shop"
  },
  {
    id: 2,
    title: "Mini Albums",
    tagline: "Handcrafted albums that tell your story.",
    image: "images/70.jfif",
    icon: "bi-stars",
    link: "/shop"
  },
  {
    id: 3,
    title: "Frames",
    tagline: "Showcase your memories in the most elegant way.",
    image: "images/7.jfif",
    icon: "bi-image-fill",
    link: "/shop"
  },
  {
    id: 4,
    title: "Scrapbooks",
    tagline: "Personalized pages filled with love and laughter.",
    image: "images/62.jfif",
    icon: "bi-book-fill",
    link: "/shop"
  }
];

const badges = [
  { icon: "bi-heart-fill", label: "Made\nwith Love" },
  { icon: "bi-hand-thumbs-up-fill", label: "Handcrafted\nwith Care" },
  { icon: "bi-gift-fill", label: "Perfect for\nEvery Occasion" },
  { icon: "bi-camera-fill", label: "Memories That\nLast Forever" }
];

const ProductCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="product-categories">
      {/* Background decoratives */}
      <span className="deco deco-heart-tl"><i className="bi bi-heart"></i></span>
      <span className="deco deco-heart-tr"><i className="bi bi-heart"></i></span>
      <span className="deco deco-flower-bl"><i className="bi bi-flower1"></i></span>
      <span className="deco deco-flower-br"><i className="bi bi-flower2"></i></span>
      <span className="deco deco-star-l"><i className="bi bi-stars"></i></span>
      <span className="deco deco-cross-r">✦</span>
      <span className="deco deco-cross-tl">✦</span>

      {/* Heading */}
      <div className="pc-heading">
        <div className="pc-title-accent">
          <i className="bi bi-heart-fill pc-heart-top"></i>
        </div>
        <h2 className="pc-title">
          Every Memory,<br />
          <span className="pc-title-pink">Crafted with Love</span>
        </h2>
        <p className="pc-subtitle">
          Discover our collection of handmade memory gifts,<br />
          each piece uniquely crafted to preserve your<br />
          precious moments.
        </p>
      </div>

      {/* Product Cards */}
      <div className="pc-cards-grid">
        {featuredCategories.map((cat) => (
          <div key={cat.id} className="pc-card">
            <div className="pc-card-img-wrap">
              <img src={cat.image} alt={cat.title} className="pc-card-img" />
              <span className="pc-card-badge">
                <i className={`bi ${cat.icon}`}></i>
              </span>
            </div>
            <div className="pc-card-body">
              <h3 className="pc-card-title">{cat.title}</h3>
              <div className="pc-card-tagline">
                <i className="bi bi-heart-fill pc-tagline-heart"></i>
                <span>{cat.tagline}</span>
              </div>
              <button className="pc-explore-btn" onClick={() => navigate(cat.link)}>
                Explore <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Badges */}
      <div className="pc-badges">
        {badges.map((badge, i) => (
          <div key={i} className="pc-badge">
            <div className="pc-badge-icon">
              <i className={`bi ${badge.icon}`}></i>
            </div>
            <span className="pc-badge-label">{badge.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom decorative hearts */}
      <div className="pc-bottom-deco">
        <i className="bi bi-heart-fill pc-heart-sm"></i>
      </div>
    </section>
  );
};

export default ProductCategories;

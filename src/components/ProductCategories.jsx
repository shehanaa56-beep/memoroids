import React from 'react';
import './ProductCategories.css';

const categories = [
  {
    title: "Custom Polaroids",
    description: "Transform your digital memories into tangible keepsakes with our beautifully crafted custom Polaroids.",
    image: "images/32.jfif"
  },
  {
    title: "Mini Albums",
    description: "Handcrafted mini albums that tell your story, perfect for gifting or cherishing your favorite moments.",
    image: "images/70.jfif"
  },
  {
    title: "Frames",
    description: "Personalized frames  designed to showcase your memories in the most elegant way.",
    image: "images/7.jfif"
  },
    {
    title: "Scrapbooks",
    description: "Personalized scrapbooks designed to showcase your memories in the most elegant way.",
    image: "images/62.jfif"
  }
];

const ProductCategories = () => {
  return (
    <section className="product-categories">
      <h2>Every Memory, Crafted with Love</h2>
      <p>Discover our collection of handmade memory gifts, each piece uniquely crafted to preserve your precious moments</p>
      <div className="categories-container">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <img src={cat.image} alt={cat.title} />
            <h3>{cat.title}</h3>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;

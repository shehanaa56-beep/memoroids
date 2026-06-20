import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './Shop.css';

const Shop = () => {
  const [filter, setFilter] = useState('All');

  const categories = [
    {
      key: 'All',
      name: 'All',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
        </svg>
      )
    },
    {
      key: 'Polaroids',
      name: 'Polaroids',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      )
    },
    {
      key: 'Albums',
      name: 'Albums',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      key: 'Frames',
      name: 'Frames',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      )
    },
    {
      key: 'Ring Album',
      name: 'Ring Album',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    },
    {
      key: 'Scrapbooks',
      name: 'Scrapbooks',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="9.8" y1="8.2" x2="20" y2="12" />
          <line x1="9.8" y1="15.8" x2="20" y2="12" />
        </svg>
      )
    },
    {
      key: 'Bundles',
      name: 'Bundles',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      )
    }
  ];

  const products = [
    { id: 1, name: 'Custom Polaroid Pack', description: 'Set of 15 custom polaroids', price: 14000, category: 'Polaroids', image: 'images/10.jfif' },
    { id: 2, name: 'Mini Album', description: 'Personalized mini photo album', price: 500, category: 'Albums', image: 'images/4.jfif' },
    { id: 3, name: 'Photo Frame', description: 'Elegant wooden photo frame', price: 40000, category: 'Frames', image: 'images/7.jfif'},
    { id: 5, name: 'Ring Album', description: 'Memories beautifully bound together', price: 14900, category: 'Ring Album', image: 'images/57.jfif'},
    { id: 4, name: 'Scrapbook', description: 'Detailed scrapbook for memories', price: 30000, category: 'Scrapbooks', image: 'images/60.jfif' },
    { id: 6, name: 'Custom Gift Bundle', description: 'Complete memory kit', price: 25000, category: 'Bundles', image: 'images/50.jfif' },
    { id: 7, name: 'Polaroid Stand', description: 'Captured moments standing tall', price: 3000, category: 'Polaroids', image: 'images/46.jfif' },
    { id: 8, name: 'Polaroid Hangings', description: 'Strings of nostalgia, clipped with love', price: 45000, category: 'Polaroids', image: 'images/63.jfif' },
    { id: 9, name: 'Polaroid Album', description: 'Personalized photo album', price: 1000, category: 'Albums', image: 'images/32.jfif' },
  ];

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="shop-container">
      <div className="container mx-auto px-4">
        
        {/* New Header Section */}
        <div className="shop-header-intro">
          <span className="shop-intro-subtitle">♥ &nbsp; HANDMADE WITH LOVE &nbsp; ♥</span>
          <h1 className="shop-title font-heading font-bold text-center">Shop Our Creations</h1>
          <div className="shop-header-divider">
            <span className="line"></span>
            <span className="heart">♥</span>
            <span className="line"></span>
          </div>
          <p className="shop-intro-desc">
            Beautiful keepsakes to preserve your most precious memories ♥
          </p>
        </div>

        {/* Filters */}
        <div className="filters-container">
          <div className="filters">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`filter-button ${filter === category.key ? 'active' : ''}`}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className={`products-grid ${filteredProducts.length === 1 ? 'single-product' : ''}`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;

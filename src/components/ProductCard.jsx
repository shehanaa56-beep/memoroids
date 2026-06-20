import React from 'react';                                        

const ProductCard = ({ product }) => {
  return (
    <div className="product-card bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-xl">
        <img src={product.image} alt={product.name} className="product-card-image transition-transform duration-300 hover:scale-105" />
        {/* Removed category badge button as per user request */}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-charcoal-gray mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 mb-3 text-sm line-clamp-3">{product.description}</p>
        <p className="text-dusty-rose font-bold text-lg mb-3">${(product.price / 100).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;

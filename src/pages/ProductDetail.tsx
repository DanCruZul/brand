import React from 'react';
import { products } from '../data/products';

interface ProductDetailProps {
  productId: string;
  onClose: () => void;
}

export default function ProductDetail({ productId, onClose }: ProductDetailProps) {
  const product = products.find(p => p.id === productId);
  
  if (!product) return null;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-serif">{product.name}</h1>
            <p className="text-2xl">${product.price.toLocaleString()}</p>
            <p className="text-gray-600">{product.description}</p>
            <button 
              className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
              onClick={() => {/* Add to cart logic */}}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
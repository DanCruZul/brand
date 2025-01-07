import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: (productId: string) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      className="group cursor-pointer" 
      onClick={() => onClick?.(product.id)}
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm text-gray-700">{product.name}</h3>
        <p className="text-lg font-medium text-gray-900">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
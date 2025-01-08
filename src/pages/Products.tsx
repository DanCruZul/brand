import React from 'react';
import { products } from '../data/products';
import { Filter } from 'lucide-react';

interface ProductsProps {
  category?: string;
  onProductClick?: (productId: string) => void;
}

export default function Products({ category, onProductClick }: ProductsProps) {
  const filteredProducts = category 
    ? products.filter(product => product.category.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-sm uppercase tracking-wider">{category || 'All Products'}</h1>
          <button className="flex items-center gap-2 text-sm uppercase tracking-wider">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="cursor-pointer"
              onClick={() => onProductClick?.(product.id)}
            >
              <div className="aspect-[3/4] relative mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 pb-8">
                <p className="text-sm mb-1 uppercase tracking-wide">{product.name}</p>
                <p className="text-sm">${product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
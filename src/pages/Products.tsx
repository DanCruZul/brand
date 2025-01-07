import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif mb-12">{category || 'All Products'}</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
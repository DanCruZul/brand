import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  productId: string;
  onClose: () => void;
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-t">
      <button
        className="w-full py-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium">{title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="pb-4 text-sm text-gray-600">{children}</div>}
    </div>
  );
}

export default function ProductDetail({ productId, onClose }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();
  const product = products.find(p => p.id === productId);
  
  if (!product) return null;

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      // Get the setShowCart function from App.tsx
      const event = new CustomEvent('openCart');
      window.dispatchEvent(event);
    }
  };

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
            <div>
              <h1 className="text-2xl font-serif mb-2">{product.name}</h1>
              <p className="text-xl">${product.price.toLocaleString()}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`py-2 text-sm border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3 text-sm ${
                  selectedSize
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                } transition-colors`}
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                {selectedSize ? 'Add to Cart' : 'Select Size'}
              </button>
            </div>

            <div className="space-y-0">
              <Accordion title="Description">
                <p>{product.description}</p>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p>Free standard shipping on all orders. Returns accepted within 30 days.</p>
              </Accordion>
              <Accordion title="Size Guide">
                <p>Please refer to our size guide to find your perfect fit.</p>
              </Accordion>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
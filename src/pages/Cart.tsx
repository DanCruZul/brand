import React from 'react';
import { ShoppingCart, X } from 'lucide-react';

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const cartItems = []; // This will be replaced with actual cart state

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <ShoppingCart className="h-8 w-8" />
            <h1 className="text-3xl font-serif">Shopping Cart</h1>
          </div>
          <X className="h-6 w-6 cursor-pointer" onClick={onClose} />
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {/* Cart items will be mapped here */}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-xl font-serif mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium mb-4">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
                <button className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
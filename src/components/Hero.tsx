import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <img
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80"
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-serif mb-4">Timeless Elegance</h1>
          <p className="text-xl mb-8">Fall/Winter Collection 2024</p>
          <button className="bg-white text-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
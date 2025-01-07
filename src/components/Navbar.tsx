import React from 'react';
import { ShoppingBag, Menu, Search } from 'lucide-react';

interface NavbarProps {
  onCartClick: () => void;
  onMenuClick: () => void;
  onSearchClick: () => void;
  onLogoClick: () => void;
}

export default function Navbar({ onCartClick, onMenuClick, onSearchClick, onLogoClick }: NavbarProps) {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu 
              className="h-6 w-6 mr-4 cursor-pointer hover:text-gray-600 transition-colors" 
              onClick={onMenuClick}
            />
            <Search 
              className="h-6 w-6 cursor-pointer hover:text-gray-600 transition-colors" 
              onClick={onSearchClick}
            />
          </div>
          
          <div className="text-center">
            <h1 
              className="text-2xl font-serif cursor-pointer hover:text-gray-600 transition-colors"
              onClick={onLogoClick}
            >
              MAISON
            </h1>
          </div>
          
          <div className="flex items-center">
            <ShoppingBag 
              className="h-6 w-6 cursor-pointer hover:text-gray-600 transition-colors" 
              onClick={onCartClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
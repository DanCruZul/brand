import React from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, category?: string) => void;
}

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex justify-end mb-8">
            <X className="h-6 w-6 cursor-pointer" onClick={onClose} />
          </div>
          
          <nav className="space-y-6">
            <button 
              onClick={() => onNavigate('products', 'New Arrivals')}
              className="block text-lg hover:text-gray-600 transition-colors"
            >
              New Arrivals
            </button>
            <button 
              onClick={() => onNavigate('products', 'Women')}
              className="block text-lg hover:text-gray-600 transition-colors"
            >
              Women
            </button>
            <button 
              onClick={() => onNavigate('products', 'Men')}
              className="block text-lg hover:text-gray-600 transition-colors"
            >
              Men
            </button>
            <button 
              onClick={() => onNavigate('products', 'Accessories')}
              className="block text-lg hover:text-gray-600 transition-colors"
            >
              Accessories
            </button>
            <button 
              onClick={() => onNavigate('products')}
              className="block text-lg hover:text-gray-600 transition-colors"
            >
              All Collections
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`fixed inset-0 bg-white z-50 transform transition-all duration-300 ${
      isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-8">
          <X className="h-6 w-6 cursor-pointer" onClick={onClose} />
        </div>
        
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-2xl border-b-2 border-gray-200 focus:border-black outline-none pb-2"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cart from './pages/Cart';
import Sidebar from './components/Sidebar';
import SearchOverlay from './components/SearchOverlay';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import { useCart } from './context/CartContext';

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenCart = () => setShowCart(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);

  const handleNavigation = (page: string, category?: string) => {
    setCurrentPage(page);
    setSelectedCategory(category || null);
    setShowSidebar(false);
    setShowCart(false);
    setShowSearch(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onCartClick={() => setShowCart(true)}
        onMenuClick={() => setShowSidebar(true)}
        onSearchClick={() => setShowSearch(true)}
        onLogoClick={() => handleNavigation('home')}
      />
      
      <Sidebar 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)}
        onNavigate={handleNavigation}
      />
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      
      {selectedProduct ? (
        <ProductDetail 
          productId={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      ) : currentPage === 'products' ? (
        <Products 
          category={selectedCategory || undefined} 
          onProductClick={setSelectedProduct}
        />
      ) : (
        <>
          <Hero />
          <Products onProductClick={setSelectedProduct} />
          <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-serif mb-4">MAISON</h3>
                  <p className="text-gray-400">Luxury clothing and accessories.</p>
                </div>
                <div>
                  <h3 className="text-lg font-serif mb-4">Contact</h3>
                  <p className="text-gray-400">contact@maison.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-serif mb-4">Follow Us</h3>
                  <p className="text-gray-400">Instagram • Facebook • Twitter</p>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
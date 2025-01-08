import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Sidebar from "./components/Sidebar";
import SearchOverlay from "./components/SearchOverlay";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenCart = () => setShowCart(true);
    const handleNavigate = (e: CustomEvent) => {
      setCurrentPage(e.detail);
    };
    const handleSetCategory = (e: CustomEvent) => {
      setSelectedCategory(e.detail);
    };
    const handleSelectProduct = (e: CustomEvent) => {
      setSelectedProduct(e.detail);
    };

    window.addEventListener("openCart", handleOpenCart);
    window.addEventListener("navigate", handleNavigate as EventListener);
    window.addEventListener("setCategory", handleSetCategory as EventListener);
    window.addEventListener(
      "selectProduct",
      handleSelectProduct as EventListener
    );

    return () => {
      window.removeEventListener("openCart", handleOpenCart);
      window.removeEventListener("navigate", handleNavigate as EventListener);
      window.removeEventListener(
        "setCategory",
        handleSetCategory as EventListener
      );
      window.removeEventListener(
        "selectProduct",
        handleSelectProduct as EventListener
      );
    };
  }, []);

  const handleNavigation = (page: string, category?: string) => {
    setCurrentPage(page);
    setSelectedCategory(category || null);
    setShowSidebar(false);
    setShowCart(false);
    setShowSearch(false);
    setSelectedProduct(null);
  };

  const handleCategoryClick = (category: string) => {
    handleNavigation("products", category);
  };

  const renderContent = () => {
    if (currentPage === "checkout") {
      return <Checkout />;
    }

    if (selectedProduct) {
      return (
        <ProductDetail
          productId={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      );
    }

    if (currentPage === "products") {
      return (
        <Products
          category={selectedCategory || undefined}
          onProductClick={setSelectedProduct}
        />
      );
    }

    return <Hero />;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onCartClick={() => setShowCart(true)}
        onMenuClick={() => setShowSidebar(true)}
        onSearchClick={() => setShowSearch(true)}
        onLogoClick={() => handleNavigation("home")}
        onCategoryClick={handleCategoryClick}
      />

      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onNavigate={handleNavigation}
      />
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />

      {renderContent()}
    </div>
  );
}

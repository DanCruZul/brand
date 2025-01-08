import { ShoppingBag, Menu, Search } from "lucide-react";

interface NavbarProps {
  onCartClick: () => void;
  onMenuClick: () => void;
  onSearchClick: () => void;
  onLogoClick: () => void;
  onCategoryClick: (category: string) => void;
}

export default function Navbar({
  onCartClick,
  onMenuClick,
  onSearchClick,
  onLogoClick,
  onCategoryClick,
}: NavbarProps) {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="md:hidden w-full">
            <Menu
              className="h-6 w-6 cursor-pointer hover:text-gray-600 transition-colors"
              onClick={onMenuClick}
            />
          </div>

          {/* Category links - hidden on mobile */}
          <div className="hidden w-full md:flex items-center space-x-8">
            {["New Arrivals", "Women", "Men", "Accessories"].map((category) => (
              <button
                key={category}
                onClick={() => onCategoryClick(category)}
                className="text-sm tracking-wide hover:text-gray-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Logo */}
          <h1
            className="text-2xl w-full flex justify-center font-serif cursor-pointer hover:text-gray-600 transition-colors"
            onClick={onLogoClick}
          >
            MAISON
          </h1>

          {/* Icons */}
          <div className="flex w-full justify-end items-center space-x-4">
            <Search
              className="h-6 w-6 cursor-pointer hover:text-gray-600 transition-colors"
              onClick={onSearchClick}
            />
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

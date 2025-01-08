import { useState, useRef, useEffect } from "react";
import { products } from "../data/products";
import { X } from "lucide-react";

interface ProductsProps {
  category?: string;
  onProductClick?: (productId: string) => void;
}

interface FilterState {
  priceRange: string;
  size: string;
  color: string;
}

export default function Products({ category, onProductClick }: ProductsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: "",
    size: "",
    color: "",
  });
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter((product) => {
    if (
      category &&
      category !== "All" &&
      product.category.toLowerCase() !== category.toLowerCase()
    ) {
      return false;
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Filter Sidebar */}
      <div
        ref={filterRef}
        className={`fixed inset-y-0 right-0 w-80 bg-white transform transition-transform duration-300 ease-in-out z-40 ${
          showFilters ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-medium">Filters</h2>
            <button onClick={() => setShowFilters(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-sm font-medium mb-4">Price Range</h3>
              <div className="space-y-2">
                {["0-500", "500-1000", "1000-2000", "2000+"].map((range) => (
                  <label key={range} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range}
                      checked={filters.priceRange === range}
                      onChange={(e) =>
                        setFilters({ ...filters, priceRange: e.target.value })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">
                      {range === "2000+"
                        ? "$2000+"
                        : `$${range.replace("-", " - $")}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className={`py-2 text-sm border ${
                      filters.size === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-black"
                    }`}
                    onClick={() => setFilters({ ...filters, size })}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Color</h3>
              <div className="grid grid-cols-4 gap-2">
                {["Black", "White", "Gray", "Navy"].map((color) => (
                  <button
                    key={color}
                    className={`py-2 text-sm border ${
                      filters.color === color
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-black"
                    }`}
                    onClick={() => setFilters({ ...filters, color })}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setFilters({ priceRange: "", size: "", color: "" })}
            className="w-full py-3 text-sm border border-black hover:bg-black hover:text-white transition-colors mt-auto"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-sm tracking-wider">
            {category || "All Products"}
          </h1>
          <button
            onClick={() => setShowFilters(true)}
            className="text-sm tracking-wider hover:text-gray-600 transition-colors"
          >
            FILTER
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 cursor-pointer"
              onClick={() => onProductClick?.(product.id)}
            >
              <div className="aspect-[3/4] relative mb-4 overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm tracking-wide">{product.name}</p>
                <p className="text-sm">${product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

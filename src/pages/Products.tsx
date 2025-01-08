import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import productsData from "../data/products.json";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  colors: string[];
  sizes: string[];
  description: string;
}

interface ProductsProps {
  category?: string;
  onProductClick?: (productId: string) => void;
}

interface FilterState {
  category: string;
  priceRange: string;
  size: string;
  color: string;
}

interface FilterDropdownProps {
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({
  title,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 text-sm hover:text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-40">
            {options.map((option) => (
              <button
                key={option}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  value === option ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Products({
  category: initialCategory,
  onProductClick,
}: ProductsProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory?.toLowerCase() || "all",
    priceRange: "",
    size: "",
    color: "",
  });

  useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({
        ...prev,
        category: initialCategory.toLowerCase(),
      }));
    }
  }, [initialCategory]);

  const priceRanges = ["$0-200", "$200-500", "$500-1000", "$1000+"];

  // Get unique values from products
  const allSizes = Array.from(
    new Set(productsData.products.flatMap((p) => p.sizes))
  ).sort();

  const allColors = Array.from(
    new Set(productsData.products.flatMap((p) => p.colors))
  ).sort();

  const filteredProducts = productsData.products.filter((product: Product) => {
    // Category filter
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const range = filters.priceRange.replace("$", "");
      const [min, max] = range
        .split("-")
        .map((val) => (val === "1000+" ? Infinity : Number(val)));
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    // Size filter
    if (filters.size && !product.sizes.includes(filters.size)) {
      return false;
    }

    // Color filter
    if (filters.color && !product.colors.includes(filters.color)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Navigation */}
        <div className="flex justify-center space-x-8 mb-8 text-sm">
          {["all", "mens", "womens", "kids"].map((cat) => (
            <button
              key={cat}
              className={`hover:text-gray-600 transition-colors ${
                filters.category === cat
                  ? "text-black font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setFilters({ ...filters, category: cat })}
            >
              {cat === "all" ? "ALL" : `SHOP ${cat.toUpperCase()}`}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-8 border-t border-b py-4">
          <div className="flex gap-8">
            <FilterDropdown
              title="Price"
              options={priceRanges}
              value={filters.priceRange}
              onChange={(value) =>
                setFilters({ ...filters, priceRange: value })
              }
            />
            <FilterDropdown
              title="Size"
              options={allSizes}
              value={filters.size}
              onChange={(value) => setFilters({ ...filters, size: value })}
            />
            <FilterDropdown
              title="Color"
              options={allColors}
              value={filters.color}
              onChange={(value) => setFilters({ ...filters, color: value })}
            />
          </div>

          <button
            onClick={() =>
              setFilters({
                category: filters.category,
                priceRange: "",
                size: "",
                color: "",
              })
            }
            className="text-sm hover:text-gray-600 transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Product Grid */}
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

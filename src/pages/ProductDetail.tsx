import React, { useState } from "react";
import { ChevronDown, ChevronRight, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

interface ProductDetailProps {
  productId: string;
  onClose: () => void;
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t">
      <button
        className="w-full py-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium">{title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="pb-4 text-sm text-gray-600">{children}</div>}
    </div>
  );
}

export default function ProductDetail({
  productId,
  onClose,
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { addToCart } = useCart();

  const product = productsData.products.find((p) => p.id === productId);
  if (!product) return null;

  const relatedProducts = productsData.products
    .filter(
      (p) =>
        p.category === product.category &&
        p.subcategory === product.subcategory &&
        p.id !== product.id
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart({ ...product, selectedColor }, selectedSize);
      const event = new CustomEvent("openCart");
      window.dispatchEvent(event);
    }
  };

  const isValidSelection = selectedSize && selectedColor;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
                {product.category} / {product.subcategory}
              </p>
              <h1 className="text-2xl font-serif mb-2">{product.name}</h1>
              <p className="text-xl">${product.price.toLocaleString()}</p>
            </div>

            <div className="space-y-4">
              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color:{" "}
                  {selectedColor && (
                    <span className="capitalize">({selectedColor})</span>
                  )}
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`py-2 text-sm border ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-black"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex gap-4 pt-4">
                <button
                  className={`flex-1 py-3 text-sm ${
                    isValidSelection
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  } transition-colors`}
                  onClick={handleAddToCart}
                  disabled={!isValidSelection}
                >
                  {isValidSelection ? "Add to Cart" : "Select Size & Color"}
                </button>
                <button className="p-3 border border-gray-200 hover:border-black transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-0 pt-6">
              <Accordion title="Description">
                <p>{product.description}</p>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <div className="space-y-2">
                  <p>Free standard shipping on all orders.</p>
                  <p>Express shipping available at checkout.</p>
                  <p>Free returns within 30 days.</p>
                </div>
              </Accordion>
              <Accordion title="Size Guide">
                <div className="space-y-2">
                  <p>
                    Please refer to our size guide to find your perfect fit.
                  </p>
                  <p>Model is wearing size M.</p>
                </div>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import productsData from "../data/products.json";

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

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

  const handleProductClick = (id: string) => {
    window.scrollTo(0, 0);
    const event = new CustomEvent("navigate", { detail: "products" });
    window.dispatchEvent(event);
    setTimeout(() => {
      onClose?.();
      const selectProductEvent = new CustomEvent("selectProduct", {
        detail: id,
      });
      window.dispatchEvent(selectProductEvent);
    }, 0);
  };

  const isValidSelection = selectedSize && selectedColor;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100">
              <img
                src={product.images[selectedImageIndex]}
                alt={`${product.name} view ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square overflow-hidden ${
                    selectedImageIndex === index
                      ? "ring-2 ring-black"
                      : "ring-1 ring-gray-200"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
                {product.category} / {product.subcategory}
              </p>
              <h1 className="text-2xl font-serif mb-2">{product.name}</h1>
              <p className="text-xl">{formatPrice(product.price)}</p>
            </div>

            <div className="space-y-4">
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

              <div className="flex gap-4 pt-4">
                <button
                  className={`w-full py-3 text-sm ${
                    isValidSelection
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  } transition-colors`}
                  onClick={handleAddToCart}
                  disabled={!isValidSelection}
                >
                  {isValidSelection ? "Add to Cart" : "Select Size & Color"}
                </button>
              </div>
            </div>

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
                  <p>Please refer to our size guide to find your perfect fit.</p>
                  <p>Model is wearing size M.</p>
                </div>
              </Accordion>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-xs uppercase tracking-widest mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="cursor-pointer group"
                  onClick={() => handleProductClick(relatedProduct.id)}
                >
                  <div className="aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      {relatedProduct.category}
                    </p>
                    <p className="text-sm">{relatedProduct.name}</p>
                    <p className="text-sm">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
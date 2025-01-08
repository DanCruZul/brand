import React, { useState } from "react";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

interface CountryOption {
  name: string;
  currency: string;
  symbol: string;
}

const countries: CountryOption[] = [
  { name: "United States", currency: "USD", symbol: "$" },
  { name: "European Union", currency: "EUR", symbol: "€" },
  { name: "United Kingdom", currency: "GBP", symbol: "£" },
  { name: "Japan", currency: "JPY", symbol: "¥" },
  { name: "Canada", currency: "CAD", symbol: "C$" },
  { name: "Australia", currency: "AUD", symbol: "A$" },
  { name: "Switzerland", currency: "CHF", symbol: "CHF" },
  { name: "China", currency: "CNY", symbol: "¥" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showCurrencySelect, setShowCurrencySelect] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const handleCountrySelect = (country: CountryOption) => {
    setSelectedCountry(country);
    setShowCurrencySelect(false);
  };

  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Newsletter Section */}
          <div className="w-full md:w-auto max-w-sm">
            <h3 className="text-sm mb-4">Join the Conversation</h3>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="w-full border-b border-gray-300 pb-2 pr-12 text-sm placeholder-gray-400 focus:outline-none focus:border-black"
                required
              />
              <button
                type="submit"
                className="absolute right-0 bottom-2 hover:opacity-70 transition-opacity"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm">
            <div className="relative">
              <button
                className="hover:opacity-70 transition-opacity flex items-center gap-2 whitespace-nowrap"
                onClick={() => setShowCurrencySelect(!showCurrencySelect)}
              >
                {selectedCountry.name.toUpperCase()} ({selectedCountry.currency}{" "}
                {selectedCountry.symbol})
                {showCurrencySelect ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {showCurrencySelect && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowCurrencySelect(false)}
                  />
                  <div className="absolute right-0 bottom-full mb-2 w-64 bg-white border border-gray-200 shadow-lg z-40">
                    {countries.map((country) => (
                      <button
                        key={country.currency}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          selectedCountry.currency === country.currency
                            ? "bg-gray-50"
                            : ""
                        }`}
                        onClick={() => handleCountrySelect(country)}
                      >
                        {country.name} ({country.currency} {country.symbol})
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-6">
              <button className="hover:opacity-70 transition-opacity whitespace-nowrap">
                CONTACT
              </button>
              <button className="hover:opacity-70 transition-opacity whitespace-nowrap">
                CLIENT SERVICES
              </button>
              <button className="hover:opacity-70 transition-opacity whitespace-nowrap">
                LEGAL NOTICES
              </button>
              <button className="hover:opacity-70 transition-opacity whitespace-nowrap">
                SOCIAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

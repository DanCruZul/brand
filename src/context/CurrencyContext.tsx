import React, { createContext, useContext, useState, useEffect } from 'react';

interface CountryOption {
  name: string;
  currency: string;
  symbol: string;
}

interface CurrencyContextType {
  selectedCountry: CountryOption;
  setSelectedCountry: (country: CountryOption) => void;
  convertPrice: (price: number) => number;
  formatPrice: (price: number) => string;
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

const exchangeRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.79,
  JPY: 148.41,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.87,
  CNY: 7.19,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(countries[0]);

  const convertPrice = (priceUSD: number): number => {
    const rate = exchangeRates[selectedCountry.currency];
    return priceUSD * rate;
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    return `${selectedCountry.symbol}${convertedPrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ selectedCountry, setSelectedCountry, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
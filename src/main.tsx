import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrencyProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CurrencyProvider>
  </StrictMode>
);
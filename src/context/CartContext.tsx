// src/context/CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const adicionarProduto = (produto) => {
    setCartItems((prev) => [...prev, produto]);
  };

  return (
    <CartContext.Provider value={{ cartItems, adicionarProduto }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined)

    return context;
  };
  


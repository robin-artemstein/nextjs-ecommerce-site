"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../app/types';

// Defines all functions and variables accessible by any component wrapped in this context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalCartPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Safely adds an item to the global state array or increments its quantity
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Cast ID values to strings to prevent comparison mismatches
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id.toString() === product.id.toString()
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + 1;
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          subtotal: newQuantity * existingItem.product.price,
        };
        return updatedItems;
      } else {
        return [...prevItems, { product, quantity: 1, subtotal: product.price }];
      }
    });
  };

  const clearCart = () => setCartItems([]);

  // Live computed counters derived from our local React state
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, totalItemsCount, totalCartPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook enabling simple, clean access to the context states across files
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be executed strictly within a CartProvider element layout.');
  }
  return context;
};
"use client";

import React from 'react';
import { Product } from '../../types';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg shadow-md transition-all active:scale-95 text-center inline-block"
    >
      Add to card
    </button>
  );
}
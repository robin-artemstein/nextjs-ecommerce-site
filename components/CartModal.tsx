"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, totalCartPrice } = useCart();
  
  // 1. Create a "virtual anchor" (ref) to attach to our modal container element
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the modal isn't open, we don't need to waste energy listening for clicks
    if (!isOpen) return;

    // 2. This function runs every single time the user clicks anywhere on the screen
    const handleClickOutside = (event: MouseEvent) => {
      // Check if our modal exists on the screen, and see if the clicked item is OUTSIDE of it
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        
        // Edge Case Fix: If the user clicked the main "Cart" button in the Navbar, 
        // let the Navbar's own click handler deal with it. Otherwise, the modal 
        // would close and immediately pop right back open!
        const target = event.target as HTMLElement;
        if (target.closest('button')?.textContent?.includes('Cart')) {
          return;
        }

        // If they clicked genuinely outside (like the background blank space), close the modal!
        onClose();
      }
    };

    // 3. Register our click detective to look at the entire web page document
    document.addEventListener('mousedown', handleClickOutside);
    
    // 4. Clean up crew: Remove the listener when the modal disappears to save browser memory
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    /* 5. We hook our virtual anchor (ref={modalRef}) straight into our main modal wrapper box */
    <div 
      ref={modalRef} 
      className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4 text-black"
    >
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h3 className="font-bold text-lg">Your Shopping Cart</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 py-4 text-center">Your shopping cart is currently empty.</p>
      ) : (
        <>
          {/* Scrollable list containing individual items currently staged in the cart */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex gap-3 items-center border-b pb-2">
                <div className="relative w-12 h-12 flex-shrink-0 bg-gray-50 border rounded overflow-hidden">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{item.product.title}</h4>
                  <p className="text-xs text-gray-500">
                    ${item.product.price} × {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  ${item.subtotal.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing breakdown summary and validation actions */}
          <div className="mt-4 pt-2 border-t border-gray-100">
            <div className="flex justify-between font-bold text-base text-gray-900 mb-4">
              <span>Total Price:</span>
              <span>${totalCartPrice.toFixed(2)}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
            >
              Proceed To Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
// 1. Import the motion engine and animation wrapper from framer-motion
import { motion, AnimatePresence } from 'motion/react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, totalCartPrice } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (target.closest('button')?.textContent?.includes('Cart')) {
          return;
        }
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    /* 2. AnimatePresence allows components to animate out *before* they completely unmount.
         Without this wrapper, React would instantly delete the modal from the screen without playing the fade-out.
    */
    <AnimatePresence>
      {isOpen && (
        /* 3. We turn our standard <div> into a <motion.div> so it can accept animation states.
             We also added 'origin-top-right' to the Tailwind classes so the zoom effect shoots right out of the Cart button.
        */
        <motion.div
          ref={modalRef}
          // The starting state before the modal appears (invisible and slightly shrunk)
          initial={{ opacity: 0, scale: 0.92 }}
          // The standard open state (fully visible and full size)
          animate={{ opacity: 1, scale: 1 }}
          // The exit state when the modal closes (fades away and shrinks back down)
          exit={{ opacity: 0, scale: 0.92 }}
          // Controls the animation speed (0.15 seconds) and smoothness
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute right-0 mt-2 w-96 bg-blue-300 border border-gray-200 rounded-lg shadow-xl z-50 p-4 text-black origin-top-right"
        >
          <div className="flex justify-between items-center border-b border-dashed border-gray-500 pb-2 mb-2">
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
                  <div key={item.product.id} className="flex gap-3 items-center border-b border-dashed border-gray-500 pb-2 pb-2">
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
              <div className="pt-2">
                <div className="flex justify-between font-bold text-base text-gray-900 mb-4">
                  <span>Total Price:</span>
                  <span>${totalCartPrice.toFixed(2)}</span>
                </div>
                <Link 
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full text-center bg-blue-700 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
                >
                  Proceed To Checkout
                </Link>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
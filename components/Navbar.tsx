"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';

export default function Navbar() {
  const { totalItemsCount } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
        
        {/* Left Section: Company Branding Identity and Main Menu Route triggers */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-black tracking-wider text-blue-400 uppercase">
            LOGO
          </Link>
          <span className="text-sm font-medium text-slate-300 hidden sm:inline-block border-l border-slate-700 pl-6">
            Menu
          </span>
        </div>

        {/* Right Section: Core global interactive shopping cart control trigger */}
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="bg-blue-700 hover:bg-blue-500 text-white font-medium px-5 py-2 rounded-md transition-all active:scale-95 flex items-center gap-1 shadow-md"
          >
            <span>Cart</span>
            <span className="font-bold">({totalItemsCount})</span>
          </button>

          {/* Interactive checkout state modal container */}
          <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>

      </div>
    </nav>
  );
}
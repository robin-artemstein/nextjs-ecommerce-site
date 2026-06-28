"use client";

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cartItems, totalCartPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Local component form state mapping requirements explicitly
  const [formData, setFormData] = useState({
    buyerName: '',
    shippingAddress: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this payload to your backend server here
    console.log("Order submitted successfully:", { items: cartItems, customer: formData, total: totalCartPrice });
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 bg-white border border-slate-200 rounded-xl shadow-sm px-4">
        <h2 className="text-3xl font-extrabold text-green-600 mb-2">Thank you!</h2>
        <p className="text-slate-600 mb-6">Your order has been confirmed and is being processed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Confirm your order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Order Details & Summary column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b">Review Items</h2>
            
            {cartItems.length === 0 ? (
              <p className="text-slate-500 py-4">No products are staged in your order list context.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-4 flex gap-4 items-center first:pt-0 last:pb-0">
                    <div className="w-16 h-16 relative flex-shrink-0 bg-slate-50 border rounded overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{item.product.title}</h3>
                      <p className="text-xs text-slate-500">Price: ${item.product.price.toFixed(2)}</p>
                      <p className="text-xs font-semibold text-slate-700">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold text-slate-900 text-right">
                      Subtotal: ${item.subtotal.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center text-lg font-black text-slate-900">
              <span>Total Price:</span>
              <span>${totalCartPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Billing Form info column */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 pb-2 border-b">Buyer Details</h2>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Full Name</label>
              <input 
                type="text" required name="buyerName" value={formData.buyerName} onChange={handleInputChange}
                placeholder="John Doe" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-blue-500" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Shipping Address</label>
              <textarea 
                required name="shippingAddress" rows={2} value={formData.shippingAddress} onChange={handleInputChange}
                placeholder="123 Shopping Lane, Suite 10" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Credit / Debit Card Number</label>
              <input 
                type="text" required name="cardNumber" pattern="\d{16}" maxLength={16} value={formData.cardNumber} onChange={handleInputChange}
                placeholder="4111222233334444" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-blue-500" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Expiry Date</label>
                <input 
                  type="text" required name="cardExpiry" placeholder="MM/YY" maxLength={5} value={formData.cardExpiry} onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-blue-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">CVC / Security Code</label>
                <input 
                  type="password" required name="cardCvc" pattern="\d{3,4}" maxLength={4} value={formData.cardCvc} onChange={handleInputChange}
                  placeholder="123" className="w-full border rounded-md px-3 py-2 text-sm focus:outline-blue-500" 
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={cartItems.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow transition-colors mt-6"
            >
              Confirm check out
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
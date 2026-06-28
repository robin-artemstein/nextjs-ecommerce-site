import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from './types';

// Instructs Next.js to cache this route and revalidate it in the background at most every 60 seconds
export const revalidate = 60;

// Fetch function executed directly on the server side during rendering execution cycles
async function getProducts(): Promise<Product[]> {
  const targetUrl = "https://raw.githubusercontent.com/changhejeong/web-assets-hotlink/main/product-list-v1.json";
  
  const res = await fetch(targetUrl, {
    next: { revalidate: 60 } // Double enforcement of internal route caching lifecycle handles
  });

  if (!res.ok) {
    throw new Error(`Failed to download product entries from remote host: ${res.status}`);
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Welcome to our E-commerce...
      </h1>

      {/* Grid container: Displays 3 columns on medium screens and up, with a tight 4px (gap-1) gap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-slate-200 p-1 rounded-lg">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Product Layout Image forced to 100px width and 100px height */}
              <div className="mb-4 flex justify-start">
                <div className="w-[100px] h-[100px] relative border border-slate-100 rounded overflow-hidden bg-slate-50">
                  <Link href={`/products/${product.id}`}><Image src={product.image} alt={product.title} width={100} height={100} className="object-cover w-full h-full"/></Link>
                </div>
              </div>

              {/* Dynamic routing action link wrapped cleanly around the catalog item header */}
              <h2 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                <Link href={`/products/${product.id}`}>
                  {product.title}
                </Link>
              </h2>

              <p className="text-sm font-medium text-blue-600 mb-1">{product.subtitle}</p>
              <p className="text-xs text-slate-500 line-clamp-3 mb-4">{product.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
              <span className="text-lg font-black text-slate-900">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
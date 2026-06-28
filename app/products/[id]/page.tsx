import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Product } from '../../types';
import AddToCartButton from './AddToCartButton';

export const revalidate = 60;

const API_URL = "https://raw.githubusercontent.com/changhejeong/web-assets-hotlink/main/product-list-v1.json";

// Automates the pre-rendering of all dynamic URL parameters during build time
export async function generateStaticParams() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return [];
    const products: Product[] = await res.json();
    return products.map((p) => ({ id: p.id.toString() }));
  } catch (e) {
    return [];
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const products: Product[] = await res.json();
    return products.find((p) => p.id.toString() === id) || null;
  } catch {
    return null;
  }
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Product Image Display Panel */}
        <div className="flex-shrink-0 bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-center justify-center auto-cols-max">
          <div className="w-[100px] h-[100px] relative">
            <Image
              src={product.image}
              alt={product.title}
              width={100}
              height={100}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Right Side: Product Details Content Area */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded">
              ID: {product.id}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 mb-1">
              {product.title}
            </h1>
            <p className="text-md font-semibold text-blue-600 mb-4">{product.subtitle}</p>
            <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="text-2xl font-black text-slate-900">
              Price: ${Number(product.price).toFixed(2)}
            </div>
            
            {/* Split out as a client component to handle interactive click actions */}
            <AddToCartButton product={product} />
          </div>
        </div>

      </div>
    </div>
  );
}
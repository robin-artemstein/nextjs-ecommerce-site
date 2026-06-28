import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "E-Commerce App Router Platform",
  description: "High performance ISR storefront catalog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 min-h-screen flex flex-col font-sans text-slate-900">
        <CartProvider>
          <Navbar />
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-center py-6 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        © {new Date().getFullYear()} E-commerce Project. All rights reserved globally.
      </div>
    </footer>
  );
}
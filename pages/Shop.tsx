
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';

interface ShopProps {
  onProductClick: (id: string) => void;
}

const Shop: React.FC<ShopProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Apparel', 'Accessories', 'Footwear'];

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 border-b border-stone-200 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-stone-900">Collection</h1>
          <p className="mt-2 text-stone-500">Refined silhouettes for every occasion.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs uppercase tracking-widest border transition-all ${
                activeCategory === cat 
                  ? 'bg-stone-900 text-white border-stone-900' 
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group cursor-pointer"
            onClick={() => onProductClick(product.id)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative mb-6">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 w-4/5">
                <button className="w-full bg-white/90 backdrop-blur text-stone-900 text-[10px] uppercase font-bold py-3 tracking-widest shadow-lg">
                  Quick View
                </button>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium text-stone-900">{product.name}</h3>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">{product.category}</p>
              </div>
              <p className="text-stone-900 font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-40">
          <p className="text-stone-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;

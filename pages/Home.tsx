
import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface HomeProps {
  onProductClick: (id: string) => void;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onProductClick, onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Fashion" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter italic">Elegance Defined</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 font-light tracking-wide uppercase">
            Curated essentials for the modern silhouette. Discover the SS25 Collection.
          </p>
          <button 
            onClick={() => onNavigate('shop')}
            className="px-10 py-4 bg-white text-stone-900 text-sm font-semibold uppercase tracking-[0.3em] hover:bg-stone-900 hover:text-white transition-all duration-300"
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-stone-400">Selected Pieces</span>
            <h2 className="text-4xl font-bold mt-2">New Arrivals</h2>
          </div>
          <button 
            onClick={() => onNavigate('shop')}
            className="mt-4 md:mt-0 text-sm font-medium uppercase tracking-widest hover:text-stone-500 border-b border-stone-900 pb-1"
          >
            View all products
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.slice(0, 3).map((product) => (
            <div 
              key={product.id} 
              className="group cursor-pointer"
              onClick={() => onProductClick(product.id)}
            >
              <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h3 className="text-lg font-medium text-stone-900">{product.name}</h3>
              <p className="text-stone-500 mt-1">${product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-stone-900 text-white py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.6em] text-stone-500 mb-8 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-light mb-10 leading-tight">
            "Clothing is the architecture of the soul. We build spaces you want to live in."
          </h2>
          <p className="text-stone-400 text-lg font-light leading-relaxed max-w-2xl mx-auto italic">
            At Primum, we believe in the power of minimalism. Our pieces are designed to outlast trends, focused on premium materials and impeccable craftsmanship.
          </p>
        </div>
      </section>

      {/* Instagram Grid Placeholder */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm uppercase tracking-[0.5em] text-stone-400 mb-16">Follow the movement @primum</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square bg-stone-200 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <img src={`https://picsum.photos/800/800?random=${i + 10}`} alt="social" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

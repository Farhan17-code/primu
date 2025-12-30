
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-2xl font-bold tracking-tighter hover:text-stone-600 transition-colors"
            >
              PRIMUM
            </button>
          </div>

          <div className="hidden md:flex space-x-12">
            <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-stone-500 uppercase tracking-widest transition-colors">Home</button>
            <button onClick={() => onNavigate('shop')} className="text-sm font-medium hover:text-stone-500 uppercase tracking-widest transition-colors">Shop</button>
            <button onClick={() => onNavigate('about')} className="text-sm font-medium hover:text-stone-500 uppercase tracking-widest transition-colors">About</button>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-stone-600 hover:text-stone-900 transition-colors">
              <i className="fa-solid fa-magnifying-glass text-lg"></i>
            </button>
            <button onClick={onCartClick} className="relative text-stone-600 hover:text-stone-900 transition-colors">
              <i className="fa-solid fa-bag-shopping text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

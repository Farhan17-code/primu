
import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AIStylist from './components/AIStylist';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import { PRODUCTS } from './constants';
import { CartItem, Product } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    setSelectedProductId(null);
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = useCallback((id: string) => {
    setSelectedProductId(id);
    setCurrentPage('detail');
    window.scrollTo(0, 0);
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string, size: string, color: string) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.selectedSize === size && i.selectedColor === color)));
  }, []);

  const updateQuantity = useCallback((id: string, size: string, color: string, q: number) => {
    setCartItems(prev => prev.map(i => (i.id === id && i.selectedSize === size && i.selectedColor === color) ? { ...i, quantity: q } : i));
  }, []);

  const renderPage = () => {
    if (currentPage === 'detail' && selectedProductId) {
      const product = PRODUCTS.find(p => p.id === selectedProductId);
      return product ? <ProductDetail product={product} onAddToCart={addToCart} /> : <Home onProductClick={handleProductClick} onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'shop':
        return <Shop onProductClick={handleProductClick} />;
      case 'about':
        return (
          <div className="max-w-4xl mx-auto py-32 px-4 text-center">
            <h1 className="text-4xl font-bold mb-8">About Primum</h1>
            <p className="text-stone-600 leading-relaxed text-lg italic">
              Founded in 2024, Primum was born from a desire to create a more intentional wardrobe. 
              We focus on the first principles of design: quality, utility, and beauty.
            </p>
          </div>
        );
      case 'home':
      default:
        return <Home onProductClick={handleProductClick} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-stone-900 selection:text-white">
      <Navbar 
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <footer className="bg-stone-100 py-20 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold tracking-tighter mb-6">PRIMUM</h2>
              <p className="text-stone-500 max-w-sm text-sm leading-relaxed">
                Elevating the everyday through architectural silhouettes and premium natural fibers. Crafted for the modern minimalists.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Explore</h3>
              <ul className="space-y-4 text-sm text-stone-600">
                <li><button onClick={() => handleNavigate('shop')} className="hover:text-stone-900">Collections</button></li>
                <li><button onClick={() => handleNavigate('about')} className="hover:text-stone-900">Our Story</button></li>
                <li><button className="hover:text-stone-900">Stores</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Support</h3>
              <ul className="space-y-4 text-sm text-stone-600">
                <li><button className="hover:text-stone-900">Contact</button></li>
                <li><button className="hover:text-stone-900">Shipping</button></li>
                <li><button className="hover:text-stone-900">Privacy</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-stone-400 uppercase tracking-widest">© 2025 Primum Clothing. All Rights Reserved.</p>
            <div className="flex space-x-6 text-stone-400">
              <i className="fa-brands fa-instagram hover:text-stone-900 transition-colors cursor-pointer"></i>
              <i className="fa-brands fa-twitter hover:text-stone-900 transition-colors cursor-pointer"></i>
              <i className="fa-brands fa-pinterest hover:text-stone-900 transition-colors cursor-pointer"></i>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <AIStylist onProductClick={handleProductClick} />
    </div>
  );
};

export default App;

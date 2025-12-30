
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, size: string, color: string) => void;
  onUpdateQuantity: (id: string, size: string, color: string, q: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col py-6">
            <div className="px-4 sm:px-6 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-stone-900">Shopping Cart</h2>
              <button onClick={onClose} className="text-stone-400 hover:text-stone-500">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="mt-8 flex-1 overflow-y-auto px-4 sm:px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-stone-500">
                  <i className="fa-solid fa-bag-shopping text-4xl mb-4 opacity-20"></i>
                  <p>Your bag is empty.</p>
                  <button onClick={onClose} className="mt-4 text-sm underline hover:text-stone-900">Start Shopping</button>
                </div>
              ) : (
                <ul className="space-y-8">
                  {items.map((item, idx) => (
                    <li key={`${item.id}-${idx}`} className="flex py-2 border-b border-stone-100 last:border-0">
                      <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-stone-200">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-stone-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${item.price}</p>
                          </div>
                          <p className="mt-1 text-xs text-stone-500 uppercase tracking-wider">{item.selectedColor} / {item.selectedSize}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center space-x-2 border border-stone-200 rounded px-2">
                            <button onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1))} className="p-1">-</button>
                            <span className="text-xs">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)} className="p-1">+</button>
                          </div>
                          <button onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)} className="font-medium text-stone-400 hover:text-stone-600 text-xs uppercase tracking-widest">Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-stone-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-stone-900">
                  <p>Subtotal</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-xs text-stone-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center rounded-none border border-transparent bg-stone-900 px-6 py-4 text-sm font-medium text-white shadow-sm hover:bg-stone-800 uppercase tracking-[0.2em] transition-all">
                    Checkout Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

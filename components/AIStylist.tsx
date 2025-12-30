
import React, { useState, useRef, useEffect } from 'react';
import { getStylingAdvice, findRelatedProducts } from '../services/geminiService';
import { AIStylistMessage, Product } from '../types';

interface AIStylistProps {
  onProductClick: (id: string) => void;
}

const AIStylist: React.FC<AIStylistProps> = ({ onProductClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIStylistMessage[]>([
    { role: 'model', text: "Welcome to Primum. I am your personal AI Stylist. How can I help you elevate your wardrobe today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: AIStylistMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const advice = await getStylingAdvice(input, messages);
    const relatedProducts = findRelatedProducts(advice);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: advice, 
      products: relatedProducts 
    }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-stone-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-2xl"></i>
        ) : (
          <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-stone-900 text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center">
              <i className="fa-solid fa-sparkles text-sm"></i>
            </div>
            <div>
              <p className="text-sm font-semibold">Primum Stylist</p>
              <p className="text-[10px] text-stone-400">AI-Powered Fashion Advice</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-stone-900 text-white rounded-tr-none' 
                    : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                      {msg.products.map(p => (
                        <button 
                          key={p.id}
                          onClick={() => onProductClick(p.id)}
                          className="text-left bg-stone-50 p-2 rounded-lg hover:bg-stone-100 transition-colors group"
                        >
                          <img src={p.image} className="w-full h-20 object-cover rounded mb-1" alt={p.name} />
                          <p className="text-[10px] font-medium truncate group-hover:text-stone-600">{p.name}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-stone-100">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for style tips..."
                className="w-full pl-4 pr-12 py-3 bg-stone-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="absolute right-2 p-2 text-stone-900 hover:text-stone-600 disabled:opacity-50"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
            <p className="text-[9px] text-center text-stone-400 mt-2">
              Our AI is connected to latest fashion trends via Google Search
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIStylist;

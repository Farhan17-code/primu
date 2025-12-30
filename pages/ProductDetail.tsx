
import React, { useState } from 'react';
import { Product, CartItem } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
        {/* Image Gallery */}
        <div className="flex flex-col space-y-4">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-none">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-stone-100 overflow-hidden">
                 <img src={`https://picsum.photos/400/400?random=${parseInt(product.id) * 10 + i}`} alt="view" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900">{product.name}</h1>
          <div className="mt-3">
            <p className="text-2xl tracking-tight text-stone-900">${product.price}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-stone-700 leading-relaxed font-light">{product.description}</p>
          </div>

          <div className="mt-10">
            {/* Color picker */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Color: {selectedColor}</h3>
              <div className="mt-4 flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border border-stone-200 transition-all ${
                      selectedColor === color ? 'ring-2 ring-stone-900 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color.toLowerCase() === 'midnight' ? '#191970' : color.toLowerCase() === 'camel' ? '#C19A6B' : color.toLowerCase() === 'oatmeal' ? '#E3DACC' : color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size picker */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Size</h3>
                <button className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 underline">Size guide</button>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium uppercase border transition-all ${
                      selectedSize === size
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-900 border-stone-200 hover:border-stone-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`mt-10 w-full flex items-center justify-center py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all ${
                isAdded ? 'bg-green-600 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {isAdded ? 'Added to Bag' : 'Add to Bag'}
            </button>

            <div className="mt-10 pt-10 border-t border-stone-100 space-y-4">
              <details className="group" open>
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-xs uppercase tracking-widest font-bold">Details & Composition</span>
                  <i className="fa-solid fa-plus text-[10px] group-open:hidden"></i>
                  <i className="fa-solid fa-minus text-[10px] hidden group-open:block"></i>
                </summary>
                <div className="mt-4 text-xs text-stone-500 leading-loose">
                  <p>• Responsible sourced materials from Northern Italy</p>
                  <p>• Hand-finished detailing in our workshop</p>
                  <p>• Designed for longevity and timeless appeal</p>
                  <p>• Style ID: PRM-00{product.id}</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-xs uppercase tracking-widest font-bold">Shipping & Returns</span>
                  <i className="fa-solid fa-plus text-[10px] group-open:hidden"></i>
                  <i className="fa-solid fa-minus text-[10px] hidden group-open:block"></i>
                </summary>
                <div className="mt-4 text-xs text-stone-500 leading-loose">
                  <p>Complimentary standard shipping on all orders. Returns are accepted within 14 days of receipt.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

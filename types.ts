
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Apparel' | 'Accessories' | 'Footwear';
  image: string;
  colors: string[];
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface AIStylistMessage {
  role: 'user' | 'model';
  text: string;
  products?: Product[];
}

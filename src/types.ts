export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

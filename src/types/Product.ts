export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  weight?: string;
  purity?: string;
  inStock: boolean;
  featured?: boolean;
  likes?: number;
  isLiked?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
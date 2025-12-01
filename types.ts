export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  tag?: string;
}

export interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
  role: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
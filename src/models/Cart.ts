import { Product } from './Product';

export type CartItem = Pick<Product, 'id' | 'name' | 'imageUrl' | 'price'> & {productId: string}

export interface Cart {
  itemsNo: number;
  price: string;
  items: CartItem[];
}

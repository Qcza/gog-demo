export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  owned: boolean;
  discount?: string;
}

export type DailyProduct = Pick<Product, 'id' | 'imageUrl'>;

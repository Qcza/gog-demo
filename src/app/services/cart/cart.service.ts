import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../../../models/Cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {
  }

  getCart(): Observable<Cart> {
    return this.http.get<CartItem[]>('/api/cart').pipe(map(this.prepareCart));
  }

  addToCart(productId: string): Observable<Cart> {
    return this.http.put<CartItem[]>('/api/cart', {productId}).pipe(map(this.prepareCart))
  }

  removeFromCart(itemId: string): Observable<Cart> {
    return this.http.delete<CartItem[]>('/api/cart', {params: {itemId}}).pipe(map(this.prepareCart))
  }

  clearCart(): Observable<Cart> {
    return this.http.delete<CartItem[]>('/api/cart').pipe(map(this.prepareCart))
  }


  prepareCart = (items: CartItem[]): Cart => ({
    items,
    itemsNo: items.length,
    price: items.map((item) => Number(item.price)).reduce((acc, curr) => acc + curr, 0).toFixed(2),
  })
}

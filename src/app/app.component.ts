import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { MockServerService } from './services/mock-server/mock-server.service';
import { ProductsService } from './services/products/products.service';
import { CartService } from './services/cart/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/Cart';

const initCart: Cart = {
  items: [],
  itemsNo: 0,
  price: '0'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  daily = this.productsService.getDaily();
  products = this.productsService.getProducts();
  cart = new BehaviorSubject<Cart>(initCart);

  constructor(private mockServer: MockServerService, private productsService: ProductsService, private cartService: CartService) {
  };

  ngOnInit(): void {
    this.mockServer.create();
    this.cartService.getCart().subscribe((cart) => this.cart.next(cart));
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.id).subscribe((cart) => {
      this.cart.next(cart)
    });
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem.id).subscribe((cart) => this.cart.next(cart))
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe((cart) => this.cart.next(cart))
  }
}

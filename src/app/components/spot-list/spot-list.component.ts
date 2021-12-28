import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/Product';
import { Cart } from '../../../models/Cart';

@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotListComponent {
  cartIds: string[] = [];

  @Input() products: Product[] = [];
  @Input() set cart(cart: Cart) {
    this.cartIds = cart.items.map((item) => item.productId)
  }

  @Output() addToCart = new EventEmitter<Product>()

  addToCartHandler(product: Product): void {
    this.addToCart.emit(product);
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart, CartItem } from '../../../models/Cart';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  @Input() cart: Cart;

  @Output() removeItemFromCart = new EventEmitter<CartItem>();
  @Output() clearCart = new EventEmitter<Event>();

  removeItemHandler(item: CartItem) {
    this.removeItemFromCart.emit(item);
  }

  clearCartHandler(event: Event) {
    this.clearCart.emit(event);
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart, CartItem } from '../../../../models/Cart';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPopupComponent {
  label: string;
  data: Cart;

  @Input() set cart(data: Cart) {
    this.data = data;
    this.label = this.parseLabel(data?.itemsNo ?? 0);
  };

  @Output() removeItem = new EventEmitter<CartItem>();
  @Output() clearCart = new EventEmitter<Event>();

  removeHandler(item: CartItem) {
    this.removeItem.emit(item);
  }

  clearHandler(event: Event) {
    this.clearCart.emit(event);
  }

  parseLabel(itemsNo: number): string {
    return `${itemsNo} item${itemsNo === 1 ? '' : 's'} in cart`
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../../models/Cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input() item: CartItem

  @Output() remove = new EventEmitter<CartItem>();

  removeHandler(): void {
    this.remove.emit(this.item);
  }
}

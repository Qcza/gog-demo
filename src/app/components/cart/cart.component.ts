import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnDestroy, Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Cart, CartItem } from '../../../models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnDestroy {
  @ViewChild('cartElement') cartElement: ElementRef;

  active: boolean;
  unlisten: () => void;

  @Input() cart: Cart;

  @Output() clearCart = new EventEmitter<Event>();
  @Output() removeItem = new EventEmitter<CartItem>();

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {
    this.unlisten = this.renderer.listen('window', 'click', (e) => {
      if (this.active && !this.cartElement.nativeElement.contains(e.target)) {
        this.togglePopup();
      }
    })
  }

  ngOnDestroy(): void {
    this.unlisten?.();
  }

  togglePopup(): void {
    this.active = !this.active;
    this.cdr.markForCheck();
  };

  removeItemHandler(item: CartItem): void {
    this.removeItem.emit(item);
  }

  clearCartHandler(event: Event): void {
    this.clearCart.emit(event);
  }
}

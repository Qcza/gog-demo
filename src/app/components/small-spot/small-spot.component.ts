import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/Product';

export const labels = {
  owned: 'owned',
  inCart: 'in cart',
} as const;

@Component({
  selector: 'app-small-spot',
  templateUrl: './small-spot.component.html',
  styleUrls: ['./small-spot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallSpotComponent {
  priceLabel: string;
  data: Product;
  buttonDisabled: boolean;
  buttonInactive: boolean;
  labels = labels;

  @Input() set product(data: Product) {
    this.data = data;
    this.priceLabel = this.setPriceLabel()
  };

  @Input() set inCart(value: boolean) {
    this.priceLabel = this.setPriceLabel(value);
  };

  @Output() addToCart = new EventEmitter<Product>();

  addToCartHandler(): void {
    this.addToCart.emit(this.data);
  }

  private setPriceLabel(inCart?: boolean): string {
    const {owned, price} = this.data;
    if (inCart) {
      this.buttonInactive = true;
      return this.labels.inCart;
    }
    if (owned) {
      this.buttonDisabled = true;
      return this.labels.owned;
    }
    this.buttonDisabled = false;
    this.buttonInactive = false;
    return `$${price}`;
  }

}

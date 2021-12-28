import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CartPopupComponent } from './cart-popup.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../../typography/typography.component';
import { generate } from '../../../../mockups/Cart';
import { ButtonComponent } from '../../button/button.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { Cart, CartItem } from '../../../../models/Cart';

const cart = generate();

describe('CartPopupComponent', () => {
  let spectator: Spectator<CartPopupComponent>;
  const createComponent = createComponentFactory({
    component: CartPopupComponent,
    imports: [CommonModule],
    declarations: [TypographyComponent, ButtonComponent, CartItemComponent]
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        cart,
      }
    });
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display label for 1 item', () => {
    const itemsNo = 1;
    const data: Cart = {...cart, itemsNo};
    spectator.setInput('cart', data);
    const expected = `${itemsNo} item in cart`;
    const label = spectator.query('app-typography');
    expect(label).toHaveText(expected);
  });

  it('should display label for more items', () => {
    const itemsNo = 6;
    const data: Cart = {...cart, itemsNo};
    spectator.setInput('cart', data);
    const expected = `${itemsNo} items in cart`;
    const label = spectator.query('app-typography');
    expect(label).toHaveText(expected);
  });

  it('should display proper cart price', () => {
    const expected = `$${cart.price}`;
    const labels = spectator.queryAll('app-typography');
    expect(labels[1]).toHaveText(expected);
  });

  it('should display clear button', () => {
    const button = spectator.query('button');
    expect(button).toBeDefined();
  });

  it('should list cart items', () => {
    const expected = cart.items.length;
    const items = spectator.queryAll('app-cart-item');
    expect(items).toHaveLength(expected);
  })

  it('should emit remove item event', () => {
    const expected = cart.items[0];
    let output: CartItem;
    spectator.output<CartItem>('removeItem').subscribe((item) => output = item);
    const removeButton = spectator.query('app-cart-item span[role=button]');
    spectator.click(removeButton);
    expect(output).toEqual(expected)
  })

  it('should emit clear cart event', () => {
    let output: Event;
    spectator.output<Event>('clearCart').subscribe((event) => output = event);
    const clearButton = spectator.query('button');
    spectator.click(clearButton);
    expect(output).toBeDefined()
  })
});

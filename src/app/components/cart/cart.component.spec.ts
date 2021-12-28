import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { generate, generateItem } from '../../../mockups/Cart';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { CartPopupComponent } from './cart-popup/cart-popup.component';
import { TypographyComponent } from '../typography/typography.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ButtonComponent } from '../button/button.component';
import { CartItem } from '../../../models/Cart';
import { Event } from '@angular/router';

const cart = generate();
const item = generateItem();

describe('CartComponent', () => {
  let spectator: Spectator<CartComponent>;
  const createComponent = createComponentFactory({
    component: CartComponent,
    imports: [CommonModule],
    declarations: [CartButtonComponent, CartPopupComponent, CartItemComponent, ButtonComponent, TypographyComponent]
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

  it('should toggle cart popup', () => {
    const expected = true;
    spectator.component.active = !expected;
    spectator.triggerEventHandler('app-cart-button', 'buttonClick', new Event('mock'))
    expect(spectator.component.active).toBe(expected);
  })

  it('should emit remove event', () => {
    const expected = item;
    let output: CartItem;
    spectator.component.active = true;
    spectator.detectComponentChanges();
    spectator.output<CartItem>('removeItem').subscribe((item) => output = item);
    spectator.triggerEventHandler('app-cart-popup', 'removeItem', expected)
    expect(output).toEqual(expected);
  })

  it('should emit clear button event', () => {
    let output: Event;
    spectator.component.active = true;
    spectator.detectComponentChanges();
    spectator.output<Event>('clearCart').subscribe((event) => output = event);
    spectator.triggerEventHandler('app-cart-popup', 'clearCart', new Event('mock'))
    expect(output).toBeDefined();
  })
});

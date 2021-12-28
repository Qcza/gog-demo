import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TopBarComponent } from './top-bar.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { generate, generateItem } from '../../../mockups/Cart';
import { CartButtonComponent } from '../cart/cart-button/cart-button.component';
import { TypographyComponent } from '../typography/typography.component';
import { CartItem } from '../../../models/Cart';

const cart = generate();
const item = generateItem();

describe('TopBarComponent', () => {
  let spectator: Spectator<TopBarComponent>;
  const createComponent = createComponentFactory({
    component: TopBarComponent,
    imports: [CommonModule],
    declarations: [
      CartComponent,
      CartButtonComponent,
      TypographyComponent,
    ]
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
  })

  it('should display logo', () => {
    const expected = '/assets/images/Logo.svg';
    const logo = spectator.query('img');
    expect(logo).toHaveAttribute('src', expected);
  })

  it('should mount cart component', () => {
    const cart = spectator.query('app-cart');
    expect(cart).toBeDefined();
  })

  it('should emit clear cart event', () => {
    const expected = new Event('mock');
    let output: Event;
    spectator.output<Event>('clearCart').subscribe((event) => output = event);
    spectator.component.clearCartHandler(expected);
    expect(output).toEqual(expected);
  })

  it('should emit remove item event', () => {
    const expected = item;
    let output: CartItem;
    spectator.output<CartItem>('removeItemFromCart').subscribe((item) => output = item);
    spectator.component.removeItemHandler(expected);
    expect(output).toEqual(expected);
  })
});

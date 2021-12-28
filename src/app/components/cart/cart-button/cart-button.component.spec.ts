import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CartButtonComponent } from './cart-button.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../../typography/typography.component';

describe('CartButtonComponent', () => {
  let spectator: Spectator<CartButtonComponent>;
  const createComponent = createComponentFactory({
    component: CartButtonComponent,
    imports: [CommonModule],
    declarations: [TypographyComponent]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display proper icon', () => {
    const expected = 'assets/icons/cart.svg';
    const icon = spectator.query('img');
    expect(icon).toHaveAttribute('src', expected);
  })

  it('should display proper items number', () => {
    const expected = '7';
    spectator.setInput('itemsNo', Number(expected));
    const itemsNo = spectator.query('app-typography');
    expect(itemsNo).toHaveText(expected);
  })

  it('should not display items number when empty', () => {
    spectator.setInput('itemsNo', 0);
    const itemsNo = spectator.query('app-typography');
    expect(itemsNo).toBeNull();
  })

  it('should display button as active', () => {
    spectator.setInput('active', true);
    const button = spectator.query('div.cart-button');
    expect(button).toHaveClass('active');
  })

  it('should emit click event', () => {
    let output: Event;
    spectator.output<Event>('buttonClick').subscribe((event) => output = event);
    const button = spectator.query('div.cart-button');
    spectator.click(button);
    expect(output).toBeDefined();
  })
});

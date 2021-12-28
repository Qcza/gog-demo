import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CartItemComponent } from './cart-item.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../../typography/typography.component';
import { generateItem } from '../../../../mockups/Cart';
import { CartItem } from '../../../../models/Cart';

const item = generateItem();

describe('CartItemComponent', () => {
  let spectator: Spectator<CartItemComponent>;
  const createComponent = createComponentFactory({
    component: CartItemComponent,
    imports: [CommonModule],
    declarations: [TypographyComponent]
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        item,
      }
    });
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display proper image', () => {
    const expected = item.imageUrl;
    const image = spectator.query('img');
    expect(image).toHaveAttribute('src', expected);
  })

  it('should display proper name', () => {
    const expected = item.name;
    const name = spectator.query('span.name');
    expect(name).toHaveText(expected);
  })

  it('should display remove button', () => {
    const button = spectator.query('span[role=button]');
    expect(button).toBeDefined();
  })

  it('should display proper price', () => {
    const expected = `$${item.price}`;
    const price = spectator.queryLast('app-typography');
    expect(price).toHaveText(expected);
  })

  it('should emit remove event', () => {
    const expected = item;
    let output: CartItem;
    spectator.output<CartItem>('remove').subscribe((item) => output = item);
    const button = spectator.query('span[role=button]');
    spectator.click(button);
    expect(output).toEqual(expected);
  })
});

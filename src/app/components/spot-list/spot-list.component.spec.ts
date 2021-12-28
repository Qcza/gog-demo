import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { SpotListComponent } from './spot-list.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography/typography.component';
import { generateMany } from '../../../mockups/Product';
import { ButtonComponent } from '../button/button.component';
import { DiscountBadgeComponent } from '../discount-badge/discount-badge.component';
import { SmallSpotComponent } from '../small-spot/small-spot.component';
import { Product } from '../../../models/Product';

const products = generateMany(5);

describe('SpotListComponent', () => {
  let spectator: Spectator<SpotListComponent>;
  const createComponent = createComponentFactory({
    component: SpotListComponent,
    imports: [CommonModule],
    declarations: [
      TypographyComponent,
      ButtonComponent,
      DiscountBadgeComponent,
      SmallSpotComponent
    ]
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        products,
      }
    });
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  })

  it('should list items', () => {
    const expected = products.length;
    const items = spectator.queryAll('app-small-spot');
    expect(items).toHaveLength(expected)
  })

  it('should add item to cart', () => {
    const [expected] = products;
    let output: Product;
    spectator.output<Product>('addToCart').subscribe((product) => output = product);
    spectator.triggerEventHandler('app-small-spot', 'addToCart', expected);
    expect(output).toEqual(expected);
  })
});

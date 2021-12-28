import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { labels, SmallSpotComponent } from './small-spot.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography/typography.component';
import { generate } from '../../../mockups/Product';
import { ButtonComponent } from '../button/button.component';
import { DiscountBadgeComponent } from '../discount-badge/discount-badge.component';
import { Product } from '../../../models/Product';

const product = generate();

describe('SmallSpotComponent', () => {
  let spectator: Spectator<SmallSpotComponent>;
  const createComponent = createComponentFactory({
    component: SmallSpotComponent,
    imports: [CommonModule],
    declarations: [TypographyComponent, ButtonComponent, DiscountBadgeComponent]
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        product,
      }
    });
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display proper image', () => {
    const expected = product.imageUrl;
    const image = spectator.query('img');
    expect(image).toHaveAttribute('src', expected);
  })

  it('should display proper product name', () => {
    const expected = product.name;
    const name = spectator.query('div.name-wrapper');
    expect(name).toHaveText(expected);
  })

  it('should display proper discount badge', () => {
    const expected = `-${(Number(product.discount) * 100).toFixed()}%`;
    const discount = spectator.query('app-discount-badge');
    expect(discount).toHaveText(expected);
  })

  describe('Price button', () => {
    it('should display price button', () => {
      const expectedProduct: Product = {...product, owned: false};
      const expected = `$${expectedProduct.price}`;
      spectator.setInput('product', expectedProduct);
      const button = spectator.query('button');
      expect(button).toHaveText(expected);
    })

    it('should display button with owner label', () => {
      const expectedProduct: Product = {...product, owned: true};
      const expected = labels.owned;
      spectator.setInput('product', expectedProduct);
      const button = spectator.query('button');
      expect(button).toHaveText(expected);
      expect(button).toBeDisabled();
    })

    it('should display button with "in cart" label', () => {
      const expectedProduct: Product = {...product, owned: false};
      const expected = labels.inCart;
      spectator.setInput('product', expectedProduct);
      spectator.setInput('inCart', true);
      const button = spectator.query('button');
      expect(button).toHaveText(expected);
      expect(button).toHaveClass('inactive');
    })

    it('should add product to cart', () => {
      const expected: Product = {...product, owned: false};
      let output: Product;
      spectator.setInput('product', expected);
      spectator.output<Product>('addToCart').subscribe((product) => output = product)
      const button = spectator.query('button');
      spectator.click(button);
      expect(output).toEqual(expected);
    })
  })
});

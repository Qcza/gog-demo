import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { CartService } from './cart.service';
import { generateMany } from '../../../mockups/Cart';
import { CartItem } from '../../../models/Cart';

const items = generateMany(5);

describe('CartService', () => {
  let spectator: SpectatorHttp<CartService>;
  const createHttp = createHttpFactory(CartService);

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should create service', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should prepare cart from cart items', () => {
    const expectedItems = generateMany(2);
    const expected = {
      items: expectedItems,
      itemsNo: expectedItems.length,
      price: (Number(expectedItems[0].price) + Number(expectedItems[1].price)).toFixed(2)
    }
    expect(spectator.service.prepareCart(expectedItems)).toEqual(expected);
  })

  it('should get cart', () => {
    const expected = spectator.service.prepareCart(items);
    let data: typeof expected;
    spectator.service.getCart().subscribe((cart) => (data = cart));
    spectator.expectOne(`/api/cart`, HttpMethod.GET).flush(items);

    expect(data).toEqual(expected);
  });

  it('should add item to cart', () => {
    const expected = spectator.service.prepareCart(items);
    const productId = '1';
    let data: typeof expected;
     spectator.service.addToCart(productId).subscribe((cart) => (data = cart));
    const req = spectator.expectOne(`/api/cart`, HttpMethod.PUT);
    req.flush(items);
    expect(req.request.body).toEqual({productId})
    expect(data).toEqual(expected);
  });

  it('should remove item from cart', () => {
    const expected = spectator.service.prepareCart(items);
    const itemId = '1';
    let data: typeof expected;
    spectator.service.removeFromCart(itemId).subscribe((cart) => (data = cart));
    spectator.expectOne(`/api/cart?itemId=${itemId}`, HttpMethod.DELETE).flush(items);

    expect(data).toEqual(expected);
  });

  it('clear the cart', () => {
    const expectedItems: CartItem[] = [];
    const expected = spectator.service.prepareCart(expectedItems);
    let data: typeof expected;
    spectator.service.clearCart().subscribe((cart) => (data = cart));
    spectator.expectOne('/api/cart', HttpMethod.DELETE).flush(expectedItems);

    expect(data).toEqual(expected);
  });
});

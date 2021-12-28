import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ProductsService } from './products.service';
import { generateDaily, generateMany } from '../../../mockups/Product';

const products = generateMany(5);
const daily = generateDaily();

describe('CallDivertsService', () => {
  let spectator: SpectatorHttp<ProductsService>;
  const createHttp = createHttpFactory(ProductsService);

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should create service', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should get products', () => {
    const expected = products;
    let data: typeof expected;
    spectator.service.getProducts().subscribe((products) => (data = products));
    spectator.expectOne(`/api/products`, HttpMethod.GET).flush(expected);

    expect(data).toEqual(expected);
  });

  it('should get the daily product', () => {
    const expected = daily;
    let data: typeof expected;
    spectator.service.getDaily().subscribe((daily) => (data = daily));
    spectator.expectOne(`/api/daily`, HttpMethod.GET).flush([expected]);

    expect(data).toEqual(expected);
  });
});

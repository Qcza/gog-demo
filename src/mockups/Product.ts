import * as faker from 'faker';
import { DailyProduct, Product } from '../models/Product';

const images = ['assets/images/img.png','assets/images/img2.png','assets/images/img3.png', 'assets/images/img4.png', 'assets/images/img5.png']

export const generate = (): Product => ({
  id: faker.datatype.number().toString(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  imageUrl: faker.random.arrayElement(images),
  discount: String(faker.datatype.number({min: 1, max: 99}) / 100),
  owned: faker.datatype.boolean(),
});

export const generateMany = (length: number): Product[] => Array.from({length}).map(generate);

export const generateDaily = (): DailyProduct => ({
  id: faker.datatype.number().toString(),
  imageUrl: 'assets/images/game.png',
})

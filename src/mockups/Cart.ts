import * as faker from 'faker';
import { Cart, CartItem } from '../models/Cart';

const images = ['assets/images/img.png','assets/images/img2.png','assets/images/img3.png', 'assets/images/img4.png', 'assets/images/img5.png']

export const generateItem = (): CartItem => ({
  id: faker.datatype.number().toString(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  imageUrl: faker.random.arrayElement(images),
  productId: faker.datatype.number().toString(),
});

export const generateMany = (length: number): CartItem[] => Array.from({length}).map(generateItem);

export const generate = (): Cart => ({
  itemsNo: faker.datatype.number(10),
  price: faker.commerce.price(),
  items: generateMany(faker.datatype.number({min: 2, max: 5}))
})

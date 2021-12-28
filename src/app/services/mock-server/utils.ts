import { Product } from '../../../models/Product';
import { CartItem } from '../../../models/Cart';

export const mapProductToCartItem = ({imageUrl, name, price, id}: Product): Omit<CartItem, 'id'> => ({
  productId: id,
  imageUrl,
  name,
  price,
})

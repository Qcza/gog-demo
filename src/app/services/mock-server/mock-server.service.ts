import { createServer, Server } from 'miragejs';
import { Injectable } from '@angular/core';
import { mapProductToCartItem } from './utils';

@Injectable({
  providedIn: 'root'
})
export class MockServerService {

  public create(): Server {
    return createServer({
      routes() {
        this.namespace = 'api';

        this.get('/products', (schema) => {
          return schema.db.products;
        })

        this.get('/daily', (schema) => {
          return schema.db.daily;
        })

        this.get('/cart', (schema) => {
          return schema.db.cartItems;
        })

        this.put('/cart', (schema, request) => {
          const { productId } = JSON.parse(request.requestBody);
          const product = schema.db.products.find(productId);
          const cartItem = mapProductToCartItem(product);
          schema.db.cartItems.insert(cartItem);

          return schema.db.cartItems;
        })

        this.del('/cart', (schema, request) => {
          const { itemId } = request.queryParams;
          schema.db.cartItems.remove(itemId);

          return schema.db.cartItems;
        })
      },

      seeds(server) {
        server.db.loadData({
          cartItems: [],
          daily: [{
            imageUrl: 'assets/images/game.png'
          }],
          products: [
            {
              name: 'Oddworld: Strager\'s Wrath',
              price: '9.99',
              imageUrl: 'assets/images/img.png',
              discount: '0.5',
              inCart: false,
              owned: false
            },
            {
              name: 'Chaos on deponia',
              price: '9.99',
              imageUrl: 'assets/images/img2.png',
              inCart: false,
              owned: true
            },
            {
              name: 'The settlers 2: gold edition',
              price: '5.99',
              imageUrl: 'assets/images/img3.png',
              inCart: false,
              owned: false
            },
            {
              name: 'Neverwinter nights',
              price: '9.99',
              imageUrl: 'assets/images/img5.png',
              discount: '0.5',
              inCart: false,
              owned: false
            },
            {
              name: 'Assassin\'s creed: director\'s cut',
              price: '9.99',
              imageUrl: 'assets/images/img4.png',
              inCart: false,
              owned: false
            }
          ]
        })
      }
    })
  }
}

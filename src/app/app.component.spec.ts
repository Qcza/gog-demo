import { Spectator, createComponentFactory, mockProvider } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { GameSpotComponent } from './components/game-spot/game-spot.component';
import { SpotListComponent } from './components/spot-list/spot-list.component';
import { CartService } from './services/cart/cart.service';
import { MockServerService } from './services/mock-server/mock-server.service';
import { CartComponent } from './components/cart/cart.component';
import { CartButtonComponent } from './components/cart/cart-button/cart-button.component';
import { generate as generateCart, generateItem } from '../mockups/Cart';
import { generate as generateProduct, generateMany, generateDaily } from '../mockups/Product';
import { ProductsService } from './services/products/products.service';
import { of } from 'rxjs';
import { TypographyComponent } from './components/typography/typography.component';
import { ButtonComponent } from './components/button/button.component';
import { SmallSpotComponent } from './components/small-spot/small-spot.component';
import { DiscountBadgeComponent } from './components/discount-badge/discount-badge.component';

const cart = generateCart();
const cartItem = generateItem();
const product = generateProduct()
const products = generateMany(5);
const daily = generateDaily();

const cartServiceMock = {
  getCart: () => of({
    items: [],
    itemsNo: 0,
    price: '0'
  }),
  addToCart: (id: string) => of(cart),
  removeFromCart: (id: string) => of(cart),
  clearCart: () => of(cart),
}

const productServiceMock = {
  getProducts: () => of(products),
  getDaily: () => of(daily),
}

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [CommonModule],
    declarations: [
      TopBarComponent,
      GameSpotComponent,
      SpotListComponent,
      CartComponent,
      CartButtonComponent,
      TypographyComponent,
      ButtonComponent,
      SmallSpotComponent,
      DiscountBadgeComponent,
    ],
    providers: [
      mockProvider(MockServerService),
      mockProvider(ProductsService, productServiceMock),
      mockProvider(CartService, cartServiceMock),
    ]
  });

  beforeEach(() => {
    spyOn(cartServiceMock, 'addToCart').and.callThrough();
    spyOn(cartServiceMock, 'removeFromCart').and.callThrough();
    spyOn(cartServiceMock, 'clearCart').and.callThrough();
    spectator = createComponent();
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call add to cart', () => {
    spectator.triggerEventHandler('app-spot-list', 'addToCart', product);
    expect(cartServiceMock.addToCart).toHaveBeenCalledWith(product.id)
  })

  it('should call remove from cart', () => {
    spectator.triggerEventHandler('app-top-bar', 'removeItemFromCart', cartItem);
    expect(cartServiceMock.removeFromCart).toHaveBeenCalledWith(cartItem.id)
  })

  it('should call clear cart', () => {
    spectator.triggerEventHandler('app-top-bar', 'clearCart', new Event('mock'));
    expect(cartServiceMock.clearCart).toHaveBeenCalled()
  })
});

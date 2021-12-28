import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { TypographyComponent } from './components/typography/typography.component';
import { SmallSpotComponent } from './components/small-spot/small-spot.component';
import { DiscountBadgeComponent } from './components/discount-badge/discount-badge.component';
import { GameSpotComponent } from './components/game-spot/game-spot.component';
import { CartComponent } from './components/cart/cart.component';
import { CartButtonComponent } from './components/cart/cart-button/cart-button.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { CartPopupComponent } from './components/cart/cart-popup/cart-popup.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SpotListComponent } from './components/spot-list/spot-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TypographyComponent,
    SmallSpotComponent,
    DiscountBadgeComponent,
    GameSpotComponent,
    CartComponent,
    CartButtonComponent,
    CartItemComponent,
    CartPopupComponent,
    TopBarComponent,
    SpotListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

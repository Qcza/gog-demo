import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { CartComponent } from './cart.component';
import { TypographyComponent } from '../typography/typography.component';
import { ButtonComponent } from '../button/button.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { CartPopupComponent } from './cart-popup/cart-popup.component';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { generate as generateCart } from '../../../mockups/Cart';

export default {
  title: 'Components/Cart',
  component: CartComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        TypographyComponent,
        ButtonComponent,
        CartItemComponent,
        CartPopupComponent,
        CartButtonComponent
      ],
      imports: [CommonModule],
    })
  ]
} as Meta;

const cart = generateCart()

const Template: Story<CartComponent> = (args) => ({
  props: args,
  template: `<div style="position: absolute; right: 0"><app-cart [cart]="cart"></app-cart></div>`
});

export const Primary = Template.bind({});
Primary.args = {
  cart,
};

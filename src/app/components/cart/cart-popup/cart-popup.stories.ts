import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { CartPopupComponent } from './cart-popup.component';
import { TypographyComponent } from '../../typography/typography.component';
import { ButtonComponent } from '../../button/button.component';
import { CommonModule } from '@angular/common';
import { generate as generateCart } from '../../../../mockups/Cart';
import { CartItemComponent } from '../cart-item/cart-item.component';

export default {
  title: 'Components/Cart/CartPopup',
  component: CartPopupComponent,
  decorators: [
    moduleMetadata({
      declarations: [TypographyComponent, ButtonComponent, CartItemComponent],
      imports: [CommonModule],
    })
  ]
} as Meta;

const cart = generateCart();

const Template: Story<CartPopupComponent> = (args) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  cart,
};

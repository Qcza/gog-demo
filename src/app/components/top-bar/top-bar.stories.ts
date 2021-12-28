import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { TopBarComponent } from './top-bar.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { generate as generateCart } from '../../../mockups/Cart';
import { CartButtonComponent } from '../cart/cart-button/cart-button.component';
import { CartPopupComponent } from '../cart/cart-popup/cart-popup.component';
import { CartItemComponent } from '../cart/cart-item/cart-item.component';
import { ButtonComponent } from '../button/button.component';
import { TypographyComponent } from '../typography/typography.component';

export default {
  title: 'Components/TopBar',
  component: TopBarComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        CartComponent,
        CartButtonComponent,
        CartPopupComponent,
        CartItemComponent,
        ButtonComponent,
        TypographyComponent
      ],
      imports: [CommonModule],
    })
  ]
} as Meta;

const cart = generateCart()

const Template: Story<TopBarComponent> = (args) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  cart,
};

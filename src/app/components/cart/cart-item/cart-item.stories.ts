import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { CartItemComponent } from './cart-item.component';
import { TypographyComponent } from '../../typography/typography.component';
import { CommonModule } from '@angular/common';
import { generateItem } from '../../../../mockups/Cart';

export default {
  title: 'Components/Cart/CartItem',
  component: CartItemComponent,
  decorators: [
    moduleMetadata({
      declarations: [TypographyComponent],
      imports: [CommonModule],
    })
  ]
} as Meta;

const item = generateItem();

const Template: Story<CartItemComponent> = (args) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  item,
};

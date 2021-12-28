import * as faker from 'faker';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { CartButtonComponent } from './cart-button.component';
import { TypographyComponent } from '../../typography/typography.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/Cart/CartButton',
  component: CartButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [TypographyComponent],
      imports: [CommonModule],
    })
  ]
} as Meta;

const Template: Story<CartButtonComponent> = (args) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  itemsNo: faker.datatype.number(10),
};

export const Empty = Template.bind({});
Empty.args = {
  itemsNo: 0,
};

export const Active = Template.bind({});
Active.args = {
  active: true,
  itemsNo: faker.datatype.number(10),
};

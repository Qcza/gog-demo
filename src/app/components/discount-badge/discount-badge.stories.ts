import * as faker from 'faker';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { DiscountBadgeComponent } from './discount-badge.component';
import { TypographyComponent } from '../typography/typography.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/DiscountBadge',
  component: DiscountBadgeComponent,
  decorators: [
    moduleMetadata({
      declarations: [TypographyComponent],
      imports: [CommonModule],
    })
  ]
} as Meta;

const Template: Story<DiscountBadgeComponent> = (args) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  value: String(faker.datatype.float({max: 1}))
};

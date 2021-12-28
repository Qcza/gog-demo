import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { SpotListComponent } from './spot-list.component';
import { generateMany } from '../../../mockups/Product';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography/typography.component';
import { DiscountBadgeComponent } from '../discount-badge/discount-badge.component';
import { SmallSpotComponent } from '../small-spot/small-spot.component';

export default {
  title: 'Components/SpotList',
  component: SpotListComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, TypographyComponent, DiscountBadgeComponent, SmallSpotComponent],
      imports: [CommonModule],
    })
  ]

} as Meta;

const Template: Story<SpotListComponent> = (args) => ({
  props: args,
});

const products = generateMany(5);


export const Primary = Template.bind({});
Primary.args = {
  products,
};

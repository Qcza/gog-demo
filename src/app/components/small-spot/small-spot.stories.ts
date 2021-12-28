import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { SmallSpotComponent } from './small-spot.component';
import { generate as generateProduct } from '../../../mockups/Product';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography/typography.component';
import { DiscountBadgeComponent } from '../discount-badge/discount-badge.component';

export default {
  title: 'Components/SmallSpot',
  component: SmallSpotComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, TypographyComponent, DiscountBadgeComponent],
      imports: [CommonModule],
    })
  ]

} as Meta;

const Template: Story<SmallSpotComponent> = (args) => ({
  props: args,
});

const product = generateProduct();
const priced = {...product, owned: false, inCart: false};
delete priced.discount;
const owned = {...product, owned: true, inCart: false};
const inCart = {...product, inCart: true, owned: false};
const discount = {...product, owned: false, inCart: false};

export const Priced = Template.bind({});
Priced.args = {
  product: priced,
};

export const Owned = Template.bind({});
Owned.args = {
  product: owned,
};

export const InCart = Template.bind({});
InCart.args = {
  product: inCart,
};

export const NoDiscount = Template.bind({});
NoDiscount.args = {
  product: discount,
};

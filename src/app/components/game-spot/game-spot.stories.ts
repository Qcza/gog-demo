import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { GameSpotComponent } from './game-spot.component';
import { generateDaily } from '../../../mockups/Product';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography/typography.component';

export default {
  title: 'Components/GameSpot',
  component: GameSpotComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, TypographyComponent],
      imports: [CommonModule],
    })
  ]
} as Meta;

const Template: Story<GameSpotComponent> = (args) => ({
  props: args,
});

const product = generateDaily();

export const Primary = Template.bind({});
Primary.args = {
  product,
};

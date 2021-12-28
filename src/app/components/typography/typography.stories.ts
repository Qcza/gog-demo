import { Meta, Story } from '@storybook/angular';

import { TypographyComponent } from './typography.component';

export default {
  title: 'Components/Typography',
  component: TypographyComponent,
} as Meta;

const TEXT = 'Lorem ipsum';

const Template: Story<TypographyComponent> = (args) => ({
  props: args,
  template: `<app-typography>${TEXT}</app-typography>`
});

export const Primary = Template.bind({});
Primary.args = {};

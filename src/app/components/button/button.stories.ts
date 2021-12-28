import { Meta, Story } from '@storybook/angular';

import { ButtonComponent } from './button.component';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
} as Meta;

const Template: Story<ButtonComponent> = (args) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Clear cart',
};

export const Small = Template.bind({});
Small.args = {
  label: '$9.99',
  variant: 'outlined',
  size: 'small',
};
